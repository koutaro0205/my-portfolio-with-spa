import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUser } from "./useUser";
import { HeadBlock } from '../../HeadBlock';
import { info } from "../../parts/notifications";
import UserForm from "./UserForm";
import { handleAjaxError } from '../../parts/helpers';

const Signup = () => {
  const { users, setUsers } = useUser();
  const [isLoading, setIsLoading] = useState(false);

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
      info(newUserData.message);
      navigate(`/`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <HeadBlock title={"ユーザー登録"}/>
      <section className="section content-width">
        <div className="form__inner">
          <h1 className="sectionTitle">ユーザー登録</h1>
          <UserForm onSave={addUser} users={users} setIsLoading={setIsLoading} isLoading={isLoading} />
        </div>
      </section>
    </>
  );
};

export default Signup;