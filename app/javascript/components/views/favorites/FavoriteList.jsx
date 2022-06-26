import React, {useEffect, useState} from "react";
import { HeadBlock } from "../../HeadBlock";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { handleAjaxError } from "../../parts/helpers";
import PartialRecipes from "../recipes/PartialRecipes";

const FavoriteList = () => {
  const { id } = useParams();
  const [recipes, setRecipes] = useState([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const fetchFaviriteRecipes = async () => {
      try {
        const response = await window.fetch(`/api/users/${id}/favorite_recipes`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setTitle(data.title);
        setRecipes(data.favorite_recipes);
      } catch (error) {
        handleAjaxError(error);
      }
    };
    fetchFaviriteRecipes();

  }, []);

  return (
    <>
      <HeadBlock title={title}/>
      <section className="section content-width">
        <h1 className="sectionTitle">{title}</h1>
        <ul className="recipes">
          {recipes.length !== 0 ? (
            <PartialRecipes recipes={recipes}/>
          ) : (
            <p className="nothing">お気に入りの投稿はありません。</p>
          )}
        </ul>
      </section>
    </>
  );
};

export default FavoriteList;