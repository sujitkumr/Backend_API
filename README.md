# Node.js Backend API

Node Backend API is a Node.js-based server-side application designed to handle user registration, authentication, and password management. It provides a set of RESTful endpoints for creating and managing user accounts, allowing clients to securely sign up, sign in, and request password resets.

# Key Features:

User Registration: Allow users to sign up by providing necessary information such as name, email, password, and date of birth.
User Authentication: Implement a secure authentication mechanism using bcrypt for password hashing.
Password Reset: Enable users to reset their passwords by sending a unique reset link to their email addresses.
User Data Retrieval: Provide an endpoint to retrieve all user data for administrative purposes.



# Technologies Used:

Node.js
Express.js
MongoDB (for data storage)
bcrypt (for password hashing)
nodemailer (for sending emails)


Getting Started:
To set up the project locally, clone the repository, install dependencies, configure environment variables, and start the server.

# API Endpoints:

POST /signup: Register a new user.
POST /signin: Authenticate a user.
POST /forget-password: Send a password reset link to the user's email.
POST /reset-password: Reset the user's password using a valid reset token.
GET /get-all-users: Retrieve all users from the database.
