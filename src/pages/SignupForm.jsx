import React, { useState } from 'react';
import axios from 'axios';
import Compressor from 'compressorjs';
import { Link } from 'react-router-dom';

function SignupForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // Add this line
    new Compressor(file, {
      quality: 0.6,
      success(result) {
        const reader = new FileReader();
        reader.readAsDataURL(result);
        reader.onloadend = () => {
          setAvatar(reader.result);
          console.log('File resized and avatar state updated'); // Add this line
        };
      },
      error(err) {
        console.log(err.message);
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://railway.bookreview.techtrain.dev/users', {
        name: username,
        email: email,
        password: password,
        avatar: avatar,
      });
      if (response.status === 200) {
        alert('User created successfully');
        setUsername('');
        setEmail('');
        setPassword('');
        setAvatar(null);
      }
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input type="file" accept="image/*" onChange={handleImageUpload} required />
      {error && <p>{error}</p>}
      <button type="submit">Sign up</button>
      <Link to="/login">Already have an account? Log in</Link>
    </form>
  );
}

export default SignupForm;
