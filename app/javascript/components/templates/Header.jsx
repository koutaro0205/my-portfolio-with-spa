import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { DropDownMenu } from '../parts/animations';
import { success } from "../parts/notifications";
// import { useSession } from '../views/users/useSession';

const Header = ({ setCurrentUser, setLoggedInStatus, currentUser }) => {
  const navigate = useNavigate();
  // const { setCurrentUser, setLoggedInStatus } = useSession();

  const handleLogout = () => {
    setLoggedInStatus("未ログイン");
    setCurrentUser({});
  };

  const handleLogoutClick = async () => {
    const sure = window.confirm('ログアウトしますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/logout`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);

        success('ログアウトしました');
        navigate('/');
        handleLogout();
      } catch (error) {
        // handleAjaxError(error);
        console.log("ログアウトエラー", error);
      }
    }
  };

  const isEmptyCurrentUser = (obj) => Object.keys(obj).length === 0;

  return (
    <header className="header">
      <div className="header__inner content-width">
        <h1 className="header__logo"><Link to="/" className="header__logo-link">ZuboRecipes</Link></h1>
        <div className="header__search">
          <form className="header__search-form">
            <input type="text" className="header__search-field" />
            <input type="submit" className="header__search-submit btn" />
            <p className="header__search-text">検索したいキーワードを入力してください。</p>
          </form>
        </div>
        <div className="header__menu">
          <ul className="header__menu-list">
            <li className="header__menu-item"><a href="" className="header__menu-link btn">レシピを投稿</a></li>
            <li className="header__menu-item"><a href="" className="header__menu-link btn">お気に入り</a></li>
          </ul>
        </div>
      </div>
      <nav className="header__nav">
        <div className="header__nav__inner">
          <ul className="header__nav-list">
            <li className="header__nav-item"><Link to="/" className="header__nav-link">ホーム</Link></li>
            <li className="header__nav-item"><a href="" className="header__nav-link">質問一覧</a></li>
            {(() => {
              if (isEmptyCurrentUser(currentUser)) {
                return (
                  <>
                    <li className="header__nav-item"><Link to="/login" className="header__nav-link">ログイン</Link></li>
                    <li className="header__nav-item"><Link to="/users/new/" className="header__nav-link">新規登録</Link></li>
                  </>
                );
              } else {
                return (
                  <>
                    <DropDownMenu handleLogoutClick={handleLogoutClick} currentUser={currentUser} isEmptyCurrentUser={isEmptyCurrentUser}/>
                  </>
                );
              }
            })()}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;