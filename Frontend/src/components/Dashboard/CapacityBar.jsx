import React from 'react';

const CapacityBar = ({ allocated, max }) => {
  const percentage = (allocated / max) * 100;
  return (
    <div className="w-full bg-gray-200 rounded-full h-4">
      <div
        className="bg-blue-500 h-4 rounded-full"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default CapacityBar;
