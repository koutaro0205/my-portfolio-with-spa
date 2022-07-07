import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { handleAjaxError, isEmptyObject } from '../parts/helpers';

const Footer = ({currentUser}) => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const checkAdminUser = async () => {
      try {
        const response = await window.fetch('/api/admin_user');
        if (!response.ok) throw Error(response.statusText);
        const adminUserStatus = await response.json();
        if (adminUserStatus.admin) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };
    if (!isEmptyObject(currentUser)){
      checkAdminUser();
    }

  }, []);
  return (
    <footer className="footer">
      <div className="footer__inner content-width">
        <ul className="footer__list">
          <li><Link to="/">ホームへ戻る</Link></li>
          {!isEmptyObject(currentUser) && currentUser.admin && (
            <li><Link to="/categories">カテゴリ追加</Link></li>
          )}
        </ul>
        <p className="footer__copyright">Copyright © 2022 Koutaro Inoue All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;