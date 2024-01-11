### Node.js Backend API (assignement by SnabbTech)

_Made with Node.js, it a server-side-based application designed to handle user registration,
authentication, and password management. It provides a set of RESTful endpoints for creating and
managing user accounts, allowing clients to securely sign up, sign in, and request password resets._

### Key Features:

- _User Registration: Allow users to sign up by providing necessary information such as name, email,
  password, and date of birth._
- _User Authentication: Implement a secure authentication mechanism using bcrypt for password
  hashing._
- _Password Reset: Enable users to reset their passwords by sending a unique reset link to their
  email addresses._
- User Data Retrieval: Provide an endpoint to retrieve all user data for administrative purposes.

### Technologies Used:

Node.js
Express.js
Mongo DB (for data storage)
bcrypt (for password hashing)
nodemailer (for sending emails)

### API Endpoints:

- POST /signup: Register a new user.
  ![signUP](https://github.com/sujitkumr/Backend_API/assets/110280440/bf1d9e77-ee8f-4cbb-85cd-c88a8ed38f6f)

- POST /sign In: Authenticate a user.
  ![signin](https://github.com/sujitkumr/Backend_API/assets/110280440/78c87a14-05a0-4e5c-b1c2-b0e6e2c6bb71)

- POST /forget-password: Send a password reset link to the user's email.
  ![Forget_password](https://github.com/sujitkumr/Backend_API/assets/110280440/a1c1604a-6add-42ae-9f21-6a68e1607fe8)

- POST /reset-password: Reset the user's password using a valid reset token.
  ![reset_passwaord](https://github.com/sujitkumr/Backend_API/assets/110280440/f41bd60a-236b-4675-a784-2f98df0dbfaf)

- GET /get-all-users: Retrieve all users from the database.
  ![get-all-user](https://github.com/sujitkumr/Backend_API/assets/110280440/2e2b9f89-b652-46b1-a2e2-874a9051c58c)


### Architecture:

This project is based on [MVC](https://developer.mozilla.org/en-US/docs/Glossary/MVC) Architecture

### My Profiles:

- [LinkedIn](https://www.linkedin.com/in/3233sujit-kumar-67b13321b/)
- [Github](https://github.com/sujitkumr)
- [LeetCode](https://leetcode.com/sujitkymar101/)
- [EmailID](mailto:sujitkymar101@gmail.com)
