import React from "react";
import { NavLink } from "react-router-dom";
import { noImage, timeStamp } from "../../parts/helpers";

const PartialRecipes = ({recipes}) => {
  const renderRecipes = (recipeArray) => {
    return recipeArray.map((recipe) => (
      <li key={recipe.id} className="recipeCard">
        <div className="recipeCard__user">
          <NavLink to={`/users/${recipe.user_id}`} className='recipeCard__user-image'>
            <img src={recipe.user.image_url ? recipe.user.image_url : "/assets/default.jpeg"} alt="" />
          </NavLink>
          <span className="recipeCard__user-name">
            {recipe.user.name}
          </span>
        </div>
        <NavLink to={`/recipes/${recipe.id}`} className="recipeCard__image">
          <img src={recipe.image_url ? recipe.image_url : noImage()} alt="" />
        </NavLink>
        <div className="recipeCard__info">
          <h2 className="recipeCard__title"><NavLink to={`/recipes/${recipe.id}`}>{recipe.title}</NavLink></h2>
          <p className="recipeCard__tag">
            カテゴリ：
            <NavLink to={`/categories/${recipe.category_id}`} className="recipeCard__tag-text1">{recipe.category.name}</NavLink>
          </p>
          <div className="recipeCard__performance">
            <p className="recipeCard__duration">
              <img src="/assets/timer.svg" alt="所要時間" />
              {recipe.duration}分
            </p>
            <p className="recipeCard__cost">
            <img src="/assets/yen.svg" alt="コスト" />
              {recipe.cost}円
            </p>
          </div>

          <span className="recipeCard__timestamp">
            投稿日：{timeStamp(recipe)}
          </span>
        </div>
      </li>
    ));
  };

  return (
    <>
      {renderRecipes(recipes)}
    </>
  );
};

export default PartialRecipes;