# Backend Node Setup Instructions

You have successfully generated the Node.js backend files. Since Node.js is not installed or configured in this environment, follow these steps to run the server:

1.  **Install Node.js**: Ensure Node.js is installed on your system. Download it from [nodejs.org](https://nodejs.org/).
2.  **Navigate to the backend directory**:
    ```bash
    cd backend_node
    ```
3.  **Install Dependencies**:
    ```bash
    npm install
    ```
4.  **Configure Database**:
    - Update the `.env` file with your MySQL connection details.
    - Currently set to:
      ```
      DB_HOST=127.0.0.1
      DB_USER=root
      DB_PASSWORD=
      DB_NAME=cmcevent
      DB_PORT=3307
      ```
    - Ensure your MySQL server is running and the `cmcevent` database exists.

5.  **Run the Server**:
    ```bash
    npm start
    ```
    Or for development with auto-restart:
    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:3000/api`.
