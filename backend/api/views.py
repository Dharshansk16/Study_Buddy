from django.shortcuts import render
import os
from dotenv import load_dotenv
import google.generativeai as genai
from rest_framework import viewsets, status
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import PDF , Chat
from .serializers import PDFSerializer, UserRegistrationSerializer , ChatSerializer
from  PyPDF2 import PdfReader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_google_genai import GoogleGenerativeAIEmbeddings , ChatGoogleGenerativeAI
from langchain_community.vectorstores import FAISS
from rest_framework.decorators import action, api_view , permission_classes
from rest_framework.response import Response
from langchain.prompts import PromptTemplate
from langchain.chains.question_answering import load_qa_chain
from django.contrib.auth.models import User
from rest_framework.permissions import AllowAny , IsAuthenticated
#To ensure typesafety
from typing import List , Optional , Dict , Any
from .permissions import IsOwner

# Create your views here.

#Load all the environmental variables
load_dotenv()
api_key:str = os.getenv("GOOGLE_API_KEY")
if api_key is None:
    raise ValueError("Google API key is not set in the environment variables.")
genai.configure(api_key=api_key)



FAISS_FOLDER_PATH = "faiss_indices"

if not os.path.exists(FAISS_FOLDER_PATH):
    os.makedirs(FAISS_FOLDER_PATH)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_login_status(request):
    return Response({"login_status": "logged_in", "user": request.user.username, "user_id":request.user.id})


