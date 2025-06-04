import React from 'react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import Header from '../components/UI/Header';
import api from '../services/api';

export default function EngineerProfile() {
  const { user, login } = useAuth();
  const { register, handleSubmit, reset } = useForm({
    defaultValues: {
      name: user.name,
      skills: user.skills?.join(', '),
      seniority: user.seniority,
    },
  });

  const onSubmit = async (data) => {
    const updatedUser = {
      name: data.name,
      skills: data.skills.split(',').map((s) => s.trim()),
      seniority: data.seniority,
    };

    try {
      const result = await api.updateEngineer(user._id, updatedUser, user.token);
      alert('Profile updated!');
      login({ ...user, ...updatedUser }); // update context
      reset({ ...data });
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  return (
    <>
      <Header />
      <div className="p-6 max-w-xl mx-auto bg-white rounded shadow space-y-4">
        <h2 className="text-xl font-semibold">My Profile</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input {...register('name')} className="input w-full" placeholder="Name" />
          <input {...register('skills')} className="input w-full" placeholder="Skills (comma separated)" />
          <select {...register('seniority')} className="input w-full">
            <option value="junior">Junior</option>
            <option value="mid">Mid</option>
            <option value="senior">Senior</option>
          </select>
          <button type="submit" className="btn-primary w-full">Update Profile</button>
        </form>
      </div>
    </>
  );
}
