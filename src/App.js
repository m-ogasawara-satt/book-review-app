// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LoginForm from './pages/LoginForm';
// import SignupForm from './pages/SignupForm';
// import BookReview from './pages/BookReview';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<LoginForm />} />
//         <Route path="/signup" element={<SignupForm />} />
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/books" element={<BookReview />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import BookReview from './pages/BookReview';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cookies, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const token = cookies['token'];
    if (token) {
      setIsLoggedIn(true);
      axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.log('No token found');
    }
  }, [cookies]);

  const handleLogout = () => {
    setIsLoggedIn(false);
    removeCookie('token');
    window.location.href = '/login';
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <LoginForm /> : <Navigate to="/books" />} />
        <Route path="/signup" element={!isLoggedIn ? <SignupForm /> : <Navigate to="/books" />} />
        <Route path="/" element={<Navigate to={isLoggedIn ? "/books" : "/login"} />} />
        <Route path="/books" element={isLoggedIn ? <BookReview /> : <Navigate to="/login" />} />
      </Routes>
      {isLoggedIn && <button onClick={handleLogout}>Sign Out</button>}
    </Router>
  );
}

export default App;
