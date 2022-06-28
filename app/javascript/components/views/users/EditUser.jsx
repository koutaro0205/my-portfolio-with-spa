import React, { useEffect, useContext } from 'react';
import { ControllLoggedInContext, CurrentUserContext } from '../../App';
import { useUser } from "./useUser";
import { useNavigate, useParams } from 'react-router-dom';
import UserForm from "./UserForm";
import { success, warn } from "../../parts/notifications";
import { handleAjaxError, isEmptyObject } from "../../parts/helpers";
import { HeadBlock } from '../../HeadBlock';

const EditUser = () => {
  const { users, setUsers } = useUser();
  const navigate = useNavigate();
  const { id } = useParams();
  const ControllLoggedInFuncs = useContext(ControllLoggedInContext);
  const setCurrentUser = ControllLoggedInFuncs[0];
  const currentUser = useContext(CurrentUserContext);

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
      <HeadBlock title={"ユーザー編集"}/>
      <section className="section content-width">
        <div className="form__inner">
          <h1 className="sectionTitle">現在の登録情報</h1>
          <ul className="profileCard__info">
            <li className="profileCard__image">
              <img src={currentUser.image_url ? currentUser.image_url : '/assets/default.jpeg'} alt="" />
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