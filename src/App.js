import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={
          <>
            <LoginForm />
            <Link to="/signup">
              <button>Sign Up</button>
            </Link>
          </>
        } />
        <Route path="/signup" element={<SignupForm />} />
      </Routes>
    </Router>
  );
}

export default App;
