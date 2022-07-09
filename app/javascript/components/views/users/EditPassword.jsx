import React, { useState, useContext } from 'react';
import { ControllLoggedInContext } from '../../App';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { success, warn } from "../../parts/notifications";
import { handleAjaxError } from '../../parts/helpers';
import { HeadBlock } from '../../HeadBlock';

const EditPassword = () => {
  const { token } = useParams();
  const ControllLoggedInFuncs = useContext(ControllLoggedInContext);
  const setCurrentUser = ControllLoggedInFuncs[0];
  const setLoggedInStatus = ControllLoggedInFuncs[1];

  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const exsistedEmail = query.get('email');

  const [password, setPassword] = useState({
    password: '',
    password_confirmation: '',
    email: exsistedEmail,
  });
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState([]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setPassword({ ...password, [name]: value });
  };

  const validatePassword = () => {
    const errors = [];
    if (password.password === '' || password.password_confirmation === ''){
      errors.push('パスワードを入力してください');
    }

    if (password.password.length < 6 || password.password_confirmation.length < 6) {
      errors.push('パスワードを6文字以上で入力してください');
    }

    if (password.password_confirmation !== password.password) {
      errors.push("入力されたパスワードが一致しません");
    }

    return errors;
  };

  const UpdatePassword = async (newPassword) => {
    try {
      const response = await window.fetch(`/api/password_resets/${token}`, {
        method: 'PATCH',
        body: JSON.stringify(newPassword),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (!response.ok) throw Error(response.statusText);

      const updatedPasswoedStatus = await response.json();

      if (updatedPasswoedStatus.status === "ok") {

        success("パスワードが再設定されました");
        navigate(`/users/${updatedPasswoedStatus.user.id}`);
        setLoggedInStatus(true);
        setCurrentUser(updatedPasswoedStatus.user);
      } else if (updatedPasswoedStatus.errors) {
        const errorMessage = updatedPasswoedStatus.errors;
        warn("新しいパスワードを入力してください。")
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const isEmptyError = (errors) => errors.length === 0;

  const renderError = () => {
    if (isEmptyError(passwordError)) {
      return null;
    }

    return (
      <div className="error_explanation">
        <div className="alert alert-danger">
          入力内容が正しくありません。ボタンをクリックして再入力してください。
        </div>
        <ul className="error_messages">
          {passwordError.map((error) => (
            <li key={error} className="message">{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validatePassword(password);
    if (!isEmptyError(errors)) {
      setPasswordError(errors);
    } else {
      UpdatePassword(password);
    }
  };

  return (
    <>
      <HeadBlock title={"パスワード再設定"}/>
      <section className="section content-width">
        <div className="form__inner">
          <h1 className="sectionTitle">パスワード再設定</h1>
          <p className="description">
            新しいパスワードを入力して下さい
          </p>
          <form className="form" onSubmit={handleSubmit}>
            {renderError()}

            <label className="form__label" htmlFor="password">パスワード</label>
            <input
              className="form__field"
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
            />

            <label className="form__label" htmlFor="password_confirmation">パスワード確認</label>
            <input
              className="form__field"
              type="password"
              id="password_confirmation"
              name="password_confirmation"
              onChange={handleInputChange}
            />

            <input type="submit" value={"パスワードを更新"} className="form__btn btn" />
          </form>
        </div>
      </section>
    </>
  );
};

export default EditPassword;