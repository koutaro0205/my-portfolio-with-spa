import React, { useState } from "react";
import { useRecipe } from "./useRecipe";
import { HeadBlock } from "../../HeadBlock";
import PartialRecipes from "./PartialRecipes";
import Pagination from "../../parts/Pagination";

const RecipesList = () => {
  const { recipes } = useRecipe();
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <HeadBlock title={"レシピ一覧"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">みんなのレシピ一覧</h1>
        <ul className="recipes">
          {recipes.length === 0 ? (
            <p className="nothing">現在投稿されているレシピはありません</p>
          ) : (
            <PartialRecipes recipes={currentRecipes}/>
          )}
        </ul>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
      </section>
    </>
  );
};

export default RecipesList;