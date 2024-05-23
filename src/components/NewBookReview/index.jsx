import React, { useState } from 'react';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState } from '../../recoilAtoms';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/index';

const NewBookReview = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const [token] = useRecoilState(tokenState);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    // デフォルト動作をキャンセル
    e.preventDefault();
    try {
      await axios.post('https://railway.bookreview.techtrain.dev/books', {
        title,
        url,
        detail,
        review
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="space-y-4" style={{ width: '70%', margin: '0 auto' }}>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="タイトル" required className="w-full px-3 py-2 border border-gray-300 rounded" />
        <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="URL" required className="w-full px-3 py-2 border border-gray-300 rounded" />
        <textarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="詳細" required className="w-full px-3 py-2 border border-gray-300 rounded h-20" />
        <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="レビュー内容" required className="w-full px-3 py-2 border border-gray-300 rounded h-20" />
        <button type="submit" className="w-full px-3 py-2 bg-blue-500 text-white rounded">作成</button>
      </form>
    </div>
  );
};

export default NewBookReview;
