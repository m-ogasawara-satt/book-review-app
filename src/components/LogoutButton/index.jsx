import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoilAtoms';

function LogoutButton() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenState);

  const handleLogout = () => {
    setToken(null);
    navigate('/login');
  };

  return (
    <button 
      onClick={handleLogout} 
      className="bg-red-500 text-white px-4 py-2 rounded"
    >
      ログアウト
    </button>
  );
}

export default LogoutButton;
