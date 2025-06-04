import React from 'react';
import { useForm } from 'react-hook-form';

const LoginForm = ({ onSubmit }) => {
  const { register, handleSubmit } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input {...register('email')} placeholder="Email" className="input w-full" />
      <input {...register('password')} type="password" placeholder="Password" className="input w-full" />
      <button type="submit" className="btn-primary w-full">Login</button>
    </form>
  );
};

export default LoginForm;
