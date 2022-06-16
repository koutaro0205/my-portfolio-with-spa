import React from 'react';
import { useUser } from "./useUser";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import Auth from '../../providers/Auth';

const UserList = () => {
  Auth();

  const { users, isLoading, isError} = useUser();

  const renderUsers = (userArray) => {
    return userArray.map((user) => (
      <li key={user.id} className="user__item">
        <div className="user__image">
          <img src={user.image_url ? user.image_url : '/assets/default.jpeg'} alt="" />
        </div>
        <div className="user__name">
          <NavLink to={`/users/${user.id}`} className="user__name-link">{user.name}</NavLink>
        </div>

        <div className="user__follow">
          フォロー
        </div>
      </li>
    ));
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>ユーザー一覧</title>
        </Helmet>
      </HelmetProvider>
        {isError && <p>Something went wrong. Check the console.</p>}
        {isLoading ? (
          <p className='loading'>Loading...</p>
        ) : (
          <section className="section content-width">
            <div className="container">
              <div className="profileCard profileCard__users">
              <h2 className="subTitle">現在のユーザー</h2>
                <ul className="profileCard__info">
                  <li className="profileCard__image">
                  </li>
                  <li className="profileCard__user">
                    <p className="profileCard__user-name">ユーザー名</p>
                    <p className="profileCard__user-postsCounts">投稿数：~</p>
                  </li>
                </ul>
              </div>
              <div className="users">
                <h2 className="subTitle">登録ユーザー一覧</h2>
                <ul className="users__list">
                  {renderUsers(users)}
                </ul>
              </div>
            </div>
          </section>
        )}
    </>
  );
};

export default UserList;