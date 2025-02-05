
# RiceBook Backend

Welcome to the **RiceBook Backend** repository! This project serves as the backend for RiceBook, a social media platform designed for sharing and discovering rice-based recipes. The backend is built with modern technologies to ensure scalability, performance, and ease of use.

## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Configuration](#configuration)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user registration and login using JWT (JSON Web Tokens).
- **Recipe Management**: Create, read, update, and delete recipes.
- **Social Interactions**: Like, comment, and share recipes with other users.
- **Search Functionality**: Search for recipes by name, ingredients, or tags.
- **Image Upload**: Upload and manage images for recipes.

## Technologies Used

- **Node.js**: A JavaScript runtime for building scalable server-side applications.
- **Express.js**: A web application framework for Node.js.
- **MongoDB**: A NoSQL database for storing data.
- **Mongoose**: An ODM (Object Data Modeling) library for MongoDB.
- **JWT**: JSON Web Tokens for secure authentication.
- **Multer**: Middleware for handling file uploads.
- **Bcrypt**: Library for hashing passwords.
- **Dotenv**: For managing environment variables.

## Installation

To get started with the RiceBook Backend, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/fzwnerd/ricebook-backend.git
   cd ricebook-backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following variables:
   ```
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/ricebook
   JWT_SECRET=your_jwt_secret_key
   ```

4. **Run the server**:
   ```bash
   npm start
   ```

The server will start running on `http://localhost:3000`.

## Configuration

- **Database**: Update the `MONGODB_URI` in the `.env` file to point to your MongoDB instance.
- **JWT Secret**: Replace `your_jwt_secret_key` with a strong secret key for JWT encryption.
- **Port**: Change the `PORT` variable if you want the server to run on a different port.

## API Documentation

The API documentation is available in the `docs` folder. You can also view it using tools like [Postman](https://www.postman.com/) or [Swagger](https://swagger.io/).

### Example Endpoints

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Log in an existing user.
- **GET /api/recipes**: Fetch all recipes.
- **POST /api/recipes**: Create a new recipe.
- **PUT /api/recipes/:id**: Update a recipe by ID.
- **DELETE /api/recipes/:id**: Delete a recipe by ID.

For detailed API documentation, refer to the `docs/api.md` file.

