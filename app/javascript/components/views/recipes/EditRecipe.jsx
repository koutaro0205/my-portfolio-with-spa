import React, { useEffect, useState } from 'react';
import { useRecipe } from './useRecipe';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeForm from './RecipeForm';
import { success, warn } from "../../parts/notifications";
import { handleAjaxError } from "../../parts/helpers";
import { HeadBlock } from '../../HeadBlock';

const EditRecipe = () => {
  const {recipes, setRecipes} = useRecipe();
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({});

  useEffect(() => {
    const getRecipe = async (recipeId) => {
      try {
        const response = await window.fetch(
          `/api/recipes/${recipeId}/edit`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        if (data.status === 'forbidden'){
          warn(data.message);
          navigate(`/`);
        } else {
          setRecipe(data);
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };

    getRecipe(id);
  }, []);

  const updateRecipe = async (updatedRecipe) => {
    try {
      const response = await window.fetch(
        `/api/recipes/${updatedRecipe.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedRecipe),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const updatedRecipeInfo = await response.json();

      if (updatedRecipeInfo.status === 'ok'){
        const newRecipes = recipes;
        const idx = newRecipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
        newRecipes[idx] = updatedRecipe;
        setRecipes(newRecipes);
        success(updatedRecipeInfo.message);
        navigate(`/recipes/${updatedRecipe.id}`);
      } else {
        warn(updatedRecipeInfo.errors);
        navigate(`/`);
      };
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <HeadBlock title={"レシピ編集"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">現在公開されているレシピ情報</h1>
        <h2 className="recipe__title">{recipe.title}</h2>
        <div className="recipe">
          <div className="recipe__image">
            <img src={recipe.image_url ? recipe.image_url : "/assets/sampleRecipe.jpeg"} alt="" />
          </div>
          <div className="recipe__info">
            <div className="recipe__ingredient">
              <h2 className="recipe__info-head">材料</h2>
                {recipe.ingredient}
            </div>
            <div className="recipe__body">
              <h2 className="recipe__info-head">作り方・説明</h2>
                {recipe.body}
            </div>
          </div>
        </div>
      </section>
      <section className="section content-width">
        <div className="form__inner form__inner-editPage">
          <h1 className="sectionTitle">レシピ内容の編集</h1>
          <RecipeForm onSave={updateRecipe} recipes={recipes}/>
        </div>
      </section>
    </>
  );

};

export default EditRecipe;