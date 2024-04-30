import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const BookReview = () => {
  const [books, setBooks] = useState([]);
  const [offset, setOffset] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://railway.bookreview.techtrain.dev/books', {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          },
          params: {
            offset: offset
          }
        });
        if (response.status === 200) {
          setBooks(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [offset]);

  const handleNext = () => {
    setOffset(offset + 10);
  };

  return (
    <div>
      <h1>Book Review</h1>
      {books.map((book, index) => (
        <div key={index}>
          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p>{book.review}</p>
        </div>
      ))}
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default BookReview;