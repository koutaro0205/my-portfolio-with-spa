import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { success } from "../../parts/notifications";
import { handleAjaxError } from '../../parts/helpers';

const Login = ({setCurrentUser, setLoggedInStatus}) => {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    remember_me: false,
  });
  const navigate = useNavigate();
  const [loginError, setLoginError] = useState([]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    setLoginInfo({ ...loginInfo, [name]: value });
  };

  const LoginUser = async (userInfo) => {
    try {
      const response = await window.fetch('/api/login', {
        method: 'POST',
        body: JSON.stringify(userInfo),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      });
      if (!response.ok) throw Error(response.statusText);

      const authenticatedUserStatus = await response.json();
      console.log(authenticatedUserStatus);

      if (authenticatedUserStatus.logged_in) {
        setLoggedInStatus(true);
        setCurrentUser(authenticatedUserStatus.user);

        success('ログイン認証成功');
        navigate(`/`);
      } else {
        const errorMessage = authenticatedUserStatus.errors;
        setLoginError(errorMessage);
        console.log(errorMessage);
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const isEmptyError = (errors) => errors.length === 0;

  const renderError = () => {
    if (isEmptyError(loginError)) {
      return null;
    }

    return (
      <div className="error_explanation">
        <div className="alert alert-danger">
          入力内容が正しくありません。ボタンをクリックして再入力してください。
        </div>
        <ul className="error_messages">
          {loginError.map((error) => (
            <li key={error} className="message">{error}</li>
          ))}
        </ul>
        <button onClick={() => window.location.reload()}>再入力</button>
      </div>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmptyError(loginError)){
      LoginUser(loginInfo);
    };
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
          <h1 className="sectionTitle">ログイン</h1>
          <form className="form" onSubmit={handleSubmit}>
            {renderError()}

            <label className="form__label" htmlFor="email">メールアドレス</label>
            <input
              className="form__field"
              type="email"
              id="email"
              name="email"
              onChange={handleInputChange}
            />

            <label className="form__label" htmlFor="password">パスワード</label>
            <input
              className="form__field"
              type="password"
              id="password"
              name="password"
              onChange={handleInputChange}
            />

            <label className='checkbox' htmlFor="remember_me">
              <input type="checkbox" name="remember_me" id="remember_me" onChange={handleInputChange} />
              <span className="remember_me">次回から自動的にログインする</span>
            </label>

            <input type="submit" value={"ユーザー登録"} className="form__btn btn" />
          </form>
          <p className="signup">ユーザー登録されていない方は<Link to={`/users/new`}>こちら</Link></p>
          <p className="reset">パスワードをお忘れの方は<a href="#">こちら</a></p>
        </div>
      </section>
    </>
  );
};

export default Login;