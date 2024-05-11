JWT Authentication Full Stack Setup
<br>
This guide outlines the steps to set up a full-stack application with JWT authentication.
<br>
This setup includes both the frontend and backend components.
<br>

Backend Setup

1. Installation
   <br>
   Install the required dependencies for the backend:
   <br>
   npm install
   <br>

2. Start the Backend Server
   <br>
   Run the backend server:
   <br>
   npm run start:dev
   <br>

Frontend Setup

1. Installation
   <br>
   npm install
   <br>

2. Start the Frontend Development Server
   <br>
   Run the frontend development server:
   <br>
   npm run dev
   <br>

Additional Notes
<br>
Ensure that the backend server is running before starting the frontend development server to establish communication between them.
<br>
Also make sure that you have created .env file and assigned both ACCESS_TOKEN_SECRET and REFRESH_TOKEN_SECRET in order to make the backend work properly.
<br>

Technologies Used
<br>
Backend: Node.js with Express.js
<br>
Frontend: Vue.js
<br>
Authentication: JSON Web Tokens (JWT)
<br>
