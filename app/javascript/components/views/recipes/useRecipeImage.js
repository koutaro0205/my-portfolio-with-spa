import React, {useEffect, useState} from "react";
import { handleAjaxError } from "../../parts/helpers";

export const useRecipeImage = () => {
  const [image, setImage] = useState([]);
  // const [recipeImg, setRecipeImg] = useState();
  // const [ exsistedEmail, setEmail ] = useState('');
    const checkRecipeImage = async (id) => {
      try {
        const response = await window.fetch(`/api/image_attached/${id}`);
        if (!response.ok) throw Error(response.statusText);
        const recipeData = await response.json();
        const recipeImage = recipeData.image;
        console.log(recipeImage);
        setImage(recipeImage)
      } catch (error) {
        handleAjaxError(error);
      }
    };

  return {
    image,
    setImage,
    checkRecipeImage,
  };
};