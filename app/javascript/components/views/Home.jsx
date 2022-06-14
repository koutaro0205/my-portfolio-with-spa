import React from "react";
import { Link } from "react-router-dom";
import { Helmet, HelmetProvider } from 'react-helmet-async';

const Home = () => {
  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Home</title>
        </Helmet>
      </HelmetProvider>
      <h1>リンクチェック（debug用）</h1>
      <ul>
        <li>新規登録は<Link to={`/users/new/`}>こちら</Link></li>
        <li>ユーザー一覧は<Link to={`/users/`}>こちら</Link></li>
      </ul>
    </>
  );
};

export default Home;