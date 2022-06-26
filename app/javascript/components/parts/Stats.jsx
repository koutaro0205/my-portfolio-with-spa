import React from "react";
import { Link } from "react-router-dom";

export const Stats = ({followerCount, followingCount, userId}) => {

  return (
    <ul className="profileCard__user-follow">
      <li className="profileCard__user-following">
        <span className="profileCard__user-followingCounts">{followingCount}</span>
        <p className="profileCard__user-following-link"><Link to={`/users/${userId}/following`}>フォロー</Link></p>
      </li>
      <li className="profileCard__user-followr">
        <span className="profileCard__user-followersCounts">{followerCount}</span>
        <p className="profileCard__user-follower-link"><Link to={`/users/${userId}/followers`}>フォロワー</Link></p>
      </li>
    </ul>
  );
};