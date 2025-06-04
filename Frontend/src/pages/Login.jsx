import { useForm } from 'react-hook-form';
import api from '../services/api';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const result = await api.login(data);
      if (result.token) {
        login({ ...result.user, token: result.token });
        if (result.user.role === 'manager') navigate('/manager');
        if (result.user.role === 'engineer') navigate('/engineer');
      } else {
        alert('Login failed. Check email or password.');
      }
    } catch (err) {
      alert('Server error. Try again later.'+err);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-100 to-white">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-center text-blue-600">Engineer Resource Manager</h1>
        <p className="text-sm text-gray-500 text-center">Login to view or manage your team assignments</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('email', { required: true })}
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
          </div>

          <div>
            <input
              {...register('password', { required: true })}
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">Password is required</p>}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <div className="text-sm text-gray-400 text-center pt-4 border-t">
          <p className="mb-1">Test Users:</p>
          <p>Manager ➤ <span className="text-gray-600">manager@example.com / password</span></p>
          <p>Engineer ➤ <span className="text-gray-600">alice@example.com / alice123</span></p>
        </div>
      </div>
    </div>
  );
}
