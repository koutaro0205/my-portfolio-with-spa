import React from 'react';
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__inner content-width">
        <ul className="footer__list">
          <li><Link to="/">ホームへ戻る</Link></li>
        </ul>
        <p className="footer__copyright">Copyright © 2022 Koutaro Inoue All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;