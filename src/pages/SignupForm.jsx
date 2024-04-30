import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Typography, Box, Alert } from '@mui/material';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';

function SignupForm() {
  // registerは、input要素にReact Hook Formを適用するための関数、handleSubmitはフォームの送信時に実行される関数、formStateはフォームの状態を管理するオブジェクト
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState(null);
  const [apiError, setApiError] = useState(null);

  // ユーザーが画像ファイル選択時に実行される関数で選択されたファイルを圧縮する
  const handleImageUpload = (e) => {
    new Compressor(e.target.files[0], {
      quality: 0.6,
      success(result) {
        setFile(result);
        setFileName(result.name);
      },
      error(error) {
        console.log('画像圧縮中にエラーが発生しました。:', error.message);
      },
    });
  };

  // ユーザーがフォームを送信した際に実行される関数で、入力されたユーザー情報をAPIに送信する
  const createUser = async (data) => {
    const { username, email, password } = data;
    if (!file) {
      setError('アイコンに設定する画像を選択してください。');
      return;
    }
    try {
      const response = await axios.post('https://railway.bookreview.techtrain.dev/users', {
        name: username,
        email: email,
        password: password,
      });

      if (response.status === 200) {
        alert('ユーザー登録が完了しました。');
        setFile(null);
        setFileName('');
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(createUser)} className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-5 shadow-md rounded-md">
      <input type="username" {...register('username', { required: true, maxLength: 20 })} placeholder="ユーザー名" className="w-full p-2 my-2 border border-gray-300 rounded-md" />
      {errors.username && <p className="text-red-500 mb-2">ユーザー名は20文字以内としてください。</p>}
      
      <input type="email" {...register('email', { required: true, pattern: /^\S+@\S+$/i })} placeholder="メールアドレス" className="w-full p-2 my-2 border border-gray-300 rounded-md" />
      {errors.email && <p className="text-red-500 mb-2">メールアドレスの形式が正しくありません。</p>}
      
      <input type="password" {...register('password', { required: true, minLength: 6 })} placeholder="パスワード" className="w-full p-2 my-2 border border-gray-300 rounded-md" />
      {errors.password && <p className="text-red-500 mb-2">パスワードは6文字以上としてください。</p>}
      
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
      
      {error && <p className="text-red-500">{error}</p>}
      {apiError && <Alert severity="error">{apiError}</Alert>}
      <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-700">新規作成</button>
      <Link to="/login" className="text-blue-500 hover:underline">既に会員登録がお済みの方はこちら</Link>
    </form>
  );
}

export default SignupForm;