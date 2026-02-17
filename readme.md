<h1 align="center"> Scribe: A task management system </h1>

<p align="center">
  Elevating organizational productivity through seamless task orchestration and intuitive project lifecycle management.
</p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge">
  <img alt="Issues" src="https://img.shields.io/badge/Issues-0%20Open-blue?style=for-the-badge">
  <img alt="Contributions" src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge">
</p>
---

### 📌 Table of Contents

- [](#)
  - [📌 Table of Contents](#-table-of-contents)
  - [🚀 Overview](#-overview)
  - [✨ Key Features](#-key-features)
  - [🛠️ Tech Stack \& Architecture](#️-tech-stack--architecture)
    - [Architectural Overview](#architectural-overview)
  - [📁 Project Structure](#-project-structure)
  - [🚀 Getting Started](#-getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation \& Setup](#installation--setup)
  - [🔧 Usage](#-usage)
    - [Interacting with the UI](#interacting-with-the-ui)
    - [API Interaction](#api-interaction)
  - [Development Guidelines](#development-guidelines)
  - [📝 License](#-license)

---

### 🚀 Overview

Scribe is a comprehensive, microservices-oriented task management ecosystem designed to streamline how modern teams organize, track, and execute complex projects. By providing a centralized workspace that bridges the gap between high-level project planning and granular task execution, Scribe empowers users to maintain focus on what matters most: delivering value.

> In the modern digital landscape, teams frequently struggle with fragmented workflows, where project requirements and individual tasks are scattered across disparate tools. This lack of cohesion leads to miscommunication, missed deadlines, and a significant overhead in "work about work." Scribe solves this real-world problem by providing a unified, component-based platform where projects are scoped, tasks are assigned, and progress is visualized in real-time, ensuring everyone from stakeholders to individual contributors stays aligned.

**Scribe** eliminates the friction of manual progress tracking by offering an interactive user interface built on **React** and a robust, scalable **Express** backend. It transforms the chaotic nature of project management into a structured, visible, and manageable process, allowing users to move from ideation to completion with unprecedented clarity.

The system utilizes a modern architecture featuring:

- **Microservices Design:** Separation of concerns between the frontend React interface and the backend Express API.
- **RESTful API:** A standardized communication layer for data integrity.
- **Component-based Architecture:** A modular frontend that ensures a responsive and consistent user experience.

---

### ✨ Key Features

Scribe is built with a focus on the user journey, ensuring that every feature translates directly into a tangible business benefit.

- 📊 **Interactive Unified Dashboard:** Gain a bird's-eye view of all ongoing activities. Users can monitor project health and task distribution at a glance, reducing the time spent on status update meetings.
- 📁 **Scoped Project Organization:** Group related efforts into logical "Projects." This allows users to compartmentalize different workstreams and manage resources more effectively without cognitive overload.
- ✅ **Granular Task Management:** Drill down into specific action items. With dedicated task tabs and grids, users can manage the lifecycle of an individual unit of work from "To-Do" to "Done."
- 👤 **Personalized User Profiles:** Dedicated profile management where users can track their specific contributions, view personal metrics, and manage their identity within the system.
- 🔒 **Secure Environment:** Features a protected routing system and secure authentication (via JWT and Bcrypt), ensuring that sensitive project data is only accessible to authorized team members.
- 📱 **Responsive Layouts:** A professional UI featuring a consistent Navbar, Hero sections, and Footers, providing a seamless experience whether the user is on a desktop or a mobile device.
- 🐳 **Containerized Deployment:** Ready for modern cloud environments using Docker and Docker Compose, ensuring "it works on my machine" translates to "it works in production."

---

### 🛠️ Tech Stack & Architecture

Scribe leverages a battle-tested technical stack to ensure performance, security, and maintainability.

| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **React** | Frontend Library | Enables a highly responsive, component-driven UI that allows for real-time state management across the dashboard. |
| **Express** | Backend Framework | Provides a lightweight and flexible foundation for building the RESTful API and handling business logic efficiently. |
| **Mongoose** | ODM / Database Logic | Offers a schema-based solution to model application data, ensuring data integrity for tasks and users. |
| **Docker** | Deployment & DevOps | Simplifies environment configuration and ensures consistency across development, testing, and production stages. |
| **JWT** | Authentication | Facilitates secure, stateless communication between the client and server for protected resources. |
| **Bcryptjs** | Security | Implements industry-standard password hashing to protect user credentials at rest. |

#### Architectural Overview

1. **Client Layer:** Built with React, utilizing Redux-style slices (via `store.js`) for managing state across tasks, projects, and authentication.
2. **API Layer:** An Express server acting as the orchestrator, routing requests through custom middleware for token validation and database connectivity.
3. **Data Layer:** Utilizes Mongoose models to define the structure of Users, Tasks, and Projects, ensuring consistent data storage and retrieval.

---

### 📁 Project Structure

```
Bharatdwaj3-tast-management-sys-3c08f4b/
├── 📄 docker-compose.yml           # Orchestrates frontend and backend containers
├── 📂 frontend/                    # React client-side application
│   ├── 📄 index.html               # Entry point for the web browser
│   ├── 📄 vite.config.js           # Configuration for the Vite build tool
│   ├── 📄 Dockerfile               # Container definition for the frontend
│   ├── 📄 .env.example             # Template for client-side environment variables
│   ├── 📂 src/
│   │   ├── 📄 main.jsx             # React application mount point
│   │   ├── 📄 App.jsx              # Root component and routing logic
│   │   ├── 📂 components/          # Reusable UI building blocks
│   │   │   ├── 📄 Navbar.jsx       # Global navigation bar
│   │   │   ├── 📄 Hero.jsx         # Landing page hero section
│   │   │   └── 📄 ProtectedRoute.jsx # Auth-guarded route wrapper
│   │   ├── 📂 features/            # Business logic components
│   │   │   ├── 📄 Dashboard.jsx    # Main user workspace
│   │   │   ├── 📄 TaskTab.jsx      # Task management interface
│   │   │   └── 📄 ProjectTab.jsx   # Project organization interface
│   │   ├── 📂 auth/                # Identity management components
│   │   │   ├── 📄 Login.jsx        # User sign-in interface
│   │   │   └── 📄 Signup.jsx       # New user registration
│   │   ├── 📂 store/               # Redux/State management logic
│   │   │   ├── 📄 taskSlice.js     # State for task operations
│   │   │   └── 📄 authSlice.js     # State for authentication status
│   │   └── 📂 util/                # Client-side utility functions
│   │       └── 📄 api.js           # Axios/Fetch API configuration
└── 📂 backend/                     # Node.js server-side application
    ├── 📄 server.js                # Main entry point for the backend server
    ├── 📄 Dockerfile               # Container definition for the backend
    ├── 📄 .env.example             # Template for server-side environment variables
    ├── 📂 src/
    │   ├── 📂 config/              # Server and database configurations
    │   │   ├── 📄 db.config.js     # Mongoose connection logic
    │   │   └── 📄 env.config.js    # Environment variable loader
    │   ├── 📂 middleware/          # Request processing layers
    │   │   ├── 📄 auth.middleware.js # JWT verification logic
    │   │   └── 📄 db.middleware.js   # Database connectivity checks
    │   ├── 📂 models/              # Database schema definitions
    │   │   ├── 📄 user.model.js    # User data structure
    │   │   ├── 📄 task.model.js    # Task data structure
    │   │   └── 📄 project.model.js # Project data structure
    │   ├── 📂 routes/              # API endpoint definitions
    │   │   ├── 📄 task.routes.js   # Routes for task operations
    │   │   └── 📄 user.routes.js   # Routes for user management
    │   └── 📂 controller/          # Business logic implementation
    │       ├── 📄 task.controller.js # Logic for processing task requests
    │       └── 📄 user.controller.js # Logic for processing user requests
```

---

### 🚀 Getting Started

To get a local instance of Scribe up and running, follow these steps.

#### Prerequisites

- **Docker & Docker Compose:** Recommended for the easiest setup.

- **Node.js:** If running outside of Docker (v18+ recommended).

#### Installation & Setup

1. **Clone the Repository:**

    ```bash
    git clone https://github.com/Bharatdwaj3/tast-management-sys.git
    cd Bharatdwaj3-tast-management-sys-3c08f4b
    ```

2. **Environment Configuration:**
    - Navigate to the `backend/` directory and rename `.env.example` to `.env`.
    - Navigate to the `frontend/` directory and rename `.env.example` to `.env`.
    - Fill in the required fields (Database URIs, Secrets).

3. **Run with Docker (Recommended):**
    The project includes a `docker-compose.yml` file that automates the setup of both the frontend and backend.

    ```bash
    docker-compose up --build
    ```

4. **Manual Local Setup (Alternative):**
    - **Backend:**

        ```bash
        cd backend
        npm install
        npm run dev
        ```

    - **Frontend:**

        ```bash
        cd frontend
        npm install
        npm run dev
        ```

---

### 🔧 Usage

#### Interacting with the UI

1. **Landing Page:** Users arrive at the `Hero` section which introduces the value proposition of Scribe.
2. **Authentication:** Users must sign up or log in via the `auth/` module to access their personal workspace.
3. **The Dashboard:** Once authenticated, the `Dashboard` serves as the command center.
    - Use the **ProjectTab** to create and categorize new project scopes.
    - Use the **TaskTab** to add specific tasks, set priorities, and track progress.
4. **Profile Management:** Access the `Profile` section to update user settings and view activity history.

#### API Interaction

The backend exposes a RESTful interface. While the system primarily interacts via the frontend, you can verify connectivity:

- **Health Check:**
  - **Endpoint:** `GET /`
  - **Description:** Returns the base status of the Express server to confirm it is operational.

---

### Development Guidelines

- ✅ Follow the existing React/Express code style and conventions.
- 📝 Add comments for complex logic in controllers and store slices.
- 🧪 Ensure the Docker build passes before submitting a PR.
- 🎯 Keep commits focused and atomic.

---

### 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.
