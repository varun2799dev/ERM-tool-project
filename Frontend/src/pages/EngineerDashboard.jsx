import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/UI/Header';
import ProgressLabel from '../components/UI/ProgressLabel';
import SkillTag from '../components/UI/SkillTag';
import { Link } from 'react-router-dom';

const EngineerDashboard = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState([]);

  useEffect(() => {
    if (user?.token) {
      api.getAssignments(user.token).then((data) => {
        const mine = data.filter((a) => {
          const id =
            typeof a.engineerId === 'object'
              ? a.engineerId._id
              : a.engineerId;
          return id === user._id;
        });
        setAssignments(mine);
      });
    }
  }, [user]);

  const totalAllocated = assignments.reduce(
    (sum, a) => sum + a.allocationPercentage,
    0
  );

  return (
    <>
      <Header />
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">My Dashboard</h1>

      <Link to="/engineer/profile" className="text-blue-600 underline">Edit My Profile</Link>

        {/* Capacity Overview */}
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h2 className="text-lg font-semibold">Current Capacity</h2>
          <ProgressLabel label="Allocated" percentage={totalAllocated} />
          <p className="text-sm text-gray-600">
            {user.maxCapacity - totalAllocated}% available
          </p>
        </div>

        {/* Skills */}
        <div className="bg-white p-4 rounded shadow space-y-2">
          <h2 className="text-lg font-semibold">My Skills</h2>
          <div className="flex flex-wrap gap-2">
            {user.skills?.map((s, i) => (
              <SkillTag key={i} skill={s} />
            ))}
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">My Assignments</h2>
          {assignments.length === 0 ? (
            <p className="text-sm text-gray-500">No assignments found.</p>
          ) : (
            <ul className="space-y-4">
              {assignments.map((a) => (
                <li key={a._id} className="p-4 bg-gray-50 rounded border">
                  <strong>Project:</strong> {a.projectId?.name || 'N/A'} <br />
                  <strong>Role:</strong> {a.role} <br />
                  <strong>Duration:</strong>{' '}
                  {new Date(a.startDate).toLocaleDateString()} –{' '}
                  {new Date(a.endDate).toLocaleDateString()} <br />
                  <strong>Allocation:</strong> {a.allocationPercentage}%
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default EngineerDashboard;