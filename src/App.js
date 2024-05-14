import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import BookReview from './pages/BookReview';
import Header from './components/Header';
import LogoutButton from './components/LogoutButton';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const [username, setUsername] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies['token'];
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsername(response.data.username);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.log('No token found');
    }
  }, [cookies]);

  useEffect(() => {
    if (isLoggedIn && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/');
    }
  }, [isLoggedIn, location]);

  return (
    <>
      <Header isLoggedIn={isLoggedIn} setUsername={setUsername} />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<BookReview />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      {isLoggedIn && <LogoutButton setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} removeCookie={removeCookie} />}
    </>
  );
}

export default App;