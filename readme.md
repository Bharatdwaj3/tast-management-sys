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



---

### Overview

Scribe is a comprehensive, microservices-oriented task management ecosystem designed to streamline how modern teams organize, track, and execute complex projects. By providing a centralized workspace that bridges the gap between high-level project planning and granular task execution, Scribe empowers users to maintain focus on what matters most: delivering value.

> In the modern digital landscape, teams frequently struggle with fragmented workflows, where project requirements and individual tasks are scattered across disparate tools. This lack of cohesion leads to miscommunication, missed deadlines, and a significant overhead in "work about work." Scribe solves this real-world problem by providing a unified, component-based platform where projects are scoped, tasks are assigned, and progress is visualized in real-time, ensuring everyone from stakeholders to individual contributors stays aligned.

**Scribe** eliminates the friction of manual progress tracking by offering an interactive user interface built on **React** and a robust, scalable **Express** backend. It transforms the chaotic nature of project management into a structured, visible, and manageable process, allowing users to move from ideation to completion with unprecedented clarity.

The system utilizes a modern architecture featuring:

- **Microservices Design:** Separation of concerns between the frontend React interface and the backend Express API.
- **RESTful API:** A standardized communication layer for data integrity.
- **Component-based Architecture:** A modular frontend that ensures a responsive and consistent user experience.

---

### Key Features

Scribe is built with a focus on the user journey, ensuring that every feature translates directly into a tangible business benefit.

-  **Interactive Unified Dashboard:** Gain a bird's-eye view of all ongoing activities. Users can monitor project health and task distribution at a glance, reducing the time spent on status update meetings.
- **Scoped Project Organization:** Group related efforts into logical "Projects." This allows users to compartmentalize different workstreams and manage resources more effectively without cognitive overload.
- **Granular Task Management:** Drill down into specific action items. With dedicated task tabs and grids, users can manage the lifecycle of an individual unit of work from "To-Do" to "Done."
-  **Personalized User Profiles:** Dedicated profile management where users can track their specific contributions, view personal metrics, and manage their identity within the system.
-  **Secure Environment:** Features a protected routing system and secure authentication (via JWT and Bcrypt), ensuring that sensitive project data is only accessible to authorized team members.
- **Responsive Layouts:** A professional UI featuring a consistent Navbar, Hero sections, and Footers, providing a seamless experience whether the user is on a desktop or a mobile device.
- **Containerized Deployment:** Ready for modern cloud environments using Docker and Docker Compose, ensuring "it works on my machine" translates to "it works in production."

---

### Tech Stack & Architecture

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

###  Usage

#### Interacting with the UI

1. **Landing Page:** Users arrive at the `Hero` section which introduces the value proposition of Scribe.
2. **Authentication:** Users must sign up or log in via the `auth/` module to access their personal workspace.
3. **The Dashboard:** Once authenticated, the `Dashboard` serves as the command center.
    - Use the **ProjectTab** to create and categorize new project scopes.
    - Use the **TaskTab** to add specific tasks, set priorities, and track progress.
4. **Profile Management:** Access the `Profile` section to update user settings and view activity history.


---

### 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.
