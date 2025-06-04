import React, { useState, useEffect } from 'react';
import AssignmentForm from '../components/Assignments/AssignmentForm';
import api from '../services/api'; 
import { useAuth } from '../hooks/useAuth'; 
import Header from '../components/UI/Header';

const AssignmentPage = () => {
  const [engineers, setEngineers] = useState([]);
  const [projects, setProjects] = useState([]);
  const { user } = useAuth(); // ✅ Fix: access token

  useEffect(() => {
    if (user?.token) {
      api.getEngineers(user.token).then(setEngineers);
      api.getProjects(user.token).then(setProjects);
    }
  }, [user]);

  const handleSubmit = async (data) => {
    try {
      await api.createAssignment(data, user.token); // ✅ Fix: use correct `data`
      alert('Assignment created!');
    } catch (err) {
      console.error(err);
      alert('Error creating assignment');
    }
  };

  return (
    <>
    <Header />
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create New Assignment</h1>
      <AssignmentForm
        engineers={engineers}
        projects={projects}
        onSubmit={handleSubmit}
      />
    </div>
    </>
  );
};

export default AssignmentPage;