class PDFViewSet(viewsets.ModelViewSet):
    """
    ModelViewSet is a class-based view that provides a complete set of default
    actions for working with a model in a RESTful API. It simplifies building 
    CRUD (Create, Read, Update, Delete) endpoints by automatically generating 
    views based on the model and serializer you specify.
    """

    serializer_class =PDFSerializer
    parser_classes = (MultiPartParser, FormParser, JSONParser)
    permission_classes = [IsAuthenticated, IsOwner]

    def get_queryset(self):
        # Only show PDFs owned by the authenticated user
        return PDF.objects.filter(user=self.request.user)

    def perform_create(self, serializer) ->None:
        """
        This method 
        1.checks if the file already exists for the user.
        2.If it is a new file, saves the file , extracts text , chunks the extracted text,
        creates a vector store for similarity search.

        Terms:
        vector store : A vector is a numerical representation of each text chunk from a PDF file. 
        These vectors enables the system to understand and retrieve semantically similar pieces
        of text in response to a user's questions or queries, rather than simply matching exact 
        keywords.
        """
        file = self.request.FILES["file"]
        user = self.request.user
        existing_pdf: Optional[PDF] = PDF.objects.filter(user=user , file=file.name).first()
        if existing_pdf:
            pdf_instance = existing_pdf
        else: 
            pdf_instance = serializer.save(user=user)
            pdf_path :str= pdf_instance.file.path
            text :str = self.get_pdf_text(pdf_path)
            chunks : List[str] = self.get_text_chunks(text)
            self.get_vector_store(chunks , pdf_instance)
            pdf_instance.text= text
            pdf_instance.save()


    def get_pdf_text(self, pdf_path:str)-> str:
        """
        This method is used to extract the text from the pdf file. 
        """
        text:str = ""
        pdf_reader = PdfReader(pdf_path)
        for page in pdf_reader.pages:
            text += page.extract_text() or ""
        return text
        
    def get_text_chunks(self, text:str)->List[str]:
        """
        Splits the extracted text into manageable chunks.
        Uses RecursiveCharacterTextSplitter to create chunks with overlap to retain context.
        """
        splitter = RecursiveCharacterTextSplitter(chunk_size = 10000 , chunk_overlap = 1000)
        chunks = splitter.split_text(text)
        return chunks
    
    def get_vector_store(self, chunks:List[str], pdf_instance :PDF)->None:
        """
        Creates a FAISS vector store from the text chunks, enabling similarity search.
        The vector store is saved locally for future use.
        Terms:
        FAISS:FACEBOOK AI SIMILARITY SEARCH
        """
        embeddings = GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
        vector_store = FAISS.from_texts(chunks, embedding=embeddings)
        file_path :str = os.path.join(FAISS_FOLDER_PATH, f"faiss_index_{pdf_instance.id}")
        vector_store.save_local(file_path)

    conversation_history: List[Dict[str, str]] = []

    @action(detail=True, methods=['post'], url_path='chat')
    def chat_with_pdf(self ,request:Any , pk :Optional[int]=None ) ->Response:
        """
        Handles user questions by searching for similar text chunks in the PDF and generating a response.
        """
        pdf_instance :PDF= self.get_object()
        question: str = self.request.data.get("question", "").strip() #strip removed leading and trailing white spaces
        if not question:
            return Response({"error": "Question cannot be empty."}, status=status.HTTP_400_BAD_REQUEST)
        
        embeddings =GoogleGenerativeAIEmbeddings(model = "models/embedding-001")
        file_path:str = os.path.join(FAISS_FOLDER_PATH , f"faiss_index_{pdf_instance.id}")
        new_db = FAISS.load_local(file_path , embeddings, allow_dangerous_deserialization=True)
        docs :List[Any]= new_db.similarity_search(question)


        self.conversation_history.append({"question":question})
        response = self.get_response(docs, question)

        self.conversation_history[-1]["response"] = response["output_text"]

        Chat.objects.create(pdf=pdf_instance , question=question, response = response["output_text"])

        print(f"API Response: {response}")
        return Response({"response": response["output_text"]}, status=status.HTTP_200_OK)
    
    def get_response(self , docs , question):
        """
        Returns the API response for the provided context
        """
        context = self.build_prev_context()
        chain = self.get_conversational_chain(context)

        response : Dict[str, Any] = chain({"input_documents":docs, "question":question} , return_only_outputs=True)
        return response 

    def build_prev_context(self) -> str:
        """
        Checks the conversation_history for question and response if present , provides a context
        """
        conversation_chain = ""
        for entry in self.conversation_history:
            conversation_chain += f"Q:{entry['question']} \n"
            if 'response' in entry:
                conversation_chain += f"A: {entry['response']} \n"
        return conversation_chain

    def get_conversational_chain(self, conversation_chain:str) -> Any:
        """
        Sets up a conversational chain with LangChain to generate responses based on PDF content.
        """
        prompt_template :str= f"""
        Please provide accurate and detailed answers based on the given context or any uploaded PDF content.  
        Instructions:  
        1. **Contextual Responses**:  
        - Explain selected paragraphs from PDFs in simple terms, breaking down key points and context.  
        - Review uploaded PDFs (e.g., resumes) for errors and suggest improvements.  
        2. **Fallback**:  
        - If the information is not in the context or document, respond with:  
            *"The answer is not available in the context or provided document."*  
        3. **Clarity and Detail**:  
        - Use a clear structure (bullet points, lists) and provide examples or actionable feedback where relevant.  
        4. **Tone and Explanation**:  
        - Maintain a professional, constructive tone. Briefly explain technical terms when needed.  
        5. **Self-Reference**:  
        -When asked about who you are refer to yourself as "Study Buddy," developed by "Team Underdogs," and focus on assisting with learning and productivity.  
        **Special Notes**:  
        - For paragraph explanations: Simplify and summarize meaning effectively.  
        - For resumes: Identify grammatical, formatting, or content issues and offer constructive suggestions.  
        Context:
        {{context}}\n\n{conversation_chain}
        Question:
        {{question}}
        Answer:
        """
        model = ChatGoogleGenerativeAI(model="gemini-1.5-flash-001", client=genai, temperature=0.3)
        prompt = PromptTemplate(template=prompt_template, input_variables=["context", "question"])
        chain = load_qa_chain(llm=model, chain_type="stuff", prompt=prompt)
        return chain
    
    @action(detail=True, methods=['get'], url_path='chats')
    def get_chat_history(self, request: Any, pk: Optional[int] = None) -> Response:
        """
        Fetches chat history for a specific PDF.
        """
        pdf_instance: PDF = self.get_object()
        chats = pdf_instance.chats.all().order_by('created_at')  
        serializer = ChatSerializer(chats, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegistrationViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"message": "User registered successfully."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    