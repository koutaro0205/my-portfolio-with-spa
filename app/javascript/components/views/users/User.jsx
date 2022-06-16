import React, { useEffect, useState } from 'react';
import { useUser } from "./useUser";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import { isEmptyObject } from '../../parts/helpers';

const User = () => {
  const { id } = useParams();
  const { users, isLoading, isError} = useUser();

  // const user = users.find((e) => e.id === Number(id));
  const [user, setUser] = useState({});
  const [userImg, setUserImg] = useState();

  useEffect(() => {
    const getUser = async () => {
			try {
				const response = await window.fetch(`/api/users/${id}`);
				if (!response.ok) throw Error(response.statusText);

				const userInfo = await response.json();

        if (userInfo.status === "ok" && !isEmptyObject(userInfo.image) ) {
          setUser(userInfo.user);
          setUserImg(userInfo.image);
          console.log(user)
        }
			} catch (error) {
				handleAjaxError(error);
			};
		};

    getUser();
  }, []);

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ユーザー詳細</title>
        </Helmet>
      </HelmetProvider>
        {isError && <p>Something went wrong. Check the console.</p>}
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <>
            <section className="section content-width profile">
              <h1 className="sectionTitle">ユーザー情報</h1>
              <div className="profileCard profileCard--margin-top">
                <ul className="profileCard__info">
                  <li className="profileCard__image">
                    <img src={userImg && userImg} alt="" />
                  </li>
                  <li className="profileCard__user">
                    <p className="profileCard__user-name">{user.name}</p>
                    <p className="profileCard__user-postsCounts">投稿数 ~</p>

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
                <p className="nothing">現在投稿されているレシピはありません</p>
              </ul>
            </section>
            <section className="section content-width">
              <h1 className="sectionTitle">私の質問一覧</h1>
              <ul className="questions__list">
                <p className="nothing">現在投稿されている質問はありません</p>
              </ul>
            </section>
          </>
        )}
    </>
  );
};

export default User;