import React from 'react';
import { useForm } from 'react-hook-form';

const AssignmentForm = ({ engineers, projects, onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 bg-white rounded shadow">
      <select {...register('engineerId')} className="input w-full">
        {engineers.map(e => (
          <option key={e._id} value={e._id}>{e.name}</option>
        ))}
      </select>

      <select {...register('projectId')} className="input w-full">
        {projects.map(p => (
          <option key={p._id} value={p._id}>{p.name}</option>
        ))}
      </select>

      <input type="number" {...register('allocationPercentage')} placeholder="Allocation %" className="input w-full" />
      <input type="date" {...register('startDate')} className="input w-full" />
      <input type="date" {...register('endDate')} className="input w-full" />
      <input type="text" {...register('role')} placeholder="Role" className="input w-full" />

      <button type="submit" className="btn-primary w-full">Assign</button>
    </form>
  );
};

export default AssignmentForm;
