import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import BookReview from './pages/BookReview';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/books" element={<BookReview />} />
      </Routes>
    </Router>
  );
}

export default App;
