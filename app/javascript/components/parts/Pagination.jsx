import React, { useState } from 'react'

const Pagination = ({recipesPerPage, totalRecipes, paginate}) => {
  const [currentNumber, setCurrentNumber] = useState(1);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalRecipes / recipesPerPage); i++) {
    pageNumbers.push(i);
  }

  const handleClick = (num) => {
    paginate(num);
    setCurrentNumber(num);
  }

  return (
    <>
      {(() => {
        if (totalRecipes <= recipesPerPage) {
          return (
            <></>
          );
        } else {
          return (
            <ul className='pagination'>
              {pageNumbers.map(number => (
                <li key={number} className='page-item'>
                  <span
                    onClick={() => handleClick(number)}
                    className={number === currentNumber ? 'page-link current' : 'page-link'}
                  >
                    {number}
                  </span>
                </li>
              ))}
            </ul>
          );
        }
      })()}
    </>
  );
};

export default Pagination;
