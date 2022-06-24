import { useState, useEffect } from 'react';
import { handleAjaxError } from '../../parts/helpers';

export const useRecipe = () => {
  const [recipes, setRecipes] = useState([]);
  // const [recipeImg, setRecipeImg] = useState();
  // const [ exsistedEmail, setEmail ] = useState('');

  useEffect(() => {
    const getAllRecipes = async () => {
      try {
        const response = await window.fetch('/api/recipes');
        if (!response.ok) throw Error(response.statusText);
        const recipesData = await response.json();
        setRecipes(recipesData);
      } catch (error) {
        handleAjaxError(error);
      }
    };
    getAllRecipes();

  }, []);

  return {
    recipes,
    setRecipes,
  };
};