import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import { handleAjaxError } from "../parts/helpers";
import { HeadBlock } from "../HeadBlock";
import PartialRecipes from "./recipes/PartialRecipes";

const Home = () => {
  const [recentRecipes, setRecipes] = useState([]);
  useEffect(() => {
    const getRecipes = async () => {
			try {
				const response = await window.fetch(`/api/home`,{
          method: 'GET',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });
				if (!response.ok) throw Error(response.statusText);
				const recipesData = await response.json();
        setRecipes(recipesData.recent_recipes);
			} catch (error) {
				handleAjaxError(error);
			};
		};

    getRecipes();
  }, []);

  return (
    <>
      <HeadBlock title={"ホーム"}/>
      <div className="container content-width">
        <div className="main-contents">
          <ul className="tab-group">
            <li className="tab tab-A is-active"><span>新着レシピ</span></li>
            <li className="tab tab-B"><span>みんなのお気に入りレシピ</span></li>
            {/* ログインしていたら */}
              <li className="tab tab-C"><span>フォローユーザーのレシピ</span></li>
          </ul>
          <section className="section panel tab-A is-show">
            <h1 className="sectionTitle">新着レシピ</h1>
            <ul className="recipes recipes-latest">
              {/* 投稿があれば */}
              <PartialRecipes recipes={recentRecipes}/>
              {/* 投稿がなければ */}
                <p className="nothing">現在投稿されているレシピはありません</p>
            </ul>
            <div className="read-more">
              <Link to={`/recipes`} className="read-more__btn btn">レシピ一覧へ</Link>
            </div>
          </section>

          <section className="section panel tab-B">
            <h1 className="sectionTitle">みんなのお気に入りレシピ</h1>
            <ul className="recipes recipes-favorites">
              {/* 投稿があれば */}
                {/* ループ */}
              {/* 投稿がなければ */}
                <p className="nothing">現在投稿されているレシピはありません</p>
            </ul>
          </section>
          {/* ログインしていれば */}
            <section className="section panel tab-C">
              <h1 className="sectionTitle">フォローしているユーザーのレシピ</h1>
              <ul className="recipes recipes-following">
                {/* 投稿があれば */}
                  {/* ループ */}
                {/* 投稿がなければ */}
                  <p className="nothing">現在投稿されているレシピはありません</p>
              </ul>
              <div className="read-more">
                <Link to={`/`} className="read-more__btn btn">もっと見る</Link>
              </div>
            </section>
        </div>
        <div className="sidebar">
          <h2 className="subTitle">条件を絞って検索</h2>
          <form action="">
            <label className="form__label" htmlFor="cost">コストで絞り込む</label>
            <div className="radio__wrap">
              <input
                className="form__radio"
                type="radio"
                id="cost"
                name="cost_lteq"
              />
              <span className="form__radio-text">100円以内</span>
            </div>
            <div className="radio__wrap">
              <input
                className="form__radio"
                type="radio"
                id="cost"
                name="cost_lteq"
              />
              <span className="form__radio-text">500円以内</span>
            </div>
            <div className="radio__wrap">
              <input
                className="form__radio"
                type="radio"
                id="cost"
                name="cost_lteq"
              />
              <span className="form__radio-text">1000円以内</span>
            </div>

            <label className="form__label" htmlFor="duration">調理時間で絞り込む</label>
            <div className="radio__wrap">
              <input
                className="form__radio"
                type="radio"
                id="duration"
                name="duration_lteq"
              />
              <span className="form__radio-text">10分以内</span>
            </div>
            <div className="radio__wrap">
              <input
                className="form__radio"
                type="radio"
                id="duration"
                name="duration_lteq"
              />
              <span className="form__radio-text">20分以内</span>
            </div>
            <div className="radio__wrap">
              <input
                className="form__radio"
                type="radio"
                id="duration"
                name="duration_lteq"
              />
              <span className="form__radio-text">30分以内</span>
            </div>
            <input type="submit" value={"検索"} className="sidebar__btn btn" />
          </form>

          <h2 className="subTitle">カテゴリから探す</h2>
          <ul className="categories">
            <li className="categories__item">
              <Link to={`/`} className="categories__link">カテゴリー名</Link>
            </li>
          </ul>

          <div className="sidebar__questions">
            <h2 className="subTitle">みんなの質問</h2>
            <ul className="sidebar__questions-list">
              <li className="sidebar__questions-item">
                <h3 className="sidebar__questions-title">
                  <Link to={`/`} >質問タイトル</Link>
                </h3>
                <span className="sidebar__questions-timestamp">0101010</span>
              </li>
            </ul>
            <Link to={`/`} className="sidebar__btn btn">質問一覧へ</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;