# Setup Instructions

  1. Clone the repository

  Backend
    Navigate to the backtend directory:
      cd backend
    1. Install dependencies:
        npm install
    2. Create a .env file in the root of the project and add the following environment variables:
        PORT=5000
        FRONTEND_URL=http://localhost:3000
    3. Start the server:
          npm run dev
  
  Frontend
    Navigate to the frontend directory:
      cd frontend
    1. Install dependencies:
        npm install
    2. Create a .env file in the root of the project and add the following environment variables:
        REACT_APP_API_URL=http://localhost:5000/api/templates
    3. Start the server:
          npm start

# API Documentation

## 1. POST /api/templates/parse

**Description**: Parses a template string and replaces placeholders with the provided data.

- **Request Body**:
  - **Content-Type**: `application/json`
  - **Example**:
    ```json
    {
      "template": "Hello, {{name}}!",
      "data": { "name": "Jomin" }
    }
    ```

- **Response**:
   - **Success Response**:
     - **Status**: 200 OK
     - **Body**:
       ```json
       {
         "success": true,
         "parsedMessage": "Hello, Jomin!"
       }
       ```

   - **Error Response**:
     - **Status**: 400 Bad Request
     - **Body**:
       ```json
       {
         "success": false,
         "message": "Invalid or missing template string."
       }
       ```

---

## 2. GET /api/templates/validate

**Description**: Validates a template string and extracts placeholders.

- **Query Parameters**:
  - `template`: The template string to be validated.
  - **Example**: `template=Hello, {{user}} from {{place}}`

- **Response**:
   - **Success Response**:
     - **Status**: 200 OK
     - **Body**:
       ```json
       {
         "success": true,
         "placeholders": ["user", "place"]
       }
       ```

   - **Error Response**:
     - **Status**: 400 Bad Request
     - **Body**:
       ```json
       {
         "success": false,
         "message": "Invalid or missing template string."
       }
       ```

---

## 3. POST /api/templates/preview

**Description**: Generates a preview of the template with the provided sample data.

- **Request Body**:
   - **Content-Type**: `application/json`
   - **Example**:
     ```json
     {
       "template": "Welcome, {{username}}!",
       "sampleData": { "username": "Jomin" }
     }
     ```

- **Response**:
   - **Success Response**:
     - **Status**: 200 OK
     - **Body**:
       ```json
       {
         "success": true,
         "preview": "Welcome, Jomin!"
       }
       ```

   - **Error Response**:
     - **Status**: 400 Bad Request
     - **Body**:
       ```json
       {
         "success": false,
         "message": "Invalid or missing template string."
       }
       ```

---

## General Response Structure

- **Success**:
  ```json
  {
    "success": true,
    "data": { ... }   // This would contain the specific data for the endpoint.
  }
  ```
**Failure**:
  ```json
  {
    "success": false,
    "message": "Error message"   // A brief description of the error.
  }

  ```
Conclusion
This API documentation outlines all the endpoints, request bodies, and expected responses. It should help developers quickly integrate with your API and handle errors more effectively.

# Approach Explanation

Backend
The backend is built using Express.js, which handles the following:

Routing: The templateRoutes.js file defines the routes for the three main operations: parsing, validating, and previewing templates.
Error Handling: The errorHandler.js middleware catches and handles any errors that occur in the API routes.
Environment Variables: The dotenv package is used to load environment variables from a .env file, such as the port number and frontend URL.
CORS: The backend allows requests from the frontend using the cors package, which ensures that the frontend app can communicate with the backend.
Frontend
The frontend is built with React.js and provides a user interface to interact with the API. The main component is TemplateForm, which allows users to input a template and sample data, then displays the result.

The frontend makes requests to the backend API using fetch() or a similar library, and displays the parsed message or validation result in the UI.

API Design
The API follows RESTful principles, with clear, descriptive endpoints.
JSON is used for both request and response bodies.
The API is designed to be simple and focused, with clear operations for parsing, validating, and previewing templates.


# Future Improvements

Authentication: Add authentication and authorization mechanisms (e.g., JWT) for user-specific templates and preview data.
Database Integration: Store templates in a database (e.g., MongoDB) to allow users to save and retrieve their templates.
Template Management: Allow users to create, update, delete, and manage their templates through the API.


