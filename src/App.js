import React, { useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import BookReview from './pages/BookReview';
import BookDetail from './pages/BookDetail';
import EditBookReview from './pages/EditBookReview';
import Profile from './components/profile/index';
import NewBookReview from './components/NewBookReview/index';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import { tokenState } from './recoilAtoms';

function App() {
  const token = useRecoilValue(tokenState);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.log('トークン情報がありません');
    }
  }, [token]);

  useEffect(() => {
    if (token && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/');
    }
  }, [token, location, navigate]);

  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<BookReview />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/new" element={<NewBookReview />} />
        <Route path="/detail/:id" element={<BookDetail />} />
        <Route path="/edit/:id" element={<EditBookReview />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </>
  );
}

export default App;
