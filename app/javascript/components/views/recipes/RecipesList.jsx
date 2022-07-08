import React from "react";
import { useRecipe } from "./useRecipe";
import { HeadBlock } from "../../HeadBlock";
import { RecipesFormat } from "./RecipesFormat";

const RecipesList = () => {
  const { recipes } = useRecipe();

  return (
    <>
      <HeadBlock title={"レシピ一覧"}/>
      <RecipesFormat sectionTitle={"みんなのレシピ一覧"} recipes={recipes}/>
    </>
  );
};

export default RecipesList;