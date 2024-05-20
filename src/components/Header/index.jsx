import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../LogoutButton/index';

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [cookies, removeCookie, setCookie] = useCookies(['token']);

  useEffect(() => {
    const token = cookies['token'];
    if (token) {
      axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsername(response.data.name);
      })
      .catch((error) => {
        console.error('Error:', error);
        removeCookie('token');
        setUsername('');
      });
    } else {
      setUsername('');
    }
  }, [cookies]);

  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between items-center mb-4">
      <h1 className="text-lg font-bold">Book Review</h1>
      {username ? (
        <div className="flex items-center">
          <span className="mr-2">User:</span>
          <span className="font-medium mr-4">{username}</span>
          <Link to="/profile">Edit Profile</Link>
          <LogoutButton removeCookie={removeCookie} />
        </div>
      ) : (
        <button 
          onClick={() => navigate('/login')} 
          className="bg-white text-blue-500 px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </header>
  );
}

export default Header;