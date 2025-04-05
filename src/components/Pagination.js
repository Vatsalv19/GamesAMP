// components/Pagination.js
import React from 'react';
import { Pagination as BsPagination } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { setPage } from '../redux/slices/gamesSlice';
import '../styles/Pagination.css';

const Pagination = ({ currentPage, totalItems, itemsPerPage }) => {
  const dispatch = useDispatch();
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    dispatch(setPage(page));
    window.scrollTo(0, 0);
  };

  // Display maximum 5 page buttons
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = startPage + maxPagesToShow - 1;
    
    if (endPage > totalPages) {
      endPage = totalPages;
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination-container">
      <BsPagination>
        <BsPagination.First
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
        />
        <BsPagination.Prev
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        
        {getPageNumbers().map(page => (
          <BsPagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
          >
            {page}
          </BsPagination.Item>
        ))}
        
        <BsPagination.Next
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <BsPagination.Last
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </BsPagination>
    </div>
  );
};

export default Pagination;