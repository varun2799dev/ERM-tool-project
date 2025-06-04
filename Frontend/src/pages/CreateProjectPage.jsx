import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import api from '../services/api';
import Header from '../components/UI/Header';
import { useNavigate } from 'react-router-dom';

export default function CreateProjectPage() {
  const { register, handleSubmit } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      await api.createProject({ ...data, managerId: user._id }, user.token);
      alert('Project created!');
      navigate('/projects');
    } catch (err) {
      console.error(err);
      alert('Error creating project.');
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-xl mx-auto bg-white rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">Create New Project</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('name')} placeholder="Project Name" className="input w-full" />
          <textarea {...register('description')} placeholder="Description" className="input w-full" />
          <input type="date" {...register('startDate')} className="input w-full" />
          <input type="date" {...register('endDate')} className="input w-full" />
          <input {...register('teamSize')} type="number" placeholder="Team Size" className="input w-full" />
          <input {...register('requiredSkills')} placeholder="Required Skills (comma separated)" className="input w-full" />
          <select {...register('status')} className="input w-full">
            <option value="planning">Planning</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
          </select>
          <button type="submit" className="btn-primary w-full">Create Project</button>
        </form>
      </div>
    </>
  );
}
