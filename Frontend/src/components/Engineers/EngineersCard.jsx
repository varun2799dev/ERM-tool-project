import React from 'react';
import CapacityBar from '../Dashboard/CapacityBar';

const EngineerCard = ({ engineer }) => {
  const { name, skills, maxCapacity, currentAllocation } = engineer;

  return (
    <div className="p-4 bg-white rounded shadow space-y-2">
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-sm text-gray-600">Skills: {skills.join(', ')}</div>
      <CapacityBar allocated={currentAllocation} max={maxCapacity} />
      <div className="text-sm text-gray-500">{currentAllocation}% allocated</div>
    </div>
  );
};

export default EngineerCard;
