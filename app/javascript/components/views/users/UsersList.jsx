import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from "../../App";
import { useUser } from "./useUser";
import { HeadBlock } from '../../HeadBlock';
import { NavLink, useNavigate } from 'react-router-dom';
import { handleAjaxError, isCurrntUser, defaultImage, loadingImage } from '../../parts/helpers';
import { success, warn } from '../../parts/notifications';
import FollowForm from '../relationships/FollowForm';
import { useImage } from './useImage';
import Pagination from '../../parts/Pagination';

const UserList = () => {
  const currentUser = useContext(CurrentUserContext);
  const { users, isLoading } = useUser();
  const { currentImage } = useImage();
  const [admin, setAdmin] = useState(false);
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  useEffect(() => {
    const checkAdminUser = async () => {
      try {
        const response = await window.fetch('/api/admin_user');
        if (!response.ok) throw Error(response.statusText);
        const adminUserStatus = await response.json();
        if (adminUserStatus.admin) {
          setAdmin(true);
        } else {
          setAdmin(false);
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
        const removeUserStatus = await response.json();
        if (removeUserStatus.status === "ok"){
          success('ユーザーを削除しました');
          navigate('/');
        } else {
          warn(removeUserStatus.message);
          navigate('/');
        }

      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleRemoveUser = (userId) =>{
    RemoveUser(userId);
  }

  const renderUsers = (userArray) => {
    return userArray.map((user) => (
      <li key={user.id} className="user__item">
        <div className="user__image">
          <img src={user.image_url ? user.image_url : defaultImage()} alt="" />
        </div>
        <div className="user__name">
          <NavLink to={`/users/${user.id}`} className="user__name-link">{user.name}</NavLink>
        </div>
        {admin && !isCurrntUser(user, currentUser) && (
          <div className="user__delete">
            <span onClick={() => handleRemoveUser(user.id)}>削除</span>
          </div>
        )}
        {!isCurrntUser(user, currentUser) && (
          <div className="user__follow">
            <FollowForm user={user} userId={user.id}/>
          </div>
        )}
      </li>
    ));
  };

  return (
    <>
      <HeadBlock title={"ユーザー一覧"}/>
      <section className="section content-width">
        <div className="container">
          <div className="profileCard profileCard__users">
          <h2 className="subTitle">現在のユーザー</h2>
            <ul className="profileCard__info">
              <li className="profileCard__image">
                <img src={currentImage ? currentImage : defaultImage()} alt="" />
              </li>
              <li className="profileCard__user">
                <p className="profileCard__user-name">{currentUser.name}</p>
                <p className="profileCard__user-postsCounts">
                  投稿数：{currentUser.recipes.length}
                </p>
              </li>
            </ul>
          </div>
          {isLoading ? (
            <div className="loading-image">
              <img src={loadingImage()} alt="" />
            </div>
          ) : (
            <div className="users">
              <h2 className="subTitle">登録ユーザー一覧</h2>
              <ul className="users__list">
                {renderUsers(currentUsers)}
              </ul>
              <Pagination
                postsPerPage={usersPerPage}
                totalPosts={users.length}
                paginate={paginate}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default UserList;