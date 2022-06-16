import React from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "./useUser";
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { success } from "../../parts/notifications";
import UserForm from "./UserForm";
import { handleAjaxError } from '../../parts/helpers';

const Signup = ({setCurrentUser, setLoggedInStatus}) => {
  const { users, setUsers } = useUser();

  const navigate = useNavigate();

  const addUser = async (newUser) => {
    try {
      const response = await window.fetch('/api/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const newUserData = await response.json();
      const savedUser = newUserData.user;
      const newUsers = [...users, savedUser];
      setUsers(newUsers);
      setLoggedInStatus(true);
      setCurrentUser(savedUser);
      success('ユーザー登録しました。');
      navigate(`/users/${savedUser.id}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Signup</title>
        </Helmet>
      </HelmetProvider>
      <section className="section content-width">
        <div className="form__inner">
          <h1 className="sectionTitle">ユーザー登録</h1>
          <UserForm onSave={addUser} users={users} />
        </div>
      </section>
    </>
  );
};

export default Signup;