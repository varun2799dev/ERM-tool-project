import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import ManagerDashboard from './pages/ManagerDashboard';
import EngineerDashboard from './pages/EngineerDashboard';
import ProjectPage from './pages/ProjectPage';
import AssignmentPage from './pages/AssignmentPage';
import CreateProjectPage from './pages/CreateProjectPage';
import EngineerProfile from './pages/EngineerProfile';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/manager" element={<ManagerDashboard />} />
          <Route path="/engineer" element={<EngineerDashboard />} />
          <Route path="/projects" element={<ProjectPage />} />
          <Route path="/assignments" element={<AssignmentPage />} />
          <Route path="/projects/create" element={<CreateProjectPage/>} />
          <Route path="/engineer/profile" element={<EngineerProfile/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
