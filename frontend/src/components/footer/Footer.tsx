import React from "react";

export default function Footer() {
  return (
    <footer className="footer footer-center bg-gray-900 text-white p-4">
      <div className="border-t border-[#374151] mb-6"></div>
      <nav className="flex justify-center space-x-8 mb-6">
        <a
          href="#about"
          className="text-lg hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          About Us
        </a>
        <a
          href="#contact"
          className="text-lg hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          Contact
        </a>
        <a
          href="#home"
          className="text-lg hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          Home
        </a>
        <a
          href="#chat-with-pdf"
          className="text-lg hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          Study Buddy
        </a>
      </nav>
      <nav className="flex justify-center space-x-6 mb-6">
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
          </svg>
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>

        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xl hover:text-blue-400 transition-transform hover:scale-110 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fill-current"
          >
            <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.206.058 2.007.244 2.475.41.576.207 1.007.454 1.453.9.446.446.693.877.9 1.453.166.468.352 1.27.41 2.475.058 1.265.07 1.645.07 4.849s-.012 3.584-.07 4.849c-.058 1.206-.244 2.007-.41 2.475-.207.576-.454 1.007-.9 1.453-.446.446-.877.693-1.453.9-.468.166-1.27.352-2.475.41-1.265.058-1.645.07-4.849.07s-3.584-.012-4.849-.07c-1.206-.058-2.007-.244-2.475-.41-.576-.207-1.007-.454-1.453-.9-.446-.446-.693-.877-.9-1.453-.166-.468-.352-1.27-.41-2.475-.058-1.265-.07-1.645-.07-4.849s.012-3.584.07-4.849c.058-1.206.244-2.007.41-2.475.207-.576.454-1.007.9-1.453.446-.446.877-.693 1.453-.9.468-.166 1.27-.352 2.475-.41 1.265-.058 1.645-.07 4.849-.07zm0-2.163c-3.259 0-3.67.013-4.947.072-1.258.058-2.24.243-3.032.513-.823.28-1.55.656-2.281 1.387-.732.732-1.108 1.459-1.387 2.281-.27.792-.455 1.774-.513 3.032-.059 1.277-.072 1.688-.072 4.947s.013 3.67.072 4.947c.058 1.258.243 2.24.513 3.032.28.823.656 1.55 1.387 2.281.732.732 1.459 1.108 2.281 1.387.792.27 1.774.455 3.032.513 1.277.059 1.688.072 4.947.072s3.67-.013 4.947-.072c1.258-.058 2.24-.243 3.032-.513.823-.28 1.55-.656 2.281-1.387.732-.732 1.108-1.459 1.387-2.281.27-.792.455-1.774.513-3.032.059-1.277.072-1.688.072-4.947s-.013-3.67-.072-4.947c-.058-1.258-.243-2.24-.513-3.032-.28-.823-.656-1.55-1.387-2.281-.732-.732-1.459-1.108-2.281-1.387-.792-.27-1.774-.455-3.032-.513-1.277-.059-1.688-.072-4.947-.072zm0 5.838a6.161 6.161 0 100 12.322 6.161 6.161 0 000-12.322zm0 10.164a3.834 3.834 0 110-7.667 3.834 3.834 0 010 7.667zm7.406-12.906a1.44 1.44 0 11-2.879 0 1.44 1.44 0 012.879 0z"></path>
          </svg>
        </a>
      </nav>
      <aside className="text-center">
        <p className="text-sm">
          Copyright © {new Date().getFullYear()} - All rights reserved by{" "}
          <a
            href=""
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-300 hover:underline"
          >
            UnderDogs
          </a>
        </p>
      </aside>
    </footer>
  );
}
