import React, { useEffect, useState } from 'react'
import "./Pagination.css";

const Pagination = ({page,setPage,totalNumberOfPages,maxItemsInPage }) =>{
  const pageLimit = 5;
  const [begin, setBegin ] = useState(1);
  const [end, setEnd] = useState(Math.min(pageLimit, totalNumberOfPages));
  const getPaginationButtons = (begin,end) => {
    
   return Array.from({ length: (end - begin) / 1+ 1 }, (_, i) => begin + (i * 1));
  };
  const [pageNum, setPageNum] = useState(getPaginationButtons(begin, end, 1));
  const checkRange = () => {
    
       setPageNum(getPaginationButtons(begin,totalNumberOfPages));
  
    }
    
  const toFirst =()=>{
     setPage(1);
  }
  const previous = ()=>{
   setPage((page)=> Math.max(page-1,1));
  }
  const changePage =(page)=>{
    const pageNumber = Math.max(1, page);
    setPage( Math.min(pageNumber, totalNumberOfPages));
  }
  const tolast = () => setPage(totalNumberOfPages);
  const next = () => setPage(Math.min(page + 1, totalNumberOfPages));
  useEffect(()=>{
    checkRange();
  },[totalNumberOfPages,page])
  return(
    <>
    
    <ul className="pagination-block">
    <li className={`page-no${page===1?" not-active":""}`} onClick={toFirst}>
        <div className="pagination-content">
          &lt;&lt;
        </div>
      </li>
      <li className={`page-no${page===1?" not-active":""}`} onClick={previous}>
        <div className="pagination-content">
        &lt;
        </div>
      </li>
      {pageNum.map((item, index) => (
        <button
          key={index}
          onClick={() => changePage(item)}
          className={`page-no${page === item ? ' active' : ""}`}
        >
          <span className="pagination-content">{item}</span>
        </button>
      ))}
      <li className={`page-no${page===totalNumberOfPages?" not-active":""}`} onClick={next}>
        <div className="pagination-content">
          &gt;
        </div>
      </li>
      <li className={`page-no${page===totalNumberOfPages?" not-active":""}`} onClick={tolast}>
        <div className="pagination-content">
          &gt;&gt;
        </div>
      </li>
    </ul>
    
   
    </>
  );

};

export default Pagination;