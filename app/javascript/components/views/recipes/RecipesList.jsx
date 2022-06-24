import React, { useContext } from "react";
import { CurrentUserContext } from "../../App";
import { useRecipe } from "./useRecipe";
import { Link, NavLink } from "react-router-dom";
import { HeadBlock } from "../../HeadBlock";

const RecipesList = () => {
  const { recipes } = useRecipe();
  const currentUser = useContext(CurrentUserContext);

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
          <img src={recipe.image_url ? recipe.image_url : '/assets/sampleRecipe.jpeg'} alt="" />
        </NavLink>
        <div className="recipeCard__info">
          <h2 className="recipeCard__title"><NavLink to={`/recipes/${recipe.id}`}></NavLink></h2>
          <p className="recipeCard__tag">ズボラポイント：
            <span className="recipeCard__tag-text1">未実装</span>
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
            投稿日：{recipe.created_at}
          </span>
        </div>
      </li>
    ));
  };

  return (
    <>
      <HeadBlock title={"レシピ一覧"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">みんなのレシピ一覧</h1>
        <ul className="recipes">
          {renderRecipes(recipes)}
        </ul>
      </section>
    </>
  );
};

export default RecipesList;