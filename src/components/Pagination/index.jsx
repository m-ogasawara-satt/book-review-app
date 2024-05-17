import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ hasMore, pageNumber, handlePageClick }) => {
  return (
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
  );
};

export default Pagination;