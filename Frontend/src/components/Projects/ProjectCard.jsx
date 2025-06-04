

import React from 'react';

const ProjectCard = ({ project }) => {
  const { name, description, requiredSkills, status } = project;
  return (
    <div className="p-4 bg-white rounded shadow space-y-2">
      <div className="text-xl font-bold">{name}</div>
      <p className="text-gray-600">{description}</p>
      <div className="text-sm text-blue-600">Skills: {requiredSkills.join(', ')}</div>
      <div className={`text-sm ${status === 'active' ? 'text-green-600' : 'text-yellow-600'}`}>
        Status: {status}
      </div>
    </div>
  );
};

export default ProjectCard;
