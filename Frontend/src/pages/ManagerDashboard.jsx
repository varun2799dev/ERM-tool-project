import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/UI/Header';
import ProgressLabel from '../components/UI/ProgressLabel';
import SkillTag from '../components/UI/SkillTag';
import CreateProjectPage from './CreateProjectPage';
import { Link, useNavigate } from 'react-router-dom';

export default function ManagerDashboard() {
  const { user } = useAuth();
  const [engineers, setEngineers] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.token) {
      api.getEngineers(user.token).then(setEngineers);
    }
  }, [user]);

  function handleNavigate(){
    return navigate('/projects/create')
  }

  return (
    <>
      <Header />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Team Overview</h1>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div >
            <button onClick={handleNavigate}>Create Project</button>
           </div>
                     {engineers.map((e) => {
            const allocated = e.maxCapacity; // or replace with actual from assignments
            return (
              <li key={e._id} className="p-4 bg-white rounded-lg shadow-md space-y-3">
                <div className="text-lg font-semibold">{e.name}</div>

                <ProgressLabel
                  label="Capacity"
                  percentage={allocated}
                />

                <div className="text-sm text-gray-600">Skills:</div>
                <div className="flex flex-wrap gap-2">
                  {e.skills.map((s, i) => (
                    <SkillTag key={i} skill={s} />
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}