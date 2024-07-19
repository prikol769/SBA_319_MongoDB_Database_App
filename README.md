# Express API for Users, Posts, and Comments

## Overview

This project is an Express.js-based REST API that allows for the management of users, posts, and comments. The application includes routes for creating, reading, updating, and deleting these entities. Additionally, it includes setup routes to initialize the database with sample data.

## Features

- CRUD operations for Users, Posts, and Comments
- Setup routes for initializing the database with sample data
- Middleware for error handling, CORS, and security headers

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-repo.git
   cd your-repo

   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a .env file in the root of the project and add the following:

   ```bash
   PORT=5000
   MONGO_URI=
   ```

4. Start the application:
   ```bash
   npm dev
   ```

### API Endpoints

#### Setup Routes

- GET /setup/users - Initialize the database with sample users.
- GET /setup/posts - Initialize the database with sample posts.
- GET /setup/comments - Initialize the database with sample comments.

#### User Routes

- GET /api/users - Get all users.
- GET /api/users/:id - Get a single user by ID.
- POST /api/users - Create a new user.
- PUT /api/users/:id - Update a user by ID.
- DELETE /api/users/:id - Delete a user by ID.

#### Post Routes

- GET /api/posts - Get all posts.
- GET /api/posts/user/:userId - Get all posts by a user ID.
- GET /api/posts/post/:postId - Get a single post by ID.
- POST /api/posts - Create a new post.
- PUT /api/posts/:postId/:userId - Update a post by ID and user ID.
- DELETE /api/posts/:postId/:userId - Delete a post by ID and user ID

#### Comment Routes

- GET /api/comments - Get all comments.
- GET /api/comments/:postId - Get all comments by post ID.
- GET /api/comments/:id - Get a single comment by ID.
- POST /api/comments - Create a new comment.
- PUT /api/comments/:commentId/:userId - Update a comment by ID and user ID.
- DELETE /api/comments/:commentId/:userId - Delete a comment by ID and user ID.
