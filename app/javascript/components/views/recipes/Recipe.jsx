import React, { useState, useEffect, useContext } from "react";
import { CurrentUserContext } from "../../App";
import { useParams, Link, useNavigate } from "react-router-dom";
import { handleAjaxError } from "../../parts/helpers";
import { HeadBlock } from "../../HeadBlock";
import { success, warn } from "../../parts/notifications";
import FavoriteForm from "../favorites/FavoriteForm";

const Recipe = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({});
  const [user, setUser] = useState({});
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getRecipe = async () => {
			try {
				const response = await window.fetch(`/api/recipes/${id}`);
				if (!response.ok) throw Error(response.statusText);
				const recipeData = await response.json();
        setRecipe(recipeData);
        setUser(recipeData.user);
			} catch (error) {
				handleAjaxError(error);
			};
		};

    getRecipe();
  }, []);

  const RemoveRecipe = async (recipeId) => {
    const sure = window.confirm('本当に削除しますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/recipes/${recipeId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);
        const removeRecipeStatus = await response.json();
        if (removeRecipeStatus.status === "ok"){
          success(removeRecipeStatus.message);
          navigate('/');
        } else {
          warn(removeRecipeStatus.message);
          navigate('/');
        }

      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleRemoveRecipe = (recipeId) =>{
    RemoveRecipe(recipeId);
  }

  const isCurrntUser = (user) => {
    return user.id === currentUser.id;
  }

  return (
    <>
      <HeadBlock title={recipe.title}/>
      <section className="section content-width">
      <h1 className="sectionTitle">こだわりレシピ</h1>
      <h2 className="recipe__title">{recipe.title}</h2>
      <div className="recipe__layout">
        <div className="recipe__layout-userInfo">
          <div className="recipe__user">
            <Link to={`/users/${recipe.user_id}`} className="recipe__user-image">
              <img src={user.image_url ? user.image_url : '/assets/default.jpeg'} alt="" />
            </Link>
            <span className="recipe__user-name">
              <Link to={`/users/${recipe.user_id}`} className="recipe__user-image">{user.name}</Link>
            </span>
          </div>
          <span className="recipe__timestamp">
            投稿日: {user.created_at}
          </span>
        </div>
        <div className="recipe__layout-points">
          <div className="recipeCard__performance">
            <p className="recipeCard__duration">
              <img src="/assets/timer.svg" alt="" />
              {recipe.duration}分
            </p>
            <p className="recipeCard__cost">
              <img src="/assets/yen.svg" alt="" />
              {recipe.cost}円
            </p>
          </div>
        </div>
      </div>
    
      <div className="recipe">
        <div className="recipe__image">
          <img src={recipe.image_url ? recipe.image_url : "/assets/sampleRecipe.jpeg"} alt="" />
          {!isCurrntUser(user) && currentUser.id && (
            <FavoriteForm recipe={recipe} recipeId={id}/>
          )}
        </div>
        <div className="recipe__info">
          <div className="recipe__ingredient">
            <h2 className="recipe__info-head">材料</h2>
            <p className="recipe__info-content">{recipe.ingredient}</p>
          </div>
          <div className="recipe__body">
            <h2 className="recipe__info-head">作り方・説明</h2>
            <p className="recipe__info-content">{recipe.body}</p>
          </div>
        </div>
      </div>
      {isCurrntUser(user) && (
        <div className="recipe__btn">
          <Link to={`/recipes/${id}/edit`} className="recipe__edit-btn btn">レシピを編集する</Link>
          <span className="recipe__delete-btn btn" onClick={() => handleRemoveRecipe(recipe.id)}>レシピを削除する</span>
        </div>
      )}
    </section>
    </>
  );
};

export default Recipe;