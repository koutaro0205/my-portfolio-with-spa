import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import { useRecipe } from "./useRecipe";
import { success, warn } from "../../parts/notifications";
import { handleAjaxError } from "../../parts/helpers";
import { HeadBlock } from "../../HeadBlock";
import { CurrentUserContext } from "../../App";
import { useCategories } from "../categories/useCategories";

const NewRecipe = () => {
  const currentUser = useContext(CurrentUserContext);
  const { categories } = useCategories();

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
      if (newRecipeData.status === "created"){
        const savedRecipe = newRecipeData.recipe;
        const newRecipes = [...recipes, savedRecipe];
        setRecipes(newRecipes);
        success("レシピを投稿しました！");
        navigate(`/recipes/${savedRecipe.id}`);
      } else {
        warn("レシピの投稿に失敗しました");
        navigate(`/`);
      }
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
          <RecipeForm onSave={addRecipe} recipes={recipes} categories={categories}/>
        </div>
      </section>
    </>
  );
};

export default NewRecipe;