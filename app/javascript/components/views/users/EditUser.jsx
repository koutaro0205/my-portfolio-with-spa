import React, { useEffect } from 'react';
import { useUser } from "./useUser";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from "./UserForm";
import { success, warn } from "../../parts/notifications";
import { handleAjaxError, isEmptyObject } from "../../parts/helpers";
// import { Link } from 'react-router-dom';

const EditUser = ({setCurrentUser, currentUser}) => {
  const { users, setUsers} = useUser();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getUser = async (userId) => {
      try {
        const response = await window.fetch(
          `/api/users/${userId}/edit`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          }
        );
        if (!response.ok) throw Error(response.statusText);

        const data = await response.json();
        console.log(data);
        if(data.status === 'forbidden'){
          warn(data.message);
          navigate(`/`);
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };

    getUser(id);
  }, []);

  const updateUser = async (updatedUser) => {
    try {
      const response = await window.fetch(
        `/api/users/${updatedUser.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedUser),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const updatedUserInfo = await response.json();
      console.log(updatedUserInfo);

      if (updatedUserInfo.status === 'ok'){
        const newUsers = users;
        const idx = newUsers.findIndex((user) => user.id === updatedUser.id);
        newUsers[idx] = updatedUser;
        setUsers(newUsers);
        setCurrentUser(updatedUser);
        success('ユーザー情報が更新されました！');
        navigate(`/users/${updatedUser.id}`);
      } else {
        warn(updatedUserInfo.message);
        navigate(`/`);
      };
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return(
    <>
      <HelmetProvider>
        <Helmet>
          <title>登録情報編集</title>
        </Helmet>
      </HelmetProvider>
      <section className="section content-width">
        <div className="form__inner">
          <h1 className="sectionTitle">現在の登録情報</h1>
          <ul className="profileCard__info">
            <li className="profileCard__image">
            </li>
            <li className="profileCard__user">
              <p className="profileCard__user-name">{!isEmptyObject(currentUser) ? currentUser.name : null}</p>
              <p className="profileCard__user-email">{!isEmptyObject(currentUser) ? currentUser.email : null}</p>
            </li>
          </ul>
        </div>
      </section>
      <section className="section content-width">
        <div className="form__inner">
          <h1 className="sectionTitle">ユーザー編集</h1>
          <UserForm onSave={updateUser} users={users} />
        </div>
      </section>
    </>
  );
};

export default EditUser;