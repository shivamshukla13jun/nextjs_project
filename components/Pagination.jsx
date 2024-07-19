import React from "react";

const Pagination = ({ pageNumber,setPageNumber, numberOfPages, gotoPrevious, gotoNext }) => {
  const pages = new Array(numberOfPages).fill(null).map((v, i) => i);

  return (
    <div>
      <button className="prebtn" onClick={gotoPrevious}>
        Previous
      </button>
      {pages.map((pageIndex) => (
        <button
          className={pageNumber === pageIndex ? "active" : "allpages"}
          key={pageIndex}
          onClick={() => setPageNumber(pageIndex)}
        >
          {pageIndex + 1}
        </button>
      ))}
      <button className="nextbtn" onClick={gotoNext}>
        Next
      </button>
    </div>
  );
};

export default Pagination;
