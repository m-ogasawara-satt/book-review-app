import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './BookReview.css';
import Pagination from '../components/Pagination';

const BookReview = () => {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [cookies] = useCookies(['token']);
  const booksPerPage = 10;

  // pageNumberまたはcookies.tokenが変更されるたびに、fetchBooks関数を実行
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const offset = pageNumber * booksPerPage;
        const response = await axios.get(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        });
        setBooks(response.data);
        setHasMore(response.data.length === booksPerPage);
        console.log(response.data)
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [pageNumber, cookies.token]);

  // ページを切り替える際に実行
  const handlePageClick = (data) => {
    const selected = data.selected;
    setPageNumber(selected);
  };
  return (
    <div className="book-review">
      <h1 className="book-review__title">Book Review</h1>
      {books.map((book) => (
        <div key={book.id} className="book-review__item">
          <h2 className="book-review__item-title">{book.title}</h2>
          <p className="book-review__item-detail"><span className="book-review__item-label">Url:</span> <a href={book.url}>{book.url}</a></p>
          <p className="book-review__item-detail"><span className="book-review__item-label">Detail:</span> {book.detail}</p>
          <p className="book-review__item-detail"><span className="book-review__item-label">Review:</span> {book.review}</p>
          <p className="book-review__item-detail"><span className="book-review__item-label">Reviewer:</span> {book.reviewer}</p>
        </div>
      ))}
      <Pagination hasMore={hasMore} pageNumber={pageNumber} handlePageClick={handlePageClick} />
    </div>
  );
};

export default BookReview;
