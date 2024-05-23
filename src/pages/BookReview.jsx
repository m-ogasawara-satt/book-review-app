import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BookReview.css';
import Header from '../components/Header/index';
import Pagination from '../components/Pagination/index';
import { useRecoilValue } from 'recoil';
import { tokenState } from '../recoilAtoms';

const BookReview = () => {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const token = useRecoilValue(tokenState);
  const booksPerPage = 10;

  // pageNumberまたはcookies.tokenが変更されるたびに、fetchBooks関数を実行
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const offset = pageNumber * booksPerPage;
        const response = await axios.get(`https://railway.bookreview.techtrain.dev/books?offset=${offset}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setBooks(response.data);
        setHasMore(response.data.length === booksPerPage);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [pageNumber, token]);

  // ページを切り替える際に実行
  const handlePageClick = (data) => {
    const selected = data.selected;
    setPageNumber(selected);
  };
  return (
    <div>
      <Header />
      <div className="book-review">
        {books.map((book) => (
          <Link to={`/detail/${book.id}`} key={book.id}>
            <div className="book-review__item">
              <h2 className="book-review__item-title">{book.title}</h2>
              <p className="book-review__item-detail"><span className="book-review__item-label">Url:</span> {book.url}</p>
              <p className="book-review__item-detail"><span className="book-review__item-label">Detail:</span> {book.detail}</p>
              <p className="book-review__item-detail"><span className="book-review__item-label">Review:</span> {book.review}</p>
              <p className="book-review__item-detail"><span className="book-review__item-label">Reviewer:</span> {book.reviewer}</p>
            </div>
          </Link>
        ))}
        <Pagination hasMore={hasMore} pageNumber={pageNumber} handlePageClick={handlePageClick} />
      </div>
    </div>
  );
};

export default BookReview;
