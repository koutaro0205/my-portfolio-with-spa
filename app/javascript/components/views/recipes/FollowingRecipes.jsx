import React, { useEffect, useState } from 'react';
import { HeadBlock } from '../../HeadBlock';
import { handleAjaxError, loadingImage } from '../../parts/helpers';
import { RecipesFormat } from './RecipesFormat';

const FollowingRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await window.fetch('/api/recipes/following_recipes');
        if (!response.ok) throw Error(response.statusText);
        const recipesData = await response.json();
        setIsLoading(false);
        setRecipes(recipesData.following_recipes);
      } catch (error) {
        handleAjaxError(error);
        setIsLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  return (
    <>
      <HeadBlock title={"フォローしているユーザーのレシピ一覧"}/>
      {isLoading ? (
        <div className="loading-image">
          <img src={loadingImage()} alt="" />
        </div>
      ) : (
        <RecipesFormat sectionTitle={"フォローしているユーザーのレシピ一覧"} recipes={recipes}/>
      )}
    </>
  )
}

export default FollowingRecipes;
