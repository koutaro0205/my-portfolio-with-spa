import { useState } from 'react';

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;

  return {
    currentPage,
    setCurrentPage,
    recipesPerPage,
    indexOfLastRecipe,
    indexOfFirstRecipe,
  };
};