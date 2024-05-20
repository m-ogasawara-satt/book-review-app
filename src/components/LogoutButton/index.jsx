import React from 'react';
import { useNavigate } from 'react-router-dom';

function LogoutButton({ removeCookie }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('token');
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      ログアウト
    </button>
  );
}

export default LogoutButton;