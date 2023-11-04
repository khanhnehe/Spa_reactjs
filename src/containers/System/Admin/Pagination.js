import React from 'react';
import ReactPaginate from 'react-paginate';

function Pagination({ pageCount, onPageChange }) {
    return (
        <div className="pagination-container">
            <ReactPaginate
                pageCount={pageCount}
                pageRangeDisplayed={5}
                marginPagesDisplayed={1}
                onPageChange={onPageChange}
                previousLabel={'<'}
                nextLabel={'>'}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
            />
        </div>
    );
}

export default Pagination;
