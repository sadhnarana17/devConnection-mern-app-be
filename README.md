# Project Setup

## Prerequisites
Ensure the following are installed on your system:
- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js
- **Database**: MongoDB 

## Installation Steps
1. **Clone the Repository**:
    ```bash
    git clone <repository-url> /<path>/devConnection
    cd <path>/devConnection
    ```

2. **Install Dependencies**:
    Run the following command to install Node.js dependencies:
    ```bash
    npm install
    ```

3. **Environment Configuration**:
    Copy the `.env.example` file to `.env` and update the necessary environment variables:
    ```bash
    cp .env.example .env
    ```

4. **Database Setup**:
    - Ensure your database is running.
    - Update the `.env` file with the database connection details.

5. **Start the Development Server**:
    Use the following command to start the server:
    ```bash
    npm start:dev
    ```

## Troubleshooting
- Run `npm run lint` to check for code issues.
