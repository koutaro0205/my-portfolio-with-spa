import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

export const DropDownMenu = ({handleLogoutClick, currentUser, isEmptyCurrentUser}) => {
  const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleOutsideClick = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            setIsOpen(false);
        }
    };

    const handleClick = () => {
      setIsOpen(!isOpen);
    }

    return(
        <>
          <li className="header__nav-item dropdown" ref={dropdownRef}>
            <span className="dropdown__menu" onClick={handleClick} aria-haspopup="true" aria-expanded={isOpen}>
              {!isEmptyCurrentUser(currentUser) && currentUser.name}
            </span>

            {isOpen && (
              <ul className="dropdown__lists">
                <li className="dropdown__item"><Link to={`/users/${currentUser.id}`} className="header__nav-link">登録情報</Link></li>
                <li className="dropdown__item"><Link to={`/users/${currentUser.id}/edit`} className="header__nav-link">ユーザー編集</Link></li>
                <li className="dropdown__item"><Link to="/users/" className="header__nav-link">ユーザー一覧</Link></li>
                <li className="dropdown__item"><span onClick={handleLogoutClick} className="header__nav-link">ログアウト</span></li>
              </ul>
            )}
          </li>
        </>
    );
};

export const TabMenu = () => {
  document.addEventListener('DOMContentLoaded', function(){
    const tabs = document.getElementsByClassName('tab');
    for(let i = 0; i < tabs.length; i++) {
      tabs[i].addEventListener('click', tabSwitch, false);
    }
    function tabSwitch(){
      document.getElementsByClassName('is-active')[0].classList.remove('is-active');
      this.classList.add('is-active');
      document.getElementsByClassName('is-show')[0].classList.remove('is-show');
      const arrayTabs = Array.prototype.slice.call(tabs);
      const index = arrayTabs.indexOf(this);
      document.getElementsByClassName('panel')[index].classList.add('is-show');
    };
  }, false);
};