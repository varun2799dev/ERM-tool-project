import React from 'react';

const ProgressLabel = ({ label, percentage }) => (
  <div className="w-full">
    <div className="flex justify-between text-sm mb-1">
      <span>{label}</span>
      <span>{percentage}%</span>
    </div>
    <div className="w-full bg-gray-300 h-3 rounded-full">
      <div
        className="bg-blue-500 h-3 rounded-full"
        style={{ width: `${percentage}%` }}
      />
    </div>
  </div>
);

export default ProgressLabel;
