import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

function LogoutButton({ setIsLoggedIn, setUsername }) {
  const [removeCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const handleLogout = () => {
    removeCookie('token');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
  };

  return (
    <button onClick={handleLogout}>サインアウト</button>
  );
}

export default LogoutButton;