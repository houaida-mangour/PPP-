import React from 'react';

const Pagination = ({ page, totalPages, urlParamName = 'page' }) => {
  const handlePageChange = (newPage) => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(urlParamName, newPage);
    window.history.pushState(null, '', `?${searchParams.toString()}`);
    window.dispatchEvent(new Event('popstate'));
  };

  return (
    <div >
      {page > 1 && <button onClick={() => handlePageChange(page - 1)}>Previous</button>}
      <span>{page} / {totalPages}</span>
      {page < totalPages && <button onClick={() => handlePageChange(page + 1)}>Next</button>}
    </div>
  );
};

export default Pagination;
