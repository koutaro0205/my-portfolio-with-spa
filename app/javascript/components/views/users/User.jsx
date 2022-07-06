import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from "../../App";
import { HeadBlock } from '../../HeadBlock';
import { useParams, Link } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import PartialRecipes from '../recipes/PartialRecipes';
import PartialQuestions from '../questions/PartialQuestions';
import FollowForm from '../relationships/FollowForm';
import { Stats } from '../../parts/Stats';
import { useFollow } from '../relationships/useFollow';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [myRecipes, setMyRecipes] = useState([]);
  const [recipesCount, setCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const { followerCount, followingCount, getFollowers, getFollowing, setFollowerCount} = useFollow();
  useEffect(() => {
    getFollowers(id);
  }, [followerCount]);

  useEffect(() => {
    getFollowing(id);
  }, [followingCount])

  useEffect(() => {
    const getUser = async () => {
			try {
				const response = await window.fetch(`/api/users/${id}`);
				if (!response.ok) throw Error(response.statusText);
				const userInfo = await response.json();
        setUser(userInfo.user);
        setMyRecipes(userInfo.recipes);
        setCount(userInfo.recipes_count);
        setQuestions(userInfo.questions);
			} catch (error) {
				handleAjaxError(error);
			};
		};

    getUser();
  }, []);

  return (
    <>
      <HeadBlock title={"ユーザー情報"}/>
      <section className="section content-width profile">
        <h1 className="sectionTitle">ユーザー情報</h1>
        <div className="profileCard profileCard--margin-top">
          <ul className="profileCard__info">
            <li className="profileCard__image">
              <img src={user.image_url ? user.image_url : "/assets/default.jpeg"} alt="" />
            </li>
            <li className="profileCard__user">
              <p className="profileCard__user-name">{user.name}</p>
              <p className="profileCard__user-postsCounts">投稿数 {recipesCount}</p>
              <Stats followerCount={followerCount} followingCount={followingCount} userId={id}/>
            </li>
          </ul>
          {currentUser.id && currentUser.id !== user.id && (
            <FollowForm user={user} userId={id} setFollowerCount={setFollowerCount}/>
          )}
        </div>
      </section>
      <section className="section content-width">
        <h1 className="sectionTitle">私のレシピ一覧</h1>
        <ul className="recipes">
          <PartialRecipes recipes={myRecipes}/>
          {myRecipes.length === 0 && (
            <p className="nothing">現在投稿されているレシピはありません</p>
          )}
        </ul>
      </section>
      <section className="section content-width">
        <h1 className="sectionTitle">私の質問一覧</h1>
        <ul className="questions__list">
          <PartialQuestions questions={questions}/>
          {questions.length === 0 && (
            <p className="nothing">現在投稿されている質問はありません</p>
          )}
        </ul>
      {/* pagenate */}
    </section>
    </>
  );
};

export default User;