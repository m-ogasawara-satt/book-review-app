import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState } from '../recoilAtoms';

const EditBookReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState({
    title: '',
    url: '',
    detail: '',
    review: ''
  });
  const [token] = useRecoilState(tokenState);

  // axiosのURLやトークンをインターセプターでリクエストを送ったり受け取った際に共通処理をできる
  // カスタムフック使用してAPIリクエストの部分を共通化してあげるとより良い
  // コンポーネントは基本的にUIに関連するものが良い
  useEffect(() => {
    axios.get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        setBook(response.data);
      })
      .catch(err => console.log(err));
  }, [id, token]);

  const handleChange = e => {
    setBook({ ...book, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`https://railway.bookreview.techtrain.dev/books/${id}`, book, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  const handleDelete = () => {
    axios.delete(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        navigate('/');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <label className="block">
          <span className="text-gray-700">タイトル:</span>
          <input type="text" name="title" value={book.title} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" />
        </label>
        <label className="block">
          <span className="text-gray-700">URL:</span>
          <input type="text" name="url" value={book.url} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" />
        </label>
        <label className="block">
          <span className="text-gray-700">詳細:</span>
          <textarea name="detail" value={book.detail} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" />
        </label>
        <label className="block">
          <span className="text-gray-700">レビュー内容:</span>
          <textarea name="review" value={book.review} onChange={handleChange} className="mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0" />
        </label>
        <div className="flex justify-between">
          <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">アップデート</button>
          <button onClick={handleDelete} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">削除</button>
        </div>
      </form>
    </div>
  );
};

export default EditBookReview;
