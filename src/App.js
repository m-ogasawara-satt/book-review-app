// 必要なモジュールをインポート
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import LoginForm from './pages/LoginForm';
import SignupForm from './pages/SignupForm';
import BookReview from './pages/BookReview';
import LogoutButton from './components/LogoutButton';

function App() {
  // ログイン状態を管理するためのステートを定義
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  // トークンを管理するためのステートを定義
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  // 現在のURLを取得
  const location = useLocation();
  // ページ遷移のための関数を取得
  const navigate = useNavigate();

  // トークンが存在する場合はユーザー情報を取得し、ログイン状態を更新
  useEffect(() => {
    const token = cookies['token'];
    if (token) {
      setIsLoggedIn(true);
      localStorage.setItem('isLoggedIn', 'true');
      axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } else {
      console.log('トークン情報がありません');
    }
  }, [cookies]);


  // ログイン状態が変更されたとき、またはURLが変更されたときに、ログインページまたはサインアップページにいる場合はホームページにリダイレクト
  useEffect(() => {
    const token = cookies['token'];
    if (token && (location.pathname === '/login' || location.pathname === '/signup')) {
      navigate('/');
    }
  }, [cookies, location, navigate]);

  // ヘッダーとルーティングを設定し、ログイン状態に応じてログアウトボタンを表示
  return (
    <>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<BookReview />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      {/* {cookies['token'] && <LogoutButton setUsername={setUsername} removeCookie={removeCookie} />} トークンが存在する場合にログアウトボタンを表示 */}
      {cookies['token'] && <LogoutButton removeCookie={removeCookie} />} {/* トークンが存在する場合にログアウトボタンを表示 */}
    </>
  );
}

export default App;
