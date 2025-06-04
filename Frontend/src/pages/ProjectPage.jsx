import React, { useState, useEffect } from 'react';
import ProjectCard from '../components/Projects/ProjectCard';
import api from '../services/api'; 
import { useAuth } from '../hooks/useAuth'; 
import Header from '../components/UI/Header';
import {Link} from 'react-router-dom'

const ProjectPage = () => {
  const [projects, setProjects] = useState([]);
  const { user } = useAuth(); 

  useEffect(() => {
    if (user?.token) {
      api.getProjects(user.token).then(setProjects);
    }
  }, [user]);

  return (
    <>
    <Header />
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Projects</h1>
      <Link to="/projects/create" className="btn-primary mb-4 inline-block">+ New Project</Link>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project._id} project={project} />
        ))}
      </div>
    </div>
    </>
  );
};

export default ProjectPage;
