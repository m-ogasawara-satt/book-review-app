// 必要なモジュールとコンポーネントをインポート
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRecoilState } from 'recoil';
import { tokenState } from '../recoilAtoms';


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
  // registerは、input要素にReact Hook Formを適用するための関数、handleSubmitはフォームの送信時に実行される関数、formStateはフォームの状態を管理するオブジェクト
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [apiError, setApiError] = useState(null);
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('https://railway.bookreview.techtrain.dev/signin', data);
      // レスポンスのステータスコードが200である場合、cookieにトークンを保存し、/booksページに遷移
      if (response.status === 200) {
        setToken(response.data.token);
        navigate('/');
      }
    } catch (error) {
      // エラーが発生した場合、apiErrorのstateを更新
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
