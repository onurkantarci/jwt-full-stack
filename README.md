JWT Authentication Full Stack Setup
This guide outlines the steps to set up a full-stack application with JWT authentication. This setup includes both the frontend and backend components.

Backend Setup

1. Installation
   Install the required dependencies for the backend:
   npm install

2. Start the Backend Server
   Run the backend server:
   npm run start:dev

Frontend Setup

1. Installation
   npm install

2. Start the Frontend Development Server
   Run the frontend development server:
   npm run dev

Additional Notes
Ensure that the backend server is running before starting the frontend development server to establish communication between them.
Also make sure that you have created .env file and assigned both ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in order to make the backend work properly.

Technologies Used
Backend: Node.js with Express.js
Frontend: Vue.js
Authentication: JSON Web Tokens (JWT)
