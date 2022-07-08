import React, { useEffect, useState } from "react";
import { HeadBlock } from "../../HeadBlock";
import { useParams, useNavigate } from "react-router-dom";
import { handleAjaxError } from "../../parts/helpers";
import { RecipesFormat } from "../recipes/RecipesFormat";
import { warn } from "../../parts/notifications";

const FavoriteList = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFaviriteRecipes = async () => {
      try {
        const response = await window.fetch(`/api/users/${id}/favorite_recipes`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        if (data.status === 'forbidden'){
          warn(data.message);
          navigate(`/`);
        } else {
          setTitle(data.title);
          setRecipes(data.favorite_recipes);
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };
    fetchFaviriteRecipes();

  }, []);

  return (
    <>
      <HeadBlock title={title}/>
      <RecipesFormat sectionTitle={title} recipes={recipes}/>
    </>
  );
};

export default FavoriteList;