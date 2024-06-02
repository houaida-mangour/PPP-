import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  const handlePageChange = (newPage) => {
    onPageChange(newPage); 
  };

  return (
    <div>
      {page > 1 && <button style={{ backgroundColor: '#d18100' }}  onClick={() => handlePageChange(page - 1)}>Previous</button>}
      <span>{page} / {totalPages}</span>
      {page < totalPages && <button style={{ backgroundColor: '#d18100' }}  onClick={() => handlePageChange(page + 1)}>Next</button>}
    </div>
  );
};

export default Pagination;
