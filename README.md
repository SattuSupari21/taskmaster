# TaskMaster

TaskMaster is a task management application designed to help users organize and manage their tasks efficiently. Built using the PERN stack (PostgreSQL, Express.js, React, Node.js), TaskMaster provides a robust backend and a dynamic, user-friendly frontend for an optimal user experience.

## Features

- **Task Management**: Create, read, update, and delete tasks.
- **Due Dates**: Set and manage due dates for tasks.
- **Responsive Design**: Mobile-friendly user interface.

## Technologies Used

- **Frontend:**

  - Next.js
  - Tailwind CSS
  - shadcn/ui
  - Zod

- **Backend:**
  - Node.js
  - Express.js (RESTful API)
  - PostgreSQL (Database)
  - Prisma (ORM)

## Prerequisites

Before running the application, make sure you have the following installed:

- Node.js and npm
- PostgreSQL

## Getting Started

1. Clone the repository:

```
git clone https://github.com/SattuSupari21/taskmaster.git
```

2. Navigate to backend and install dependencies:

```
cd backend
npm install
```

3. Navigate to frontend and install dependencies:

```
cd frontend
npm install
```

4. Set up the PostgreSQL database:
   - Create a new database named `taskmaster`.
   - Paste the connection URL in .env file in the backend directory.
5. Create a .env file in backend directory.

```
DATABASE_URL="postgres://username:password@127.0.0.1:port/taskmaster"
```

6. Start the Backend and Frontend server:

```
npm run dev
```

7. Open your web browser and navigate to `http://localhost:3000` to access the application.

## API Endpoints

#### Tasks

- GET /api/tasks/getAllTasks: Retrieve all tasks.
- POST /api/tasks/createTask: Create a new task.
- GET /api/tasks/getTaskById/id : Retrieve a task by ID.
- PUT /api/tasks/updateTask/id : Update a task by ID.
- DELETE /api/tasks/deleteTask/id : Delete a task by ID.
