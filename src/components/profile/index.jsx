import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Profile() {
  const [username, setUsername] = useState('');
  const [updateUsername, setUpdateUsername] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  useEffect(() => {
    const token = cookies['token'];
    axios.get('https://railway.bookreview.techtrain.dev/users', 
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      setUsername(response.data.name);
      setUpdateUsername(response.data.name)
      setIconUrl(response.data.iconUrl);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  }, [cookies]);

  const handleUpdate = () => {
    if (username === updateUsername) {
      toast.info('ユーザー名が変更されていません。', {
        style: {
          fontSize: "12px",
        },
      });
      return;
    }
    const token = cookies['token'];
    axios.put('https://railway.bookreview.techtrain.dev/users', 
      { name: username },
      { headers: { Authorization: `Bearer ${token}` } }
    )
    .then((response) => {
      console.log(response);
      toast.success('アップデート完了。レビュー一覧画面へ遷移します。', {
        style: {
          fontSize: "12px",
        },
        autoClose: 5000,
        onClose: () => navigate('/')
      });
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('プロフィールのアップデートに失敗しました。');
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">プロフィール編集</h1>
      {iconUrl && <img className="w-24 h-24 rounded-full mb-4" src={iconUrl} alt="User icon" />}
      <input 
        className="mb-4 px-3 py-2 border border-gray-300 rounded"
        type="text" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={handleUpdate}
      >
        アップデート
      </button>
    </div>
  );
}

export default Profile;