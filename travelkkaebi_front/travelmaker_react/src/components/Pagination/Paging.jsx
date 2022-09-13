//출처: https://cotak.tistory.com/112 [TaxFree:티스토리]

import React, { useState } from "react";
import './Paging.css';
import Pagination from "react-js-pagination";
import { useHref, useParams } from "react-router";
import { useNavigate } from "react-router";

const Paging = (count) => {
  // const [page, setPage] = useState(1);
  const navi = useNavigate();
  const { currentPage }=useParams();
  const handlePageChange = page => {
    // setPage(page);
    navi(`/review/${page}`)
    console.log(count);
  };

  return (
    <div>
    <Pagination
      activePage={currentPage}
      itemsCountPerPage={10}
      totalItemsCount={40}
      pageRangeDisplayed={5}
      prevPageText={"‹"}
      nextPageText={"›"}
      onChange={handlePageChange}
    />
    {/* {count} */}
    
    
    </div>
  );
};

export default Paging;
