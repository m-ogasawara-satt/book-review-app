import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({ totalItems, itemsPerPage, handlePageClick, pageNumber }) => {
  const pageCount = Math.ceil(totalItems / itemsPerPage);

  return (
    pageCount > 0 && (
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
    )
  );
};

export default Pagination;