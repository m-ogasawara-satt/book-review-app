import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './BookReview.css';

const BookReview = () => {
  const [books, setBooks] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(0);
  const [cookies] = useCookies(['token']);
  const booksPerPage = 10;

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

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPageNumber(selected);
  };

  return (
    <div className="book-review">
      <h1 className="book-review__title">Book Review</h1>
      {books.map((book, index) => (
        <div key={index} className="book-review__item">
          <h2 className="book-review__item-title">{book.title}</h2>
          <p className="book-review__item-detail"><span className="book-review__item-label">Author:</span> {book.author}</p>
          <p className="book-review__item-detail"><span className="book-review__item-label">Review:</span> {book.review}</p>
        </div>
      ))}
      <ReactPaginate
        previousLabel={'戻る'}
        nextLabel={hasMore ? '次へ' : ''}
        breakLabel={'...'}
        pageClassName={'book-review__pagination-item'}
        pageCount={hasMore ? pageNumber + 2 : pageNumber + 1}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'book-review__pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'book-review__pagination-item--active'}
        forcePage={pageNumber}
      />
    </div>
  );
};

export default BookReview;
