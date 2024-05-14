import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';

function Header() {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
    const [username, setUsername] = useState('');
    const [cookies] = useCookies(['token']);
  
    // Add this useEffect
    useEffect(() => {
      const handleStorageChange = () => {
        setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      };
  
      window.addEventListener('storage', handleStorageChange);
  
      // Cleanup function
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }, []);
  
    useEffect(() => {
      const token = cookies['token'];
      if (isLoggedIn && token) {
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
        });
      }
    }, [cookies, isLoggedIn]);
  
    return (
      <header>
        {isLoggedIn ? (
          <>
            <div>{username}</div>
          </>
        ) : (
          <button onClick={() => navigate('/login')}>Login</button>
        )}
      </header>
    );
  }

export default Header;