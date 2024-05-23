import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LogoutButton from '../LogoutButton/index';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../../recoilAtoms';

function Header() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const token = useRecoilValue(tokenState);

  useEffect(() => {
    if (token) {
      axios.get('https://railway.bookreview.techtrain.dev/users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsername(response.data.name);
      })
      .catch((error) => {
        console.error('Error:', error);
        setUsername('');
      });
    } else {
      setUsername('');
    }
  }, [token]);

  // ログイン判定はtokenの有無で行う
  // ユーザー名や認証tokenはグローバルステートに保存する
  return (
    <header className="p-4 bg-blue-500 text-white flex justify-between items-center mb-4">
      <Link to="/" className="text-lg font-bold">Book Review</Link>
      {username ? (
        <div className="flex items-center">
          <span className="mr-2">ユーザー名:</span>
          <span className="font-medium mr-4">{username}</span>
          <Link to="/profile" className="mr-4">プロフィール編集</Link>
          <Link to="/new" className="mr-4">新規レビュー作成</Link>
          <LogoutButton />
        </div>
      ) : (
        <button 
          onClick={() => navigate('/login')} 
          className="bg-white text-blue-500 px-4 py-2 rounded"
        >
          Login
        </button>
      )}
    </header>
  );
}

export default Header;
