# Node.js Backend API

Node Backend API is a Node.js-based server-side application designed to handle user registration, authentication, and password management. It provides a set of RESTful endpoints for creating and managing user accounts, allowing clients to securely sign up, sign in, and request password resets.

#Key Features:

User Registration: Allow users to sign up by providing necessary information such as name, email, password, and date of birth.
User Authentication: Implement a secure authentication mechanism using bcrypt for password hashing.
Password Reset: Enable users to reset their passwords by sending a unique reset link to their email addresses.
User Data Retrieval: Provide an endpoint to retrieve all user data for administrative purposes.



Technologies Used:

Node.js
Express.js
MongoDB (for data storage)
bcrypt (for password hashing)
nodemailer (for sending emails)
