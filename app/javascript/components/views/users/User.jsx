import React, { useEffect, useState } from 'react';
import { HeadBlock } from '../../HeadBlock';
import { useParams, Link } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import PartialRecipes from '../recipes/PartialRecipes';

const User = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [myRecipes, setMyRecipes] = useState([]);
  const [recipesCount, setCount] = useState(0);

  useEffect(() => {
    const getUser = async () => {
			try {
				const response = await window.fetch(`/api/users/${id}`);
				if (!response.ok) throw Error(response.statusText);
				const userInfo = await response.json();
        setUser(userInfo.user);
        setMyRecipes(userInfo.recipes);
        setCount(userInfo.recipes_count);
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

              {/* should change to a component */}
              <ul className="profileCard__user-follow">
                <li className="profileCard__user-following">
                  <span className="profileCard__user-followingCounts">~~</span>
                  <p className="profileCard__user-following-link"><a href="">フォロー</a></p>
                </li>
                <li className="profileCard__user-followr">
                  <span className="profileCard__user-followersCounts">~~</span>
                  <p className="profileCard__user-follower-link"><a href="">フォロワー</a></p>
                </li>
              </ul>

            </li>
          </ul>
          <div className="user__follow_form follow_form">
            <form action="">
              <input value={"フォロー"} type="submit" className="profileCard__follow-btn btn" />
            </form>
          </div>
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
          <p className="nothing">現在投稿されている質問はありません</p>
        </ul>
      </section>
    </>
  );
};

export default User;