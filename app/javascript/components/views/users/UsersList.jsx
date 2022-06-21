import React, { useEffect, useState } from 'react';
import { useUser } from "./useUser";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import Auth from '../../providers/Auth';
import { isEmptyObject } from '../../parts/helpers';
import { handleAjaxError } from '../../parts/helpers';
import { success } from '../../parts/notifications';

const UserList = ({currentUser, currentUserImg}) => {
  Auth();

  const { users } = useUser();
  const [admin, setAdmin] = useState({});

  useEffect(() => {
    const checkAdminUser = async () => {
      try {
        const response = await window.fetch('/api/admin_user');
        if (!response.ok) throw Error(response.statusText);
        const adminUserStatus = await response.json();
        if (adminUserStatus.admin) {
          setAdmin(adminUserStatus.user);
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };
    checkAdminUser();

  }, []);

  const RemoveUser = async (userId) => {
    const sure = window.confirm('本当に削除しますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/users/${userId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('ユーザーを削除しました');
        navigate('/');
      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleRemoveUser = (userId) =>{
    RemoveUser(userId);
  }

  const isCurrntUser = (user) => {
    return user.id === currentUser.id;
  }

  const renderUsers = (userArray) => {
    return userArray.map((user) => (
      <li key={user.id} className="user__item">
        <div className="user__image">
          <img src={user.image_url ? user.image_url : '/assets/default.jpeg'} alt="" />
        </div>
        <div className="user__name">
          <NavLink to={`/users/${user.id}`} className="user__name-link">{user.name}</NavLink>
        </div>
        {!isEmptyObject(admin) && !isCurrntUser(user) && (
          <div className="user__delete">
            <span onClick={() => handleRemoveUser(user.id)}>ユーザーを削除（管理者権限）</span>
          </div>
        )}
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
      <section className="section content-width">
        <div className="container">
          <div className="profileCard profileCard__users">
          <h2 className="subTitle">現在のユーザー</h2>
            <ul className="profileCard__info">
              <li className="profileCard__image">
                <img src={currentUserImg ? currentUserImg : '/assets/default.jpeg'} alt="" />
              </li>
              <li className="profileCard__user">
                <p className="profileCard__user-name">{currentUser.name}</p>
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
    </>
  );
};

export default UserList;