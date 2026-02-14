import { Dashboard, Projects, Tasks, CreateProject, CreateTask } from "./pages/index";
import { Login, Signup } from "./auth/index";
import { Navbar } from "./components/index";

import {   
    ProjectDetails,
    TaskDetails,
    Profile
} from "./features/index";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './errors/Unauthorized';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/projects" element={
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        } />
        
        <Route path="/projects/new" element={
          <ProtectedRoute>
            <CreateProject />
          </ProtectedRoute>
        } />
        
        <Route path="/projects/:id" element={
          <ProtectedRoute>
            <ProjectDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/tasks" element={
          <ProtectedRoute>
            <Tasks />
          </ProtectedRoute>
        } />
        
        <Route path="/tasks/new" element={
          <ProtectedRoute>
            <CreateTask />
          </ProtectedRoute>
        } />
        
        <Route path="/tasks/:id" element={
          <ProtectedRoute>
            <TaskDetails />
          </ProtectedRoute>
        } />
        
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;