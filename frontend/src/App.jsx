import {
    ProjectDetails, TaskDetails ,
    Profile,
    ProjectTab,TaskTab,
    Dashboard,
    ItemDetails, ItemGrid
}from "./features/index";
import { Login, Signup } from "./auth/index";
import { Navbar } from "./components/index";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Unauthorized from './errors/Unauthorized';

import {Home, NewStory} from "./pages/index"
import ProfileModal from "./features/ProfileModal";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        <Route path="/project" element={<ProtectedRoute><ProjectTab /></ProtectedRoute>} />
        <Route path="/projects/new" element={<ProtectedRoute><NewStory type="project" /></ProtectedRoute>} />
        <Route path="/projects/:id" element={<ProtectedRoute><ItemDetails type="project" /></ProtectedRoute>} />
        <Route path="/projects/:id/edit" element={<ProtectedRoute><NewStory type="project" /></ProtectedRoute>} />

        <Route path="/tasks" element={<ProtectedRoute><TaskTab /></ProtectedRoute>} />
        <Route path="/tasks/new" element={<ProtectedRoute><NewStory type="task"/></ProtectedRoute>} />
        <Route path="/tasks/:id" element={<ProtectedRoute><ItemDetails type="task" /></ProtectedRoute>} />
        <Route path="/tasks/:id/edit" element={<ProtectedRoute><NewStory type="task" /></ProtectedRoute>} />
      
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/profile/edit" element={
          <ProtectedRoute>
            <ProfileModal />
          </ProtectedRoute>
        } />
      </Routes>

      
    </Router>
  );
}

export default App;