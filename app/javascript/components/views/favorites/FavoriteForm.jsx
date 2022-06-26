import React, { useState, useEffect } from "react";
import { handleAjaxError } from "../../parts/helpers";
import { useLocation } from "react-router-dom";

const FavoriteForm = ({recipe, recipeId}) => {
  const [favoriteStatus, setFavoriteStatus] = useState(false);
  const location = useLocation();

  useEffect(() => {
		const checkFavoriteStatus = async (id) => {
			try {
				const response = await window.fetch(`/api/favorite_status/${id}`);
				if (!response.ok) throw Error(response.statusText);

				const data = await response.json();
        console.log(data);
        if (data.favorite){
          setFavoriteStatus(true);
        } else if (!data.following){
          setFavoriteStatus(false);
        }
			} catch (error) {
				handleAjaxError(error);
			};
		};

    checkFavoriteStatus(recipeId);
  }, []);

  const Favorite = async (user) => {
    try {
      const response = await window.fetch(`/api/favorites`, {
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

  const unFavorite = async (id) => {
    try {
      const response = await window.fetch(`/api/favorites/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw Error(response.statusText);

    } catch (error) {
      handleAjaxError(error);
    }
  };

  const toggleFavoriteStatus = () => {
    if ( favoriteStatus ){
      unFavorite(recipeId);
      setFavoriteStatus(false);
    } else {
      Favorite(recipe);
      setFavoriteStatus(true);
    }
  };

  return (
    <div className="recipe__favorite">
      {favoriteStatus ? (
        <div onClick={toggleFavoriteStatus}>
          <div className="recipe__favorite-layout">
          <span>お気に入り解除</span>
            <img src={'/assets/favorite.svg'} alt="" />
          </div>
        </div>
      ) : (
        <div onClick={toggleFavoriteStatus}>
          <div className="recipe__favorite-layout">
            <span>お気に入り登録</span>
            <img src={'/assets/unfavorite.svg'} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default FavoriteForm;