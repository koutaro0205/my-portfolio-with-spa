import React, { useEffect, useState } from 'react';
import { HeadBlock } from '../../HeadBlock';
import { handleAjaxError } from '../../parts/helpers';
import { RecipesFormat } from './RecipesFormat';

const FollowingRecipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await window.fetch('/api/recipes/following_recipes');
        if (!response.ok) throw Error(response.statusText);
        const recipesData = await response.json();
        setRecipes(recipesData.following_recipes);
      } catch (error) {
        handleAjaxError(error);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <HeadBlock title={"フォローしているユーザーのレシピ一覧"}/>
      <RecipesFormat sectionTitle={"フォローしているユーザーのレシピ一覧"} recipes={recipes}/>
    </>
  )
}

export default FollowingRecipes;
