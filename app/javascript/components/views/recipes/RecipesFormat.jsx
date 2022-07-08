import React, { useState } from 'react';
import PartialRecipes from './PartialRecipes';
import Pagination from '../../parts/Pagination';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';

export const RecipesFormat = ({recipes, sectionTitle}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const location = useLocation();
  const currentPath = location.pathname;
  const searchPath = () => {
    return currentPath === '/search' || currentPath === '/conditional_search';
  }

  return (
    <section className="section content-width">
      <h1 className="sectionTitle">{sectionTitle}</h1>
      <ul className="recipes">
        {recipes.length !== 0 ? (
          <PartialRecipes recipes={currentRecipes}/>
        ) : (
          <p className="nothing">
            {searchPath() ? "見つかりませんでした" : "現在投稿されているレシピはありません"}
          </p>
        )}
      </ul>
      {searchPath() && (
        <div className="read-more">
          <Link to={`/recipes`} className="read-more__btn btn">レシピ一覧へ</Link>
        </div>
      )}
      <Pagination
        postsPerPage={recipesPerPage}
        totalPosts={recipes.length}
        paginate={paginate}
      />
    </section>
  );
};
