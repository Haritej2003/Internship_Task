
# 📋 Skygoal_Task_Manager_Project

> **Developer:** Juvvagani Hari Tej  
> **Email:** harijuvvagani@gmail.com  
> **Project:** Backend Task Manager (Skygoal Backend Development Internship Project)
> [Deployed URL](https://skygoal-task-manager-project-haritej.onrender.com/) 🚀
---

## 📖 Project Overview

The **Task Manager API** is a robust backend system built for managing user tasks securely with **role-based access control**. It features user authentication, CRUD operations for tasks, and administrative controls.

---

## 🚀 Key Features

- JWT-based secure authentication
- Role-based access control (`user`, `admin`)
- Full CRUD for tasks
- Admin functionalities for user management
- Password encryption using bcrypt
- Secure input validation and sanitization

---

## 🛠️ Technology Stack

| Technology        | Purpose                          |
|--------------------|----------------------------------|
| Node.js            | Runtime environment             |
| Express.js         | Web framework                   |
| MongoDB            | Database                        |
| JWT                | Authentication                  |
| Bcrypt             | Password hashing                |
| Express-validator  | Input validation                |

---

## ⚙️ Environment Variables

Create a `.env` file with the following variables:

```bash
PORT=9000
MONGODB_URL=your_mongodb_connection_string
SALT_ROUNDS=10
JWT_SECRET=your_jwt_secret_key_here
```

---

## 📚 API Endpoints

### Authentication

- `POST /auth/signup` → Register a new user
- `POST /auth/login` → Login with existing credentials

### User Task Management

- `POST /user/create-task` → Create a task
- `GET /user/get-tasks` → Get all tasks for logged-in user
- `GET /user/get-task?taskId=task-id` → Get specific task by ID
- `PUT /user/update-task?taskId=task-id` → Update a specific task
- `DELETE /user/delete-task?taskId=task-id` → Delete a specific task

### Admin Functionalities

- `GET /admin/get-users` → Get all users
- `GET /admin/get-user?userId=user-id` → Get a specific user
- `DELETE /admin/delete-user?userId=user-id` → Delete a user and their tasks

---

## 🔐 Authentication & Authorization

- **Authentication:** via JWT tokens in `Authorization: Bearer <token>` header.
- **Roles:**
  - **User**: Manage own tasks
  - **Admin**: Manage all users 

---

## 🧪 Testing Instructions

1. Register via `POST /auth/signup`
2. Login via `POST /auth/login` and get the token
3. Include the token in `Authorization` header for all protected routes.
4. Use Postman or any API client to test user and admin flows.

---

## 🛡️ Security Measures

- Passwords hashed securely using bcrypt
- Data validation and sanitization
- Role-based route protection
- JWT token expiry enforcement
- Proper error handling without leaking sensitive information

---

## 📢 Best Practices

- Keep your JWT token secure.
- Use strong passwords.
- Handle expired tokens gracefully.
- Always validate API responses and errors properly on client side.

---

## ✨ Final Note

This project demonstrates strong backend principles with a focus on security, clean architecture, and scalability.

