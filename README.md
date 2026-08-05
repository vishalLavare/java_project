# 🎓 Student Management System (Full-Stack)

🚀 **[View Live Demo](https://vishallavare.github.io/java_project/)**

A modern, full-stack **Student Management Application** built with a **Java 21 & Spring Boot 3** REST API backend and a **React 19 & Vite** frontend.

Designed with a clean 3-tier layered architecture, persistence via **Spring Data JPA** (supporting **H2 In-Memory DB** and **MySQL**), and a responsive glassmorphism UI with real-time health monitoring, live search, and full CRUD operations.


---

## 🏗️ Architecture Overview

```text
┌────────────────────────────────────────────────────────────────────────┐
│                         Docker Compose Network                         │
│                                                                        │
│   ┌──────────────────────┐  HTTP / JSON  ┌─────────────────────────┐   │
│   │  Frontend Container  │ ------------> │    Backend Container    │   │
│   │   (Nginx + React)    │  (Port 8080)  │  (Spring Boot + Java)   │   │
│   │   Port 3000 -> 80    │               │      Port 8080          │   │
│   └──────────────────────┘               └────────────┬────────────┘   │
│                                                       │                │
│                                                   Spring JPA           │
│                                                       │                │
│                                                       ▼                │
│                                          ┌─────────────────────────┐   │
│                                          │     MySQL Container     │   │
│                                          │   (Database: student_db)│   │
│                                          │      Port 3306          │   │
│                                          └─────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🐳 Docker & Containerized Environment

The application is fully containerized using **Docker** and **Docker Compose**. You can launch the entire 3-tier system (React Frontend, Spring Boot Backend, and MySQL Database) with a single command.

### Containers Overview

| Container | Image / Base | Service Name | Host Port | Description |
|---|---|---|---|---|
| **Frontend** | `nginx:alpine` (Multi-stage `node:20-alpine`) | `frontend` | `3000` | Nginx web server hosting React 19 production build |
| **Backend** | `eclipse-temurin:21-jre` (Multi-stage `maven:3.9-alpine`) | `backend` | `8080` | Spring Boot REST API application running Java 21 |
| **Database** | `mysql:8.0` | `db` | `3306` | MySQL database storing `student_db` persistent records |

### Running with Docker Compose

1. **Ensure Docker Desktop is running**.
2. **Launch all containers**:
   ```bash
   docker compose up --build -d
   ```
3. **Access the application**:
   - **Frontend UI**: [http://localhost:3000](http://localhost:3000)
   - **Backend API**: [http://localhost:8080/students](http://localhost:8080/students)
   - **MySQL Database**: `localhost:3306` (User: `root`, Password: `vishal`, Database: `student_db`)

4. **Stop & remove containers**:
   ```bash
   docker compose down
   ```
   To remove persistent database volumes as well:
   ```bash
   docker compose down -v
   ```


---

## ✨ Key Features

### 🎨 Frontend (React + Vite)
- **Modern Glassmorphism UI**: Dark mode UI styled with clean CSS, gradients, and micro-interactions.
- **Live Search & Filter**: Instant filtering of student records by name, email, or course.
- **Real-Time API Health Monitor**: Dynamic latency indicator showing backend status and ping time.
- **Full CRUD Interface**:
  - View all student records in an interactive grid/table format.
  - Create new student records with real-time validation.
  - Edit existing student details via modal dialogs.
  - Delete records with confirmation prompts.
- **Toast Notifications**: Interactive feedback for success and error actions.

### ⚡ Backend (Spring Boot + Spring Data JPA)
- **Java 21 (LTS) & Spring Boot 3.3.2**: Latest standards and modern features.
- **Layered Architecture**: Clean separation of concerns across `Controller`, `Service`, `Repository`, `Model`, and `Exception` packages.
- **Dual Database Support**:
  - **H2 In-Memory DB** (Default profile for zero-config quick start).
  - **MySQL Database** (`mysql` profile for persistent production databases).
- **Auto Data Seeding**: Automatically populates sample student records on startup if the database is empty.
- **Jakarta Validation (`@Valid`)**: Input validation for non-blank fields and valid email syntax.
- **Global Exception Handling (`@ControllerAdvice`)**: Standardized JSON error responses for `404 Not Found` and `400 Bad Request`.
- **H2 Web Console**: Accessible at `http://localhost:8080/h2-console` when using H2 database.
- **CORS Configured**: Ready for cross-origin requests from frontend apps.

---

## 🛠️ Technology Stack

| Domain | Technology | Version | Purpose |
|---|---|---|---|
| **Backend** | Java | 21 (LTS) | Programming Language |
| | Spring Boot | 3.3.2 | Application Framework |
| | Spring Data JPA | 3.3.2 | Data Persistence & ORM |
| | Jakarta Validation | 3.0 | Payload & DTO Validation |
| | Apache Maven | 3.9+ | Build & Dependency Management |
| **Frontend** | React | 19.2 | User Interface Library |
| | Vite | 8.1 | Build Tool & Dev Server |
| | Lucide React | 1.27 | Modern UI Icon Set |
| | Vanilla CSS | CSS3 | Custom Responsive Design System |
| **Database** | H2 Database | Scope: Runtime | In-Memory Database (Development) |
| | MySQL | 8.0+ | Relational Database (Production Profile) |

---

## 📂 Project Structure

```text
javaproject/
├── backend/                                   # Spring Boot REST API
│   ├── pom.xml                                # Maven Dependencies & Build Configuration
│   └── src/
│       ├── main/
│       │   ├── java/com/example/studentmanagement/
│       │   │   ├── StudentManagementApplication.java # Main Application Entry Point
│       │   │   ├── controller/
│       │   │   │   └── StudentController.java         # REST Endpoints (@CrossOrigin, @RestController)
│       │   │   ├── exception/
│       │   │   │   ├── GlobalExceptionHandler.java    # Centralized Error Responses
│       │   │   │   └── ResourceNotFoundException.java # Custom 404 Exception
│       │   │   ├── model/
│       │   │   │   └── Student.java                   # JPA Entity & Validation Rules
│       │   │   ├── repository/
│       │   │   │   └── StudentRepository.java         # Spring Data JPA Repository Interface
│       │   │   └── service/
│       │   │       └── StudentService.java            # Business Logic & @PostConstruct Seeding
│       │   └── resources/
│       │       ├── application.properties             # Default Config (H2 DB Enabled)
│       │       └── application-mysql.properties       # MySQL Profile Configuration
│       └── test/                              # Unit & Integration Tests
│
└── frontend/                                  # React 19 + Vite Application
    ├── package.json                           # NPM Dependencies & Scripts
    ├── vite.config.js                         # Vite Configuration
    ├── index.html                             # Application Entry Document
    └── src/
        ├── main.jsx                            # React App Mount Point
        ├── App.jsx                             # Main Dashboard Component & State Management
        ├── App.css                             # Dashboard Layout & Glassmorphism Styling
        ├── index.css                           # Global Styles & Theme Variables
        └── services/
            └── api.js                          # Service Module for REST API Integration
```

---

## 💻 How to Run Locally

### Prerequisites
- **JDK 21** installed (`java -version`)
- **Maven 3.8+** installed (`mvn -v`)
- **Node.js 18+ & NPM** installed (`node -v`, `npm -v`)

---

### Step 1: Run the Spring Boot Backend

Navigate to the `backend` directory:
```bash
cd backend
```

#### Option A: Run with In-Memory H2 Database (Default - No Setup Required)
```bash
mvn spring-boot:run
```
The backend server will start at **`http://localhost:8080`**.
- H2 Web Console: **`http://localhost:8080/h2-console`**
  - JDBC URL: `jdbc:h2:mem:studentdb`
  - User: `sa`
  - Password: *(leave empty)*

#### Option B: Run with MySQL Database
1. Create a MySQL database named `student_db`:
   ```sql
   CREATE DATABASE student_db;
   ```
2. Update database credentials in `backend/src/main/resources/application-mysql.properties`:
   ```properties
   spring.datasource.username=root
   spring.datasource.password=your_mysql_password
   ```
3. Run the application with the `mysql` profile active:
   ```bash
   mvn spring-boot:run -Dspring-boot.run.profiles=mysql
   ```

---

### Step 2: Run the React Frontend

Open a new terminal window and navigate to the `frontend` directory:
```bash
cd frontend
```

Install dependencies (if running for the first time):
```bash
npm install
```

Start the Vite development server:
```bash
npm run dev
```

The frontend application will be live at: **`http://localhost:5173`**

---

## 🧪 REST API Reference

Base Endpoint: **`http://localhost:8080/students`**

| Method | Endpoint | Description | Request Body | HTTP Status Codes |
|---|---|---|---|---|
| `GET` | `/students` | Get all students | None | `200 OK` |
| `GET` | `/students/{id}` | Get student by ID | None | `200 OK`, `404 Not Found` |
| `POST` | `/students` | Create new student | JSON Student object | `201 Created`, `400 Bad Request` |
| `PUT` | `/students/{id}` | Update existing student | JSON Student object | `200 OK`, `404 Not Found`, `400 Bad Request` |
| `DELETE` | `/students/{id}` | Delete student by ID | None | `204 No Content`, `404 Not Found` |

---

### Sample cURL Requests

#### 1. Retrieve All Students
```bash
curl -X GET http://localhost:8080/students
```
**Response (`200 OK`):**
```json
[
  {
    "id": 1,
    "name": "Alice Smith",
    "email": "alice.smith@example.com",
    "course": "Computer Science"
  },
  {
    "id": 2,
    "name": "Bob Johnson",
    "email": "bob.johnson@example.com",
    "course": "Data Science"
  }
]
```

#### 2. Create a New Student
```bash
curl -X POST http://localhost:8080/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Diana Prince",
    "email": "diana.prince@example.com",
    "course": "Cyber Security"
  }'
```
**Response (`201 Created`):**
```json
{
  "id": 5,
  "name": "Diana Prince",
  "email": "diana.prince@example.com",
  "course": "Cyber Security"
}
```

#### 3. Update Student Record
```bash
curl -X PUT http://localhost:8080/students/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Alice Smith Updated",
    "email": "alice.updated@example.com",
    "course": "Artificial Intelligence"
  }'
```
**Response (`200 OK`):**
```json
{
  "id": 1,
  "name": "Alice Smith Updated",
  "email": "alice.updated@example.com",
  "course": "Artificial Intelligence"
}
```

#### 4. Delete Student
```bash
curl -X DELETE http://localhost:8080/students/1
```
**Response (`204 No Content`):** Empty body

#### 5. Validation Error Handling Example
```bash
curl -X POST http://localhost:8080/students \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "email": "invalid-email-format",
    "course": ""
  }'
```
**Response (`400 Bad Request`):**
```json
{
  "timestamp": "2026-07-29T16:30:00",
  "status": 400,
  "error": "Bad Request",
  "validationErrors": {
    "name": "Name is required and cannot be blank",
    "email": "Please provide a valid email address",
    "course": "Course is required and cannot be blank"
  }
}
```

---

## 📦 Production Packaging

### Build Backend JAR
```bash
cd backend
mvn clean package
```
The compiled executable JAR will be located at:
`backend/target/student-management-api-0.0.1-SNAPSHOT.jar`

To run the standalone JAR:
```bash
java -jar target/student-management-api-0.0.1-SNAPSHOT.jar
```

### Build Frontend Production Assets
```bash
cd frontend
npm run build
```
Optimized static production files will be generated in the `frontend/dist` directory.

---

## ☁️ Deployment Guide (AWS EC2 Ubuntu)

### Step 1: Launch EC2 Instance & Open Ports
- Launch an Ubuntu 22.04 / 24.04 LTS instance (`t2.micro` or `t3.micro`).
- In Security Group settings, open:
  - **Port 22** (SSH)
  - **Port 8080** (Spring Boot REST API)
  - **Port 80 / 5173** (Frontend Web Server)

### Step 2: Deploy Backend Service
1. Connect via SSH:
   ```bash
   ssh -i "your-key.pem" ubuntu@<EC2_PUBLIC_IP>
   ```
2. Install OpenJDK 21:
   ```bash
   sudo apt update
   sudo apt install openjdk-21-jdk -y
   ```
3. Upload JAR and run as a systemd background service:
   ```bash
   sudo nano /etc/systemd/system/student-api.service
   ```
   *Systemd Config:*
   ```ini
   [Unit]
   Description=Student Management Spring Boot REST API
   After=network.target

   [Service]
   User=ubuntu
   ExecStart=/usr/bin/java -jar /home/ubuntu/student-management-api-0.0.1-SNAPSHOT.jar
   SuccessExitStatus=143
   Restart=always

   [Install]
   WantedBy=multi-user.target
   ```
4. Start service:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable student-api
   sudo systemctl start student-api
   ```

---

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
