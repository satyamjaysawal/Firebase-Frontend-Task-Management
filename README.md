

![image](https://github.com/user-attachments/assets/e13fda72-c7cb-4e8a-9135-a5fcb98b4014)

![image](https://github.com/user-attachments/assets/150c7c77-e51d-470a-9ea3-ee543af39d44)


![image](https://github.com/user-attachments/assets/e6accf66-9abc-4624-acc3-e09c82da5886)

![image](https://github.com/user-attachments/assets/3e781efe-9571-482c-bdc5-cb2c7e4f6721)


# Task Management System

A full-stack task management system built using React, Firebase, and Flask. This application allows users to register, log in, and manage tasks through a web interface. The backend uses Flask and Firebase Firestore for storing tasks, while Firebase Authentication handles user authentication.

## Table of Contents
- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
  - [Frontend Setup](#frontend-setup)
  - [Backend Setup](#backend-setup)
- [Usage](#usage)
  - [Frontend](#frontend)
  - [Backend](#backend)
- [API Endpoints](#api-endpoints)
- [Improvements](#improvements)
- [Contributing](#contributing)
- [License](#license)

## Demo
Check out a live demo of the application [here](#).

## Features
- User Registration and Login (Email/Password, Google Authentication)
- Task CRUD (Create, Read, Update, Delete)
- Firebase Authentication
- Notification system for feedback on actions
- Responsive and clean UI

## Tech Stack
**Frontend**:
- React
- Firebase Authentication
- Tailwind CSS (for styling)

**Backend**:
- Python
- Flask
- Firebase Firestore
- Firebase Admin SDK
- Flask-CORS (for cross-origin requests)

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v14+)
- [Python](https://www.python.org/) (v3.8+)
- Firebase project (You need to set up a Firebase project for authentication and Firestore)
- [Firebase CLI](https://firebase.google.com/docs/cli) (Optional for hosting)

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/task-management-system.git
   cd task-management-system/frontend
   

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Firebase:
   - Create a Firebase project and add a web app in the Firebase console.
   - Copy the Firebase config details and paste them into a new file called `firebaseConfig.js` in the `frontend/src` directory:
     ```javascript
     // firebaseConfig.js
     import { initializeApp } from "firebase/app";
     import { getAuth, GoogleAuthProvider } from "firebase/auth";
     
     const firebaseConfig = {
       apiKey: "YOUR_API_KEY",
       authDomain: "YOUR_AUTH_DOMAIN",
       projectId: "YOUR_PROJECT_ID",
       storageBucket: "YOUR_STORAGE_BUCKET",
       messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
       appId: "YOUR_APP_ID"
     };
     
     const app = initializeApp(firebaseConfig);
     export const auth = getAuth(app);
     export const provider = new GoogleAuthProvider();
     ```

4. Run the React app:
   ```bash
   npm start
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Configure Firebase Admin SDK:
   - Download your `serviceAccountKey.json` from the Firebase console and place it in the backend directory.
   - Alternatively, you can set up environment variables for Firebase credentials:
     ```bash
     touch .env
     ```

     Add the following variables to `.env`:
     ```
     FIREBASE_TYPE=service_account
     FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
     FIREBASE_PRIVATE_KEY_ID=YOUR_PRIVATE_KEY_ID
     FIREBASE_PRIVATE_KEY=YOUR_PRIVATE_KEY
     FIREBASE_CLIENT_EMAIL=YOUR_CLIENT_EMAIL
     FIREBASE_CLIENT_ID=YOUR_CLIENT_ID
     FIREBASE_AUTH_URI=YOUR_AUTH_URI
     FIREBASE_TOKEN_URI=YOUR_TOKEN_URI
     FIREBASE_AUTH_PROVIDER_X509_CERT_URL=YOUR_AUTH_PROVIDER_X509_CERT_URL
     FIREBASE_CLIENT_X509_CERT_URL=YOUR_CLIENT_X509_CERT_URL
     ```

5. Run the Flask server:
   ```bash
   flask run
   ```

## Usage

### Frontend
To use the frontend:
1. Visit `http://localhost:3000` in your web browser.
2. Register a new user or log in with an existing account.
3. Use the app to add, update, or delete tasks.

### Backend
The backend is accessible at `http://localhost:5000` by default.

## API Endpoints

| Method | Endpoint          | Description                        |
|--------|-------------------|------------------------------------|
| GET    | `/tasks`           | Fetch all tasks                    |
| POST   | `/tasks`           | Create a new task                  |
| PUT    | `/tasks/<task_id>` | Update an existing task             |
| DELETE | `/tasks/<task_id>` | Delete a task by ID                |

### Example API Usage

To add a new task:
```bash
curl -X POST http://localhost:5000/tasks \
-H "Content-Type: application/json" \
-d '{"task": "New Task Description"}'
```

## Improvements
- Add pagination to `GET /tasks` for better handling of large datasets.
- Add real-time updates using Firebase’s Firestore real-time listeners.
- Improve error messages for more user-friendly feedback.
- Implement role-based access control for tasks.
- Deploy the frontend to Firebase Hosting and the backend to a cloud platform like Heroku or Google Cloud.

## Contributing
Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`feature/your-feature-name`).
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

