import React, {useEffect, useState} from "react";
import { HeadBlock } from "../../HeadBlock";
import { useParams, useLocation, NavLink } from "react-router-dom";
import { handleAjaxError, defaultImage, loadingImage } from "../../parts/helpers";

const FollowList = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const [user, setUser] = useState({});
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [title, setTitle] = useState('');
  const [recipesCount, setRecipesCount] = useState();

  const setInfo = (data) =>{
    setUser(data.user);
    setTitle(data.title);
    setRecipesCount(data.recipes_count);
  }

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const response = await window.fetch(`/api/users/${id}/followers`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setIsLoading(false);
        setInfo(data);
        setFollowers(data.users);
      } catch (error) {
        handleAjaxError(error);
        setIsLoading(false);
      }
    };

    const fetchFollowing = async () => {
      try {
        const response = await window.fetch(`/api/users/${id}/following`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setIsLoading(false);
        setInfo(data);
        setFollowing(data.users);
      } catch (error) {
        handleAjaxError(error);
        setIsLoading(false);
      }
    };

    if (location.pathname === `/users/${id}/following`){
      fetchFollowing();
    } else if (location.pathname === `/users/${id}/followers`){
      fetchFollowers();
    }

  }, []);

  const renderUsers = (userArray) => {
    return userArray.map((user) => (
      <li key={user.id} className="user__item">
        <div className="user__image">
          <img src={user.image_url ? user.image_url : defaultImage()} alt="" />
        </div>
        <div className="user__name">
          <NavLink to={`/users/${user.id}`} className="user__name-link">{user.name}</NavLink>
        </div>
      </li>
    ));
  };

  return (
    <>
      <HeadBlock title={title}/>
      <section className="section content-width">
        <div className="container">
          <div className="profileCard profileCard__users">
          <h2 className="subTitle">ユーザー情報</h2>
            <ul className="profileCard__info">
              <li className="profileCard__image">
                <img src={user.image_url ? user.image_url : defaultImage()} alt=""/>
              </li>
              <li className="profileCard__user">
                <p className="profileCard__user-name">{user.name}</p>
                <p className="profileCard__user-postsCounts">投稿数：{recipesCount}</p>
              </li>
            </ul>
          </div>
          {isLoading ? (
            <div className="loading-image">
              <img src={loadingImage()} alt="" />
            </div>
          ) : (
            <div className="users">
              <h2 className="subTitle">{title}</h2>
              <ul className="users__list">
                {(() => {
                  if (location.pathname === `/users/${id}/following`) {
                    return renderUsers(following);
                  } else if (location.pathname === `/users/${id}/followers`) {
                    return renderUsers(followers);
                  }
                })()}
              </ul>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default FollowList;