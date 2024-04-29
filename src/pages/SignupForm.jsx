import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';

function SignupForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);

  const handleImageUpload = (e) => {
    new Compressor(e.target.files[0], {
      quality: 0.6,
      success(result) {
        setFile(result);
        setFileName(result.name);
      },
      error(err) {
        console.log('画像圧縮中のエラー内容:', err.message);
      },
    });
  };

  const createUser = async (data) => {
    const { username, email, password } = data;
    if (!file) {
      setError('All fields are required');
      return;
    }
    try {
      const response = await axios.post('https://railway.bookreview.techtrain.dev/users', {
        name: username,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        alert('User created successfully');
        setFile(null);
        setFileName('');
      }
    } catch (err) {
      setApiError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(createUser)}>
      <input type="username" {...register('username', { required: true, maxLength: 20 })} placeholder="Username" />
      {errors.username && <p style={{ color: 'red' }}>ユーザー名は20文字以内としてください。</p>}
      
      <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="Email" />
      {errors.email && <p style={{ color: 'red' }}>メールアドレスの形式が正しくありません。</p>}
      
      <input type="password" {...register('password', { required: true, minLength: 6 })} placeholder="Password" />
      {errors.password && <p style={{ color: 'red' }}>パスワードは6文字以上としてください。</p>}
      
      <Box>
        <Button variant="contained" color="primary" component="label" style={{ position: 'relative' }}>
          <input 
            accept="image/*" 
            type="file" 
            onChange={handleImageUpload} 
            style={{ opacity: 0, position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} 
            required
          />
          画像を選択
        </Button>
        <Typography sx={{ mt: 2 }}>
          {fileName}
        </Typography>
      </Box>
      
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {apiError && <Alert severity="error">{apiError}</Alert>}
      <button type="submit">Sign up</button>
      <Link to="/">既に会員登録がお済みの方はこちら</Link>
    </form>
  );
}

export default SignupForm;
