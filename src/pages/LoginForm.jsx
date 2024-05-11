import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useCookies } from 'react-cookie';

// Input component
function Input({ register, errors, type, placeholder, name, validation }) {
  return (
    <div className="input-field">
      <input
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
        className="input"
      />
      {errors[name] && <div className="error">{errors[name].message}</div>}
    </div>
  );
}

// Button component
function Button({ children, type }) {
  return (
    <button type={type} className="btn">{children}</button>
  );
}

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
    <form onSubmit={handleSubmit(onSubmit)} className="form">
      {apiError && <div className="error">{apiError}</div>}
      <Input
        register={register}
        errors={errors}
        type="email"
        placeholder="メールアドレス"
        name="email"
        validation={{ required: true, pattern: /^\S+@\S+$/i }}
      />
      <Input
        register={register}
        errors={errors}
        type="password"
        placeholder="パスワード"
        name="password"
        validation={{ required: true, minLength: 6 }}
      />
      <Button type="submit">ログイン</Button>
      <Link to="/signup" className="link">新規会員登録はこちら</Link>
    </form>
  );
}

export default LoginForm;