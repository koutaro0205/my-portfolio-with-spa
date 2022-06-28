import React, { useContext } from "react";
import { SearchRecipesContext } from "../../App";
import { Link } from "react-router-dom";
import { HeadBlock } from "../../HeadBlock";
import PartialRecipes from "./PartialRecipes";

const Search = () => {
  const searchRecipesInfo = useContext(SearchRecipesContext);
  const recipes = searchRecipesInfo.recipes;
  const keyword = searchRecipesInfo.keyword;
  
  return (
    <>
      <HeadBlock title={keyword}/>
      <section className="section content-width">
        <h1 className="sectionTitle">「{keyword}」の検索結果一覧</h1>
        <ul className="recipes">
        {recipes.length === 0 ? (
          <p className="nothing">見つかりませんでした</p>
        ) : (
          <PartialRecipes recipes={recipes}/>
        )}
        </ul>
        <div className="read-more">
          <Link to={`/recipes`} className="read-more__btn btn">レシピ一覧へ</Link>
        </div>
      </section>

    </>
  );
};

export default Search;