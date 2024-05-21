// NewBookReview.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const NewBookReview = () => {
  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');
  const [detail, setDetail] = useState('');
  const [review, setReview] = useState('');
  const [reviewer, setReviewer] = useState('');
  const [cookies] = useCookies(['token']);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://railway.bookreview.techtrain.dev/books', {
        title,
        url,
        detail,
        review,
        reviewer
      }, {
        headers: {
          Authorization: `Bearer ${cookies.token}`
        }
      });
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
      <input type="text" value={url} onChange={e => setUrl(e.target.value)} placeholder="Url" required />
      <textarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="Detail" required />
      <textarea value={review} onChange={e => setReview(e.target.value)} placeholder="Review" required />
      <input type="text" value={reviewer} onChange={e => setReviewer(e.target.value)} placeholder="Reviewer" required />
      <button type="submit">Submit</button>
    </form>
  );
};

export default NewBookReview;