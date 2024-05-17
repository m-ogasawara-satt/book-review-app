import React from 'react';
import { useNavigate } from 'react-router-dom';

// function LogoutButton({ setUsername, removeCookie }) {
function LogoutButton({ removeCookie }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('token');
    // setUsername('');
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>ログアウト</button>
  );
}

export default LogoutButton;