import React from "react";

const Users = (users, currentUserImg, currentUser) => {
  return (
    <>
      <HeadBlock title={"ユーザー一覧"}/>
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

export default Users;