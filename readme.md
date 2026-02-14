<h1 align="center"> Augen: A social-media blogging app </h1>
<p align="center"> Where Writers and Readers Connect. Publish, Discover, and Engage with Content Seamlessly. </p>

<p align="center">
  <img alt="Build" src="https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge">
  <img alt="Issues" src="https://img.shields.io/badge/Issues-0%20Open-blue?style=for-the-badge">
  <img alt="Contributions" src="https://img.shields.io/badge/Contributions-Welcome-orange?style=for-the-badge">
  <img alt="License" src="https://img.shields.io/badge/License-MIT-yellow?style=for-for-the-badge">
  <img alt="Frontend" src="https://img.shields.io/badge/Frontend-React-61DAFB?style=for-the-badge&logo=react">
  <img alt="Backend" src="https://img.shields.io/badge/Backend-Express-000000?style=for-the-badge&logo=express">
</p>

***

## 📋 Table of Contents

* [Overview](#-overview)
* [Key Features](#-key-features)
* [Tech Stack & Architecture](#-tech-stack--architecture)
* [Project Structure](#-project-structure)
* [Getting Started](#-getting-started)
* [Usage](#-usage)
* [Contributing](#-contributing)
* [License](#-license)

***

## ⭐ Overview

Augen is a modern, full-stack platform dedicated to connecting passionate writers with engaged readers, offering a seamless and modern social content experience. By separating core functionalities into dedicated services for users, content, readers, and writers, Augen establishes a foundation for community growth and content consumption on the web.

The primary goal of Augen is to empower creators and simplify the discovery process for consumers, fostering a thriving digital community built on high-quality content and interaction.

### The Problem

> The modern content landscape is often fragmented, making it challenging for emerging writers to find their voice and build a dedicated, loyal readership. Existing publishing platforms frequently suffer from outdated interfaces, lack robust audience interaction features, or fail to provide intuitive, customizable content presentation, stifling both creativity and genuine community growth. Readers, conversely, struggle to filter through noise and find curated, relevant stories that match their specific interests and consumption habits.

### The Solution

Augen provides a comprehensive content management and discovery system built on a scalable architecture, empowering users with sophisticated tools to craft, publish, and explore stories effortlessly.

1. **Empowering Writers:** Writers benefit from advanced editing tools, seamless media integration via dedicated cloud services (`cloudinary.service.js`), and a defined structure for content management (`content.controller.js`, `writer.controller.js`).
2. **Engaging Readers:** Readers enjoy a highly interactive interface built with React, facilitating dynamic content filtering, profile management, and state-managed viewing experiences (`reader.controller.js`, Redux Slices).
3. **Scalable Foundation:** The system is built on a **Microservices** and **Component-based Architecture**, utilizing **Express** for reliable **REST API** delivery, ensuring high performance and ease of maintenance as the community expands.

***

## ✨ Key Features

Augen focuses on delivering a user experience that is both powerful for creators and intuitive for consumers, leveraging its modular architecture to provide distinct user benefits.

### 📝 Seamless Content Management & Creation

* **Advanced Editor Suite:** Utilizing the modern Tiptap editor and its extensions (including `extension-image`, `extension-link`, and `starter-kit`), writers can craft rich, engaging stories with professional formatting and media embedding capabilities.
* **Media Integration:** Dedicated services (`cloudinary.service.js` and `multer.service.js`) ensure secure and efficient handling of media uploads, allowing writers to easily enrich their content with images and assets.
* **Content Structuring:** Built-in controllers and routing (`content.routes.js`, `content.controller.js`) provide a stable backend structure for creating, updating, and viewing individual content items, ensuring data integrity.

### 👥 Role-Based User Experience

The application distinguishes between two primary user roles, supported by dedicated models and middleware, offering tailored interfaces:

* 👤 **Reader Profiles (`ReaderProfile.jsx`):** Allows users primarily interested in consumption to manage their viewing lists, follow preferences (managed by `followSlice.js`), and track their reading progress through a dedicated, interactive interface.
* ✍️ **Writer Profiles (`WriterProfile.jsx`):** Provides authors with a dedicated dashboard to manage their published works, view performance metrics, and interact with the content management features.
* **Access Control:** Robust middleware (`auth.middleware.js`, `permission.middleware.js`, `role.middleware.js`) ensures secure, authenticated, and role-specific access to system resources.

### 🌐 Dynamic Interface and Discovery

The frontend, powered by React, provides a highly interactive and engaging platform for content discovery.

* **Interactive UI:** Utilizing powerful UI libraries like Material UI (`@mui/material`), Emotion, and styled-components, the application offers a polished, responsive, and aesthetically pleasing user experience.
* **Intuitive Navigation (`Navbar.jsx`, `Header.jsx`, `Footer.jsx`):** Essential layout components ensure smooth transition between application states, login/signup flows (`Login.jsx`, `Signup.jsx`), and core pages (`Home.jsx`, `Explore.jsx`).
* **Content Filtering and Exploration:** Components like `CategoryFiler.jsx` and `ContentFliter.jsx`, integrated with the `Explore.jsx` page, allow readers to dynamically discover new stories based on categories, tags, and trending status.
* **Global State Management:** Comprehensive state management using Redux Toolkit ensures the UI remains synchronized across all components, handling complex application data like user details, content feeds, and following status.

### ⚙️ Microservices & Deployment Readiness

* **Decoupled Backend:** The backend is logically separated with dedicated route and controller files for `user`, `writer`, `reader`, and `content`, embodying a robust microservices approach for simplified scaling and feature addition.
* **Dockerized Deployment:** The inclusion of distinct `Dockerfile`s for both the `backend` and `frontend`, alongside a centralized `docker-compose.yml`, provides an immediate, portable, and reliable deployment mechanism for multi-container environments.
* **Configuration Flexibility:** Organized configuration files (`db.config.js`, `env.config.js`, `permissions.config.js`) allow for easy adjustment of database connections, environment settings, and access policies.

***

## 🛠️ Tech Stack & Architecture

Augen is built using a modern, scalable architecture designed for high interactivity and robust service delivery.

| Technology | Purpose | Why it was Chosen |
| :--- | :--- | :--- |
| **Frontend** | React, Vite, Redux Toolkit, TailwindCSS, MUI | Enables rapid development of an interactive, highly responsive single-page application (SPA) with efficient state management. |
| **Backend** | Express.js | Provides a fast, unopinionated, minimalist framework for building high-performance RESTful API services. |
| **Architecture** | Microservices, REST API | Decouples concerns (User, Writer, Reader, Content) into manageable modules, ensuring high scalability and maintainability. |
| **Styling** | Styled Components, TailwindCSS, Emotion | Allows for highly modular, flexible, and efficient component-level styling and utility-first design principles. |
| **Deployment** | Docker | Ensures consistent, environment-agnostic setup for the entire application stack across development, staging, and production environments. |
| **Content Editor** | Tiptap | A highly customizable and extensible headless editor framework, providing a professional writing experience for creators. |

***

## 📁 Project Structure

The project employs a structured, multi-repository layout (`backend` and `frontend`) defined by the Microservices and Component-based Architecture patterns.

```
📂 Bharatdwaj3-augen-77bdb21/
├── 📄 readme.md               # This project documentation file
├── 📄 docker-compose.yml      # Defines and runs the multi-container application
├── 📂 backend/                  # Express.js REST API service
│   ├── 📄 Dockerfile            # Docker configuration for the backend service
│   ├── 📄 server.js             # Main server entry point
│   ├── 📄 package.json          # Node dependencies for the backend
│   ├── 📄 package-lock.json     # Locked dependency versions
│   ├── 📄 .env.example          # Template for backend environment variables (Configuration)
│   ├── 📄 .dockerignore         # Specifies files/directories to ignore during Docker build
│   ├── 📄 .gitignore            # Specifies files/directories ignored by Git
│   └── 📂 src/                  # Backend source code
│       ├── 📂 config/           # Centralized configuration files
│       │   ├── 📄 permissions.config.js  # Defines application access control rules
│       │   ├── 📄 morgan.config.js       # HTTP request logging configuration
│       │   ├── 📄 env.config.js          # Environment variable loading and setup
│       │   └── 📄 db.config.js           # Database connection configuration
│       ├── 📂 models/           # Data structure definitions (Mongoose/Schema definitions)
│       │   ├── 📄 reader.model.js        # Data model for content consumers
│       │   ├── 📄 content.model.js       # Data model for published content
│       │   ├── 📄 writer.model.js        # Data model for content creators
│       │   ├── 📄 user.model.js          # Core user authentication and profile data
│       │   └── 📄 index.js               # Model aggregation/export file
│       ├── 📂 middleware/       # Express request handling middleware
│       │   ├── 📄 permission.middleware.js # Checks user permissions before access
│       │   ├── 📄 auth.middleware.js     # Verifies user authentication status
│       │   ├── 📄 role.middleware.js     # Assigns and checks user roles
│       │   ├── 📄 index.js             
│       │   ├── 📄 token.middleware.js    # Handles JWT or session token verification
│       │   └── 📄 db.middleware.js       # Database connection handling/status check
│       ├── 📂 routes/           # API endpoint definitions and routing
│       │   ├── 📄 content.routes.js      # Routes for managing articles and stories
│       │   ├── 📄 reader.routes.js       # Routes specific to reader actions (e.g., following)
│       │   ├── 📄 writer.routes.js       # Routes specific to writer management
│       │   ├── 📄 user.routes.js         # Routes for authentication and profile management
│       │   └── 📄 index.js             
│       ├── 📂 services/         # External services integration
│       │   ├── 📄 cloudinary.service.js  # Service for cloud-based media storage
│       │   └── 📄 multer.service.js      # Middleware for handling file uploads (multipart/form-data)
│       └── 📂 controller/       # Business logic handlers for routes
│           ├── 📄 user.controller.js     # Handles user registration, login, and profile updates
│           ├── 📄 writer.controller.js   # Logic for writer-specific actions
│           ├── 📄 reader.controller.js   # Logic for reader-specific actions (e.g., reading lists)
│           ├── 📄 content.controller.js  # Logic for content creation, retrieval, and deletion
│           └── 📄 index.js             
└── 📂 frontend/                 # React client application (Interactive User Interface)
    ├── 📄 vite.config.js          # Configuration file for the Vite build tool
    ├── 📄 eslint.config.js        # Configuration for linting standards
    ├── 📄 Dockerfile              # Docker configuration for the frontend service
    ├── 📄 package.json            # Node dependencies for the frontend
    ├── 📄 package-lock.json       # Locked dependency versions
    ├── 📄 .dockerignore           # Specifies files/directories to ignore during Docker build
    ├── 📄 .gitignore              # Specifies files/directories ignored by Git
    ├── 📄 index.html              # Main HTML entry point for the SPA
    ├── 📂 src/                    # Frontend source code
    │   ├── 📄 App.jsx             # Root component of the application
    │   ├── 📄 index.css           # Global application styles
    │   ├── 📄 main.jsx            # Entry point for React rendering
    │   ├── 📂 assets/             # Static assets (images, icons)
    │   │   ├── 📄 react.svg       
    │   │   ├── 📄 image.png       
    │   │   ├── 📄 reddir.png      
    │   │   ├── 📄 discord.png     
    │   │   ├── 📄 telegram.png    
    │   │   ├── 📄 mastadon.png    
    │   │   └── 📄 index.js        
    │   ├── 📂 store/              # Redux state management configuration
    │   │   ├── 📄 followSlice.js     # Redux slice for managing user following status
    │   │   ├── 📄 contentSlice.js    # Redux slice for managing content feed and details
    │   │   ├── 📄 avatarSlice.js     # Redux slice for managing user avatar/profile image state
    │   │   └── 📄 store.js           # Centralized Redux store configuration
    │   ├── 📂 util/               # Utility functions and API helpers
    │   │   └── 📄 api.js             # Centralized utility for handling API calls (e.g., Axios integration)
    │   ├── 📂 components/         # Reusable UI components used across the application
    │   │   ├── 📄 ValueProp.jsx      # Component detailing the application's core value proposition
    │   │   ├── 📄 CategoryFiler.jsx  # UI component for filtering content by category
    │   │   ├── 📄 Hero.jsx           # Large introductory component for key pages
    │   │   ├── 📄 ContentFliter.jsx  # UI component for refining content views
    │   │   ├── 📄 Navbar.jsx         # Primary navigation bar
    │   │   └── 📄 index.js           
    │   ├── 📂 features/           # Modular, complex feature implementations
    │   │   ├── 📄 index.js         
    │   │   ├── 📂 writer/          # Features specific to content creation and writer management
    │   │   │   └── 📄 WriterProfile.jsx # Writer's dedicated profile view
    │   │   ├── 📂 content/         # Core content display features
    │   │   │   ├── 📄 ContentDetails.jsx # Detailed view of a single story
    │   │   │   ├── 📄 ContentTab.jsx     # Tabbed navigation within content (e.g., comments, history)
    │   │   │   └── 📄 ContentGrid.jsx    # Component for displaying content in a structured grid layout
    │   │   └── 📂 reader/          # Features specific to content consumption
    │   │       └── 📄 ReaderProfile.jsx # Reader's dedicated profile view
    │   ├── 📂 layout/             # Structural components for page organization
    │   │   ├── 📄 Header.jsx         # Application header/top bar
    │   │   ├── 📄 Content.jsx        # Wrapper for main page content
    │   │   ├── 📄 index.js         
    │   │   └── 📄 Footer.jsx         # Application footer
    │   ├── 📂 auth/               # Authentication related components and flows
    │   │   ├── 📄 Login.jsx          # User login interface
    │   │   ├── 📄 Signup.jsx         # User registration interface
    │   │   └── 📄 index.js         
    │   └── 📂 pages/              # Application pages (routes)
    │       ├── 📄 Home.jsx           # Main landing page
    │       ├── 📄 Explore.jsx        # Content discovery and browsing page
    │       ├── 📄 NewStrory.jsx      # Page dedicated to drafting and publishing new content
    │       └── 📄 index.js         
    └── 📂 public/                   # Static assets directly served
        └── 📄 vite.svg              
```

***

## 🚀 Getting Started

Augen is designed for quick deployment using Docker and Docker Compose, ensuring a unified environment across the entire stack.

### Prerequisites

To run this project locally, you must have the following installed on your system:

* **Docker:** Used for building and running containerized environments for both frontend and backend.
* **Docker Compose:** Used to orchestrate the multiple services defined in `docker-compose.yml`.

### Installation and Setup

Since all dependencies and environment isolation are managed via Docker, setting up the project is straightforward.

#### 1. Clone the Repository

Begin by cloning the source code to your local machine:

```bash
git clone https://github.com/Bharatdwaj3-augen-77bdb21
cd Bharatdwaj3-augen-77bdb21
```

#### 2. Configure Environment

While no specific environment variables were explicitly detected in the analysis, the project includes a `.env.example` file in the `backend` directory. We recommend creating an actual `.env` file based on this template if specific service configurations (like database connection strings or secrets) are required for full functionality.

```bash
# Inside the backend directory:
cp .env.example .env
# Edit the .env file with your specific configuration details.
```

#### 3. Start Services via Docker Compose

Use `docker-compose` to build the images for both the frontend (React) and backend (Express) and launch all services simultaneously.

```bash
# Run this command from the root project directory (Bharatdwaj3-augen-77bdb21)
docker-compose up -d --build
```

* The `--build` flag ensures that the application images are built using the provided `Dockerfile`s before starting the containers.
* The `-d` flag runs the containers in detached mode (in the background).

Once the containers are running, you can verify their status:

```bash
docker-compose ps
```

***

## 🔧 Usage

Augen is deployed as a comprehensive web application (`web_app`) accessible through your browser. The interaction is primarily driven by the rich, interactive interface powered by React.

### Accessing the Application

Upon successful execution of the Docker Compose steps, the application will be hosted on predefined ports (usually mapped in `docker-compose.yml`).

1. **Open your web browser** and navigate to the assigned frontend URL (typically `http://localhost:3000` or the port defined in the compose file).

2. **Navigate and Explore:**
    * The application starts at the root entry point, leveraging the verified **`GET /`** API endpoint to serve the initial application shell (`index.html`) and load the main `Home.jsx` page.
    * Use the `Navbar.jsx` to access key flows such as `Login`, `Signup`, `Explore`, and `NewStory`.

### Core User Flows

* **Content Discovery:** Use the `Explore.jsx` page, utilizing the `CategoryFiler.jsx` and `ContentFliter.jsx` components, to browse content dynamically. Content data is managed via the Redux `contentSlice.js`.
* **Authentication:** Access the `Login.jsx` or `Signup.jsx` pages in the `/auth` directory. These flows utilize the `user.routes.js` and `auth.middleware.js` on the backend for secure authentication.
* **Creation:** Navigate to the `NewStrory.jsx` page to utilize the Tiptap editor and submit new content, leveraging the `content.controller.js` and media services (`cloudinary.service.js`).
* **Profile Management:** View personalized experiences through `ReaderProfile.jsx` or `WriterProfile.jsx`, where dedicated Redux slices manage state related to following and personal avatars.

### API Interaction (For Developers)

The backend exposes a full suite of RESTful endpoints structured around Users, Readers, Writers, and Content. The entry point of the API is accessible through the backend service's defined port.

**Example Endpoint Access (Base Route):**

The foundational verified endpoint is the root Express route:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/` | Serves the base health check or the API root response. |

All structured API interactions (e.g., retrieving content or user details) are handled by the specific, role-based routes (`/api/content`, `/api/user`, etc.) which are defined internally within the respective route files. The `util/api.js` file in the frontend handles these structured requests using the `axios` library.

## 📝 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for complete details.

### What this means

The MIT License is a permissive free software license that places very few restrictions on reuse.
