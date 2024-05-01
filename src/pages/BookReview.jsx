// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useCookies } from 'react-cookie';
// import './BookReview.css';
// import ReactPaginate from 'react-paginate';

// const BookReview = () => {
//   const [books, setBooks] = useState([]);
//   const [offset, setOffset] = useState(0);
//   const [pageCount, setPageCount] = useState(0);
//   const [cookies, setCookie, removeCookie] = useCookies(['token']);

//   useEffect(() => {
//     console.log(books);
//     const fetchBooks = async () => {
//       try {
//         const response = await axios.get('https://railway.bookreview.techtrain.dev/books', {
//           headers: {
//             Authorization: `Bearer ${cookies.token}`
//           },
//           params: {
//             offset: offset
//           }
//         });
//         console.log(response.data); 
//         if (response.status === 200) {
//           setBooks(response.data);
//           setPageCount(Math.ceil(response.data.length / 10));
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchBooks();
//   }, [offset]);

//   const handleNext = () => {
//     setOffset(offset + 10);
//   };

//   const handleBack = () => {
//     if (offset >= 10) {
//       setOffset(offset - 10);
//     }
//   };

//   return (
//     <div className="book-review">
//       <h1 className="book-review__title">Book Review</h1>
//       {books.map((book, index) => (
//         <div key={index} className="book-review__item">
//           <h2 className="book-review__item-title">{book.title}</h2>
//           <p className="book-review__item-detail"><span className="book-review__item-label">Author:</span> {book.author}</p>
//           <p className="book-review__item-detail"><span className="book-review__item-label">Review:</span> {book.review}</p>
//         </div>
//       ))}
//       <div className="book-review__controls">
//         <button onClick={handleBack} className="book-review__control book-review__control--back">Back</button>
//         <button onClick={handleNext} className="book-review__control book-review__control--next">Next</button>
//       </div>
//     </div>
//   );
// };

// export default BookReview;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import './BookReview.css';
import ReactPaginate from 'react-paginate';

const BookReview = () => {
  const [books, setBooks] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [cookies, setCookie, removeCookie] = useCookies(['token']);
  const booksPerPage = 10;

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('https://railway.bookreview.techtrain.dev/books', {
          headers: {
            Authorization: `Bearer ${cookies.token}`
          }
        });
        if (response.status === 200) {
          setBooks(response.data);
          setPageCount(Math.ceil(response.data.length / booksPerPage));
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, []);

  const handlePageClick = (data) => {
    let selected = data.selected;
    setPageNumber(selected);
  };

  const booksDisplayed = books.slice(pageNumber * booksPerPage, (pageNumber + 1) * booksPerPage);

  return (
    <div className="book-review">
      <h1 className="book-review__title">Book Review</h1>
      {booksDisplayed.map((book, index) => (
        <div key={index} className="book-review__item">
          <h2 className="book-review__item-title">{book.title}</h2>
          <p className="book-review__item-detail"><span className="book-review__item-label">Author:</span> {book.author}</p>
          <p className="book-review__item-detail"><span className="book-review__item-label">Review:</span> {book.review}</p>
        </div>
      ))}
      {pageCount > 0 && (
        <ReactPaginate
          previousLabel={'Back'}
          nextLabel={'Next'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          pageCount={pageCount}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
          forcePage={pageNumber}
        />
      )}
    </div>
  );
};

export default BookReview;
