import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState(null);
  const [cookies, setCookie] = useCookies(['token']);
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://railway.bookreview.techtrain.dev/signin', data);
      if (response.status === 200) {
        setCookie('token', response.data.token, { path: '/' });
        navigate('/books');
      }
    } catch (error) {
      setApiError(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-5 shadow-md rounded-md">
      {apiError && <div className="text-red-500 mb-3">{apiError}</div>}
      <input
        {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
        type="email"
        placeholder="メールアドレス"
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
      />
      {errors.email && <div className="text-red-500 mb-3">メールアドレスの形式が正しくありません。</div>}
      <input
        {...register("password", { required: true, minLength: 6 })}
        type="password"
        placeholder="パスワード"
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-md"
      />
      {errors.password && <div className="text-red-500 mb-3">パスワードは6文字以上としてください。</div>}
      <button type="submit" className="px-5 py-2 bg-blue-500 text-white rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-700">ログイン</button>
      <Link to="/signup" className="text-blue-500 hover:underline">新規会員登録はこちら</Link>
    </form>
  );
}

export default LoginForm;