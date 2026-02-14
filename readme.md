# API Documentation

## Auth Endpoints
- `POST /api/user/register` - Register new user
- `POST /api/user/login` - Login user
- `POST /api/user/logout` - Logout user
- `GET /api/user/profile` - Get user profile
- `POST /api/user/refresh` - Refresh access token

## Project Endpoints
- `GET /api/projects` - Get all projects
- `GET /api/projects/stats` - Get dashboard stats
- `GET /api/projects/:id` - Get single project with tasks
- `POST /api/projects` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## Task Endpoints
- `GET /api/tasks/project/:projectId` - Get project tasks
- `GET /api/tasks/:id` - Get single task
- `POST /api/tasks` - Create task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task