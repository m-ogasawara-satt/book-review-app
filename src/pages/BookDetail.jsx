// BookDetail.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useRecoilState } from 'recoil';
import { tokenState } from '../recoilAtoms';
import Header from '../components/Header';

const BookDetail = () => {
  const [book, setBook] = useState(null);
  const { id } = useParams();
  const [token] = useRecoilState(tokenState);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBook(response.data);

        // ログの送信
        axios.post('https://railway.bookreview.techtrain.dev/logs', {
          selectBookId: id
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log('ログの送信に成功しました。'); 
      } catch (error) {
        console.error(error);
      }
    };
    fetchBook();
  }, [id, token]);

  if (!book) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div>
      <Header />
      <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
        <div className="p-8">
          <h2 className="text-2xl font-bold mb-4">{book.title}</h2>
          <p className="mb-2">
            <span className="text-gray-700">Url:</span> 
            <a href={book.url} className="text-blue-500" target="_blank" rel="noopener noreferrer">
              {book.url}
            </a>
          </p>
          <p className="mb-2"><span className="text-gray-700">Detail:</span> {book.detail}</p>
          <p className="mb-2"><span className="text-gray-700">Review:</span> {book.review}</p>
          <p className="mb-2"><span className="text-gray-700">Reviewer:</span> {book.reviewer}</p>
          {book.isMine && <Link to={`/edit/${book.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded">レビュー編集</Link>}
        </div>
      </div>
    </div>
  );
};


export default BookDetail;
