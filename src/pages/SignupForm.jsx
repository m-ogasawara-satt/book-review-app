// 必要なモジュールとCSSをインポート
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Typography, Alert, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import Compressor from 'compressorjs';
import '../index.css';

// SignupFormコンポーネントを定義
function SignupForm() {
  // registerは、input要素にReact Hook Formを適用するための関数、handleSubmitはフォームの送信時に実行される関数、formStateはフォームの状態を管理するオブジェクト
  const { register, handleSubmit, formState: { errors } } = useForm();
  // ユーザーがアップロードするファイルを保持
  const [file, setFile] = useState(null);
  // ファイルアップロード時のエラーを保持
  const [error, setError] = useState(null);
  // APIリクエスト時のエラーを保持
  const [apiError, setApiError] = useState(null);
  // useNavigateフックを追加
  const navigate = useNavigate(); 

  // ユーザーが画像ファイル選択時に実行される関数で選択されたファイルを圧縮する
  const handleImageUpload = (e) => {
    // qualityオプションを0.6に設定することで、圧縮後の画像の品質を60%に設定
    new Compressor(e.target.files[0], {
      quality: 0.6,
      success(result) {
        setFile(result);
        setError(null); // 画像が選択されたらエラーメッセージをクリア
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

        // ユーザー登録が成功したら、そのユーザーに紐づくアイコンをアップロードする
        console.log(response)
        const token = response.data.token;
        const formData = new FormData();
        formData.append('icon', file);
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${token}`
          }
        };
        try {
          const uploadResponse = await axios.post('https://railway.bookreview.techtrain.dev/uploads', formData, config);
          if (uploadResponse.status === 200) {
            alert('アイコンのアップロードが完了しました。');
            navigate('/login');
          }
        } catch (uploadError) {
          console.error('アイコンのアップロードに失敗しました。:', uploadError.message);
        }
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  const usernameError = errors.username && 'ユーザー名は20文字以内としてください。';
  const emailError = errors.email && 'メールアドレスの形式が正しくありません。';
  const passwordError = errors.password && 'パスワードは6文字以上としてください。';

  return (
    <form onSubmit={handleSubmit(createUser)} className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-5 shadow-md rounded-md">
      <TextField
        type="text"
        {...register('username', { required: true, maxLength: 20 })}
        placeholder="ユーザー名"
        className="w-full p-2 my-2 border border-gray-300 rounded-md"
        error={!!usernameError}
        helperText={usernameError}
      />
      <TextField
        type="email"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        placeholder="メールアドレス"
        className="w-full p-2 my-2 border border-gray-300 rounded-md"
        error={!!emailError}
        helperText={emailError}
      />
      <TextField
        type="password"
        {...register('password', { required: true, minLength: 6 })}
        placeholder="パスワード"
        className="w-full p-2 my-2 border border-gray-300 rounded-md"
        error={!!passwordError}
        helperText={passwordError}
      />
      <Button variant="contained" color="primary" component="label" style={{ position: 'relative' }}>
        <input
          accept="image/*"
          type="file"
          onChange={handleImageUpload}
          style={{ opacity: 0, position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }} 
        />
        画像を選択
      </Button>
      {/* テキスト表示し、Material-UIのスタイリングシステムでコンポーネント上部にマージンを追加*/}
      <Typography sx={{ mt: 2 }}>
        {/* ファイル名が更新されたら、再レンダリングされ新しいファイル名を表示する */}
        {file && file.name}
      </Typography>
      
      {error && <p className="text-red-500">{error}</p>}
      {apiError && <Alert severity="error">{apiError}</Alert>}
      <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-700">新規作成</button>
      <Link to="/login" className="text-blue-500 hover:underline">既に会員登録がお済みの方はこちら</Link>
    </form>
  );
}

export default SignupForm;
