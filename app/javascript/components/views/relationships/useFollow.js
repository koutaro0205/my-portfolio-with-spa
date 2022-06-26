import React, { useState } from "react";
import { handleAjaxError } from "../../parts/helpers";

export const useFollow = () => {
  const [followerCount, setFollowerCount] = useState();
  const [followingCount, setFollowingCount] = useState();

  const getFollowers = async (id) => {
    try {
      const response = await window.fetch(`/api/users/${id}/followers`);
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      setFollowerCount(data.followers_count);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const getFollowing = async (id) => {
    try {
      const response = await window.fetch(`/api/users/${id}/following`);
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      setFollowingCount(data.following_count)
    } catch (error) {
      handleAjaxError(error);
    }
  };


  return {
    followerCount,
    followingCount,
    setFollowerCount,
    setFollowingCount,
    getFollowers,
    getFollowing,
  };
};