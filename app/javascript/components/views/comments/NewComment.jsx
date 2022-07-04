import React, {useState, useEffect} from "react";
import { handleAjaxError } from "../../parts/helpers";
import { useNavigate } from "react-router-dom";
import { success } from "../../parts/notifications";
import CommentFormat from "./CommentFormat";

const NewComments = ({recipeId, questionId}) => {
  const [comments, setComments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
      const fetchComments = async (recipeId) => {
        try {
          const response = await window.fetch(`/api/recipes/${recipeId}/comments`);
          if (!response.ok) throw Error(response.statusText);
          const data = await response.json();
          setComments(data.comments);
        } catch (error) {
          handleAjaxError(error);
        };
      };
      fetchComments(recipeId);
  }, []);

  const addComment = async (newComment) => {
    try {
      const response = await window.fetch(`/api/recipes/${recipeId}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);
      const newData = await response.json();
      const savedComment = newData.comment;
      const newComments = [...comments, savedComment];
      setComments(newComments);
      success(newData.message);
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      handleAjaxError(error);
    }
  }

  const removeComment = async (commentId) => {
    const sure = window.confirm('コメントを削除しますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/recipes/${recipeId}/comments/${commentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw Error(response.statusText);
        const removeData = await response.json();
        if (removeData.status === "ok"){
          success(removeData.message);
          const newComments = [...comments];
          const idx = newComments.findIndex((comment) => comment.id === commentId);
          newComments.splice(idx, 1);
          setComments(newComments);
        } else {
          warn(removeData.message);
        }
      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleClick = (commentId) =>{
    removeComment(commentId);
  }

  return (
    <>
      <CommentFormat
        handleClick={handleClick}
        saveComment={addComment}
        comments={comments}
        Id={recipeId}
      />
    </>
  );
};

export default NewComments;