# NADSOFT Machine Test - Student Data API and Frontend

## Overview

This project implements a CRUD (Create, Read, Update, Delete) API for student data with normalized tables and pagination logic using Node.js, PostgreSQL, and a React.js frontend.

## Task Overview

* **Task 1: Database Schema Design:** A normalized database schema for storing student information and their marks has been designed, including tables for students and marks with foreign key relationships.
* **Task 2: API CRUD Operations:** RESTful API endpoints using Node.js have been implemented for CRUD operations on student data. These endpoints allow for creating new students, retrieving lists of students, retrieving a single student by ID with their marks, updating student information, and deleting student records.
* **Task 3: API Pagination Logic:** The API has been extended to support pagination for retrieving lists of students. This includes using query parameters for `page` and `limit` and returning paginated results along with metadata like the total count of records.
* **Task 4: React.js Frontend Integration:** A React.js frontend has been developed with Bootstrap forms to interact with the CRUD operations of the Node.js API. It includes a Bootstrap list view to display paginated student records and integrates SweetAlerts for user feedback on create, update, and delete operations.


## Additional Deliverables

* **Code Zip:** The complete Node.js project code, including all necessary files and dependencies, is provided in a zip file.
* **Database Schema SQL Script:** An SQL script to create the necessary tables (`students` and `marks`) and define their relationships in the PostgreSQL database is included.
* **API Collection:** A Postman collection containing requests for testing all API endpoints, including CRUD operations and pagination logic, is provided.

## Getting Started


``` PSQL
   CREATE TABLE students (
       student_id SERIAL PRIMARY KEY,
       name VARCHAR(255) NOT NULL,
       email VARCHAR(255) UNIQUE NOT NULL,
       age INTEGER,
       parent_id INTEGER
   );

   CREATE TABLE marks (
       mark_id SERIAL PRIMARY KEY,
       student_id INTEGER REFERENCES students(student_id) ON DELETE CASCADE,
       subject VARCHAR(255) NOT NULL,
       score INTEGER
   );
```

### Prerequisites

* Node.js and npm installed on your machine.
* PostgreSQL database installed and running.

### Installation and Setup

**Backend (Node.js API):**

1.  Navigate to the backend directory (if you have separate frontend and backend folders).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure the database connection:
    * Create a `.env` file in the backend directory.
    * Add your PostgreSQL database credentials:
        ```env
        DB_HOST=your_db_host
        DB_USER=your_db_user
        DB_PASSWORD=your_db_password
        DB_NAME=your_db_name
        DB_PORT=your_db_port (usually 5432)
        ```
4.  Run the database migration script (if applicable, or import the provided SQL script to create the tables).
5.  Start the backend server:
    ```bash
    npm start
    ```
    The API should be running on a specified port (e.g., `http://localhost:3000`).

**Frontend (React.js):**

1.  Navigate to the frontend directory (if you have separate frontend and backend folders).
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure the API endpoint:
    * In your frontend code (e.g., in service files), ensure the API base URL is correctly set to your Node.js server address.
4.  Start the frontend development server:
    ```bash
    npm start
    ```
    The frontend should be accessible in your browser (e.g., `http://localhost:3001`).

### Database Setup

1.  Ensure PostgreSQL is running.
2.  Use a PostgreSQL client (like pgAdmin or psql) to connect to your database.
3.  above given create table queries to create the `students` and `marks` tables.

### Testing the API

The provided Postman collection (`Nadsoft Machine Test API.postman_collection.json` or similar) can be imported into Postman to test all the API endpoints. Ensure your Node.js server is running before sending requests.

### Frontend Usage (React.js)

The React.js frontend provides the following functionalities:

* **Add New Member:** A form to create new student records.
* **All Members:** A list view displaying paginated student records with details and actions (View, Edit, Delete).
* **Edit Member:** A form to update existing student information.
* **Delete Confirmation:** SweetAlerts are used to confirm delete operations, providing user feedback.


This project demonstrates:

* Normalized database design for relational data.
* Implementation of RESTful API endpoints for CRUD operations.
* Pagination logic for efficient data retrieval.
* Integration of a React.js frontend with a Node.js API.
* Use of Bootstrap for responsive and styled UI components.
* Implementation of user feedback using SweetAlerts.
