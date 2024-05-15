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
      {books.map((book, index) => (
        <div key={index} className="book-review__item">
          <h2 className="book-review__item-title">{book.title}</h2>
          <p className="book-review__item-detail"><span className="book-review__item-label">Author:</span> {book.author}</p>
          <p className="book-review__item-detail"><span className="book-review__item-label">Review:</span> {book.review}</p>
        </div>
      ))}
      <ReactPaginate
        // 前のページリンクを設定
        previousLabel={'戻る'}
        // 次へのページリンクを設定。hasMoreがfalseの場合は表示されない
        nextLabel={hasMore ? '次へ' : ''}
        // ページ間の区切りを設定
        breakLabel={'...'}
        // ページネーションの各アイテムに適用されるクラス名を設定
        pageClassName={'book-review__pagination-item'}
        // ページの総数を設定。hasMoreがtrueの場合は、現在のページ番号+2を、falseの場合は現在のページ番号+1を設定
        pageCount={hasMore ? pageNumber + 2 : pageNumber + 1}
        // ページネーションの両端に表示されるページ数を設定
        marginPagesDisplayed={2}
        // ページネーションの中央に表示されるページ数を設定
        pageRangeDisplayed={5}
        // ページがクリックされたときに実行される関数を設定
        onPageChange={handlePageClick}
        // ページネーションのコンテナに適用されるクラス名を設定
        containerClassName={'book-review__pagination'}
        // ページネーションのサブコンテナに適用されるクラス名を設定
        subContainerClassName={'pages pagination'}
        // アクティブなページに適用されるクラス名を設定
        activeClassName={'book-review__pagination-item--active'}
        // 現在のページ番号を設定
        forcePage={pageNumber}
      />
    </div>
  );
};

export default BookReview;
