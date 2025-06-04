import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-white shadow flex justify-between items-center p-4 mb-6">
      <h1 className="text-xl font-bold text-blue-600">ERM tool</h1>
      {user && (
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">👋 {user.name}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
