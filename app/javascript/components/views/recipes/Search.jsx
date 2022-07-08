import React, { useContext } from "react";
import { SearchRecipesContext } from "../../App";
import { HeadBlock } from "../../HeadBlock";
import { RecipesFormat } from "./RecipesFormat";

const Search = () => {
  const searchRecipesInfo = useContext(SearchRecipesContext);
  const recipes = searchRecipesInfo.recipes;
  const keyword = searchRecipesInfo.keyword;
  
  return (
    <>
      <HeadBlock title={keyword}/>
      <RecipesFormat sectionTitle={`「${keyword}」の検索結果一覧`} recipes={recipes}/>
    </>
  );
};

export default Search;