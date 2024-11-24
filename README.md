# Study Buddy 📝💬

**Study Buddy** is a full-stack web application that allows students to upload PDF documents and engage in a chat interface powered by GEMINI, where they can ask questions based on the content of the uploaded PDF. Built with **Next.js** on the frontend and **Django Rest Framework** on the backend, Study Buddy is designed to enhance students' productivity by offering an intuitive way to interact with study materials.

## Features ✨

- **PDF Upload**: Users can upload any PDF document that they wish to study or review.
- **AI-Powered Chat**: Ask questions about the content of the PDF, and the AI will provide answers based on the document's content.
- **Fast and Responsive**: Built using Next.js and Django Rest Framework to ensure smooth and fast performance.
- **Carousel**: A visual display on the home page showcasing the core features and instructions for using Study Buddy.
- **Authentication**: Secure user authentication with Django Rest Framework's JWT tokens.
- **Seamless PDF Parsing**: The application extracts text from PDFs and converts them into a format that the AI model can process.
- **Next.js 15 Features**: Leveraging the latest app router, server actions, and TypeScript for a modern web experience.

## Tech Stack 🛠️

### Frontend:
- **Next.js 15**: The latest version of Next.js with the app router and server actions for optimal performance.
- **TypeScript**: Used for type safety and better code structure.
- **Tailwind CSS**: For rapid UI development and a responsive design.
- **Shadcn/UI Components**: To build custom and reusable UI components.
- **React Carousel**: For dynamic image and content sliders.
  
### Backend:
- **Django**: As the main framework for backend logic.
- **Django Rest Framework**: To build API endpoints that handle user authentication, PDF processing, and interaction with the frontend.
- **Gemini API**: For AI-powered responses to user queries based on uploaded PDFs.
- **LangChain**: To break PDF content into chunks and convert it into embeddings for efficient AI response generation.
- **Simple JWT Authentication**: For secure user authentication with token-based access.

## Getting Started 🚀

Follow these steps to get the project up and running locally.

### Prerequisites

- **Node.js**: Install from [nodejs.org](https://nodejs.org/)
- **Python 3.x**: Install from [python.org](https://www.python.org/downloads/)

### Backend (Django) Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Dharshansk16/Study_Buddy.git
   cd Study_Buddy/backend
2. Set up a virtual environment:
   ```bash
   python -m venv venv
source venv/bin/activate  # On Windows use `venv\Scripts\activate`

3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt

4. Configure the .env file with your database, secret keys, and OpenAI API keys:
   ```bash
    GOOGLE_API_KEY=your_gemini_api_key
    
5. Run database migrations:
   ```bash
   python manage.py migrate
6. Start the backend server:
   ```bash
   python manage.py runserver

 **Frontend Setup**
1. Navigate to the frontend directory:
   ```bash
   cd frontend
2. Install frontend dependencies:
   ```bash
   npm install
3. Configure the .env.local file
   ```bash
   NEXT_PUBLIC_API_URL="http://127.0.0.1:8000/api"
     
4. Start the frontend server:
   ```bash
   npm run dev
