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
    
    <ul className="page-block">
    <li className={`pages-no${page===1?" not-active":""}`} onClick={toFirst}>
        <div className="paginationcontent">
          &lt;&lt;
        </div>
      </li>
      <li className={`pages-no${page===1?" not-active":""}`} onClick={previous}>
        <div className="paginationcontent">
        &lt;
        </div>
      </li>
      {pageNum.map((item, index) => (
        <button
          key={index}
          onClick={() => changePage(item)}
          className={`pages-no${page === item ? ' active' : ""}`}
        >
          <span className="paginationcontent">{item}</span>
        </button>
      ))}
      <li className={`pages-no${page===totalNumberOfPages?" not-active":""}`} onClick={next}>
        <div className="paginationcontentt">
          &gt;
        </div>
      </li>
      <li className={`pages-no${page===totalNumberOfPages?" not-active":""}`} onClick={tolast}>
        <div className="paginationcontent">
          &gt;&gt;
        </div>
      </li>
    </ul>
    
   
    </>
  );

};

export default Pagination;