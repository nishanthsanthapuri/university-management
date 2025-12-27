🎓 University Management System

Full-Stack Enterprise Application (Spring Boot + React + MySQL + Docker)

A production-grade University Management System built to demonstrate real-world backend engineering, secure authentication, REST API design, database modeling, and containerized deployment.

This project is not a toy or academic demo — it is designed to reflect how enterprise applications are built and explained in interviews.

🚀 Key Highlights

🔐 Secure JWT Authentication (Access + Refresh Tokens)

🧑‍💼 Role-based authorization (Admin / User ready)

📦 Clean REST API architecture

🗄️ Relational database design with MySQL

🐳 Fully Dockerized (Backend, Frontend, Database)

📄 Swagger/OpenAPI documentation

⚙️ Production-ready configuration practices

🧠 Why This Project Matters (Recruiter View)

This project demonstrates:

Backend engineering depth (Spring Boot internals, JPA, Security)

Real authentication flow used in companies

Database + ORM expertise

Docker & environment management

Ability to debug real production issues

System-level thinking, not just CRUD

🏗️ System Architecture (High-Level)

Client (React SPA)
        |
        | REST APIs (JSON)
        v
Spring Boot Backend
        |
        | ORM (JPA / Hibernate)
        v
MySQL Database

All services can run:

Locally (without Docker)

Inside Docker containers

Using Docker Compose (recommended)

🧰 Tech Stack
Frontend

React (Vite)

Axios

React Router

Nginx (for Docker production build)

Backend

Java 21

Spring Boot 3

Spring Security

Spring Data JPA (Hibernate)

JWT (Access + Refresh Tokens)

SpringDoc OpenAPI (Swagger)

Database

MySQL 8+

Relational schema with constraints

DevOps / Tools

Docker

Docker Compose

Maven

Git & GitHub

📁 Project Structure
university-management/
│
├── backend/
│   ├── src/main/java/com/university/management
│   │   ├── controller
│   │   ├── service
│   │   ├── repository
│   │   ├── entity
│   │   └── security
│   ├── application.properties
│   ├── Dockerfile
│   └── pom.xml
│
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── nginx.conf
│
├── docker-compose.yml
└── README.md


📂 Codebase Structure (Backend)

com.university.management
├── controller    → REST API layer
├── service       → Business logic
├── repository    → Data access (JPA)
├── entity        → Database models
├── security      → JWT, filters, config
└── config        → Cross-cutting concerns

🔐 Authentication & Security Design
Authentication Flow

User logs in with username & password

Backend validates credentials

Generates:

Access Token (JWT) – short-lived

Refresh Token – stored securely in DB

Access token is sent with each API request

Refresh token is used to re-issue access token when expired

Security Features

Password hashing

JWT validation filter

Stateless authentication

Role-based access support

CORS handling for frontend-backend communication

🗄️ Database Design (Core Tables)
Users
Column	Type	Description
id	BIGINT	Primary key
username	VARCHAR	Unique login
password	VARCHAR	Encrypted
email	VARCHAR	User email
role	VARCHAR	USER / ADMIN
enabled	BOOLEAN	Account status
Refresh Tokens
Column	Type	Description
id	BIGINT	Primary key
token	VARCHAR	Refresh token
expiry_date	TIMESTAMP	Expiry
user_id	BIGINT	FK to users
📘 API Documentation (Swagger)

Swagger UI is enabled for easy testing.

http://localhost:8081/swagger-ui/index.html


Use this during interviews to visually explain APIs.

🐳 Running the Project with Docker (Recommended)
Prerequisites

Docker

Docker Compose

Start All Services
docker compose up -d --build

Services
Service	URL
Frontend	http://localhost:3000

Backend	http://localhost:8081

Swagger	http://localhost:8081/swagger-ui


This enables:

API exploration

Contract validation

Interview demonstrations
🧪 Running Locally (Without Docker)
Backend
cd backend
./mvnw spring-boot:run

Frontend
cd frontend
npm install
npm run dev

Containers
Service	Description
Backend	Spring Boot API
Frontend	React + Nginx
Database	MySQL


Start Everything
docker compose up -d --build






⚙️ Configuration Strategy

No secrets are hardcoded

Environment-based configuration

Easily portable to:

Local

Docker

Cloud (AWS / Railway / Render)

🧑‍💼 Interview Talking Points (VERY IMPORTANT)

You should be able to explain:

Why JWT over session-based auth

Difference between access & refresh tokens

How Spring Security filters work

Why Docker is used

How database schema supports scalability

How you would deploy this in production

Tradeoffs you made and why

🚀 Future Enhancements (Optional)

Admin dashboard

Pagination & filtering

Audit logs

Role-based UI rendering

CI/CD pipeline

Cloud deployment

Redis caching

🏁 Project Status

✅ Backend complete
✅ Frontend complete
✅ Authentication implemented
✅ Dockerized
✅ Interview-ready

🙌 Final Note

This project was intentionally built to reflect how real companies build backend systems, not just to “pass assignments”.
