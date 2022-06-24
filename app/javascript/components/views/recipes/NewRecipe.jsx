import React from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import { useRecipe } from "./useRecipe";
import { success } from "../../parts/notifications";
import { handleAjaxError } from "../../parts/helpers";
import Auth from "../../providers/Auth";
import { HeadBlock } from "../../HeadBlock";

const NewRecipe = () => {
  Auth();

  const { recipes, setRecipes } = useRecipe();
  const navigate = useNavigate();

  const addRecipe = async (newRecipe) => {
    try {
      const response = await window.fetch('/api/recipes', {
        method: 'POST',
        body: JSON.stringify(newRecipe),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const newRecipeData = await response.json();
      console.log(newRecipeData);
      const savedRecipe = newRecipeData.recipe;
      const newRecipes = [...recipes, savedRecipe];
      setRecipes(newRecipes);
      success("レシピを投稿しました！");
      navigate(`/recipes/${savedRecipe.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <HeadBlock title={"レシピ投稿"}/>
      <section className="section content-width">
        <div className="form__inner-newPage">
          <h1 className="sectionTitle">レシピを投稿する</h1>
          <RecipeForm onSave={addRecipe} recipes={recipes}/>
        </div>
      </section>
    </>
  );
};

export default NewRecipe;