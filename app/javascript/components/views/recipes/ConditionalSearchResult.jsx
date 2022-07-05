import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { HeadBlock } from '../../HeadBlock';
import PartialRecipes from './PartialRecipes';

const ConditionalSearchResult = () => {
  const location = useLocation();
  const recipes = location.state.recipes;
  return (
    <>
      <HeadBlock title={"条件を絞って検索"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">条件に一致する検索結果一覧</h1>
        <ul className="recipes">
        {recipes.length === 0 ? (
          <p className="nothing">見つかりませんでした</p>
        ) : (
          <PartialRecipes recipes={recipes}/>
        )}
        </ul>
        <div className="read-more">
          <Link to={`/recipes`} className="read-more__btn btn">レシピ一覧へ</Link>
        </div>
      </section>
    </>
  );
};

export default ConditionalSearchResult;
