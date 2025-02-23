# Online Shopping Client site

## Description
This project is a user authentication system for an online shopping platform. It allows users to sign up, log in, and manage their profiles securely using Firebase Authentication. Users can also sign in with Google.

## Features
- User registration with email and password
- Secure authentication using Firebase
- Profile updates (name, profile picture, etc.)
- Google authentication
- District and Upazila selection from JSON data
- Password validation with security requirements

## Tech Stack
- **Frontend:** React, Tailwind CSS, React Hook Form, React Router DOM
- **Authentication:** Firebase Authentication
- **Image Upload:** Cloudinary
- **UI Library:** SweetAlert2

## For clone 
1. Clone the repository:
   ```sh
   git clonehttps://github.com/alamin20cse/Online-Shopping
   cd online-shopping-auth
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the root directory and add your Cloudinary credentials:
   ```env
   VITE_CLOUDINARY_UPLOAD_PRESET=your_upload_preset
   VITE_CLOUDINARY_CLOUD_NAME=your_cloud_name
   ```

4. Start the development server:
   ```sh
   npm run dev
   ```

## Firebase Setup
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project and set up authentication with Email/Password and Google Sign-In.
3. Get your Firebase config and add it to `firebase.init.js`.

## API Routes
- **User Registration:** `POST /users`
- **User Login:** `POST /login`
- **Logout:** `GET /logout`

## How to Use
1. Register a new user by providing name, email, password, and selecting district and upazila.
2. Login with registered email and password or use Google authentication.
3. Update user profile details.
