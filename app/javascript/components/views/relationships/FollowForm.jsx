import React, { useState, useEffect } from "react";
import { handleAjaxError } from "../../parts/helpers";
import { useLocation } from "react-router-dom";

const FollowForm = ({user, userId, setFollowerCount}) => {
  const [followStatus, setFollowStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
		const checkFollowStatus = async (id) => {
			try {
				const response = await window.fetch(`/api/follow_status/${id}`);
				if (!response.ok) throw Error(response.statusText);

				const data = await response.json();
        if (data.following){
          setFollowStatus(true);
        } else if (!data.following){
          setFollowStatus(false);
        }
			} catch (error) {
				handleAjaxError(error);
			};
		};

    checkFollowStatus(userId);
  }, []);

  const Follow = async (user) => {
    try {
      const response = await window.fetch(`/api/relationships`, {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

    } catch (error) {
      handleAjaxError(error);
    }
  };

  const unFollow = async (id) => {
    try {
      const response = await window.fetch(`/api/relationships/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw Error(response.statusText);

    } catch (error) {
      handleAjaxError(error);
    }
  };

  const toggleFollowStatus = () => {
    if ( followStatus ){
      unFollow(userId);
      setFollowStatus(false);
      if(location.pathname !== '/users/'){
        setFollowerCount((prevCount) => prevCount - 1);
      }
    } else {
      Follow(user);
      setFollowStatus(true);
      if(location.pathname !== '/users/'){
        setFollowerCount((prevCount) => prevCount + 1);
      }
    }
  };

  return (
    <div className="user__follow_form follow_form">
      {followStatus ? (
        <div onClick={toggleFollowStatus}>
          <span className="profileCard__unfollow-btn btn">フォロー中</span>
        </div>
      ) : (
        <div onClick={toggleFollowStatus}>
          <span className="profileCard__follow-btn btn">フォロー</span>
        </div>
      )}
    </div>
  );
};

export default FollowForm;