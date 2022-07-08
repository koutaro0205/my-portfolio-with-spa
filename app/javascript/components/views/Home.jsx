import React, {useState, useEffect, useContext} from "react";
import { CurrentUserContext } from "../App";
import { Link } from "react-router-dom";
import { handleAjaxError } from "../parts/helpers";
import { HeadBlock } from "../HeadBlock";
import PartialRecipes from "./recipes/PartialRecipes";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import CategoriesList from "./categories/CategoriesList";
import { timeStamp } from "../parts/helpers";
import { ConditionalSearch } from "../parts/ConditionalSearch";

const Home = () => {
  const [recentRecipes, setRecentRecipes] = useState([]);
  const [followingRecipes, setFollowingRecipes] = useState([]);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [questions, setQuestions] = useState([]);
  const currentUser = useContext(CurrentUserContext);

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
        setRecentRecipes(recipesData.recent_recipes);
        setFollowingRecipes(recipesData.following_recipes);
        setFavoriteRecipes(recipesData.favorite_recipes);
        setQuestions(recipesData.questions);
			} catch (error) {
				handleAjaxError(error);
			};
		};

    getRecipes();
  }, []);

  const renderQuestions = (questionArray) =>{
    return questionArray.map((question) => (
      <li key={question.id} className="sidebar__questions-item">
        <h3 className="sidebar__questions-title">
          <Link to={`/questions/${question.id}`} >{question.title}</Link>
        </h3>
        <span className="sidebar__questions-timestamp">
          {timeStamp(question)}
        </span>
      </li>
    ));
  };

  return (
    <>
      <HeadBlock title={"ホーム"}/>
      <div className="container content-width">
        <div className="main-contents">
          <Tabs>
            <TabList className="tab-group">
              <Tab className="tab"><span>新着レシピ</span></Tab>
              <Tab className="tab"><span>みんなのお気に入りレシピ</span></Tab>
              {currentUser.id && (
                <Tab className="tab"><span>フォローユーザーのレシピ</span></Tab>
              )}
            </TabList>
            <TabPanel>
              <section className="section">
                <h1 className="sectionTitle">新着レシピ</h1>
                <ul className="recipes recipes-latest">
                  {recentRecipes.length === 0 ? (
                    <p className="nothing">現在投稿されているレシピはありません</p>
                  ) : (
                    <PartialRecipes recipes={recentRecipes}/>
                  )}
                </ul>
                <div className="read-more">
                  <Link to={`/recipes`} className="read-more__btn btn">レシピ一覧へ</Link>
                </div>
              </section>
            </TabPanel>

            <TabPanel>
              <section className="section">
                <h1 className="sectionTitle">みんなのお気に入りレシピ</h1>
                <ul className="recipes recipes-favorites">
                  {favoriteRecipes.length === 0 ? (
                    <p className="nothing">現在投稿されているレシピはありません</p>
                  ) : (
                    <PartialRecipes recipes={favoriteRecipes}/>
                  )}
                </ul>
              </section>
            </TabPanel>
            {currentUser.id && (
            <TabPanel>
              <section className="section">
                <h1 className="sectionTitle">フォローしているユーザーのレシピ</h1>
                <ul className="recipes recipes-following">
                  {followingRecipes.length === 0 ? (
                    <p className="nothing">現在投稿されているレシピはありません</p>
                  ) : (
                    <PartialRecipes recipes={followingRecipes}/>
                  )}
                </ul>
                <div className="read-more">
                  <Link to={`/recipes/following_recipes`} className="read-more__btn btn">もっと見る</Link>
                </div>
              </section>
            </TabPanel>
            )}
          </Tabs>
        </div>
        <div className="sidebar">
          <ConditionalSearch/>
          <CategoriesList/>
          <div className="sidebar__questions">
            <h2 className="subTitle">みんなの質問</h2>
            <ul className="sidebar__questions-list">
              {renderQuestions(questions)}
            </ul>
            <Link to={`/questions`} className="sidebar__btn btn">質問一覧へ</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;