import React, {useState, useEffect} from "react";
import { handleAjaxError } from "../../parts/helpers";
import { useNavigate } from "react-router-dom";
import { success } from "../../parts/notifications";
import CommentFormat from "../comments/CommentFormat";

const NewQuestionComment = ({questionId, setQuestionCommentCount}) => {
  const [questionComments, setQuestionComments] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchQuestionComments = async(questionId) => {
      try{
        const response = await window.fetch(`/api/questions/${questionId}/question_comments`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setQuestionComments(data.question_comments);
      } catch (error) {
        handleAjaxError(error);
      };
    };
    fetchQuestionComments(questionId);
  }, []);

  const addQuestionComment = async (newComment) => {
    try {
      const response = await window.fetch(`/api/questions/${questionId}/question_comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);
      const newData = await response.json();
      const savedComment = newData.question_comment;
      const newComments = [...questionComments, savedComment];
      setQuestionComments(newComments);
      setQuestionCommentCount((prevCount) => prevCount + 1);
      success(newData.message);
      navigate(`/questions/${questionId}`);
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const removeQuestionComment = async (questionCommentId) => {
    const sure = window.confirm('コメントを削除しますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/questions/${questionId}/question_comments/${questionCommentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw Error(response.statusText);
        const removeData = await response.json();
        if (removeData.status === "ok"){
          const newComments = [...questionComments];
          const idx = newComments.findIndex((comment) => comment.id === questionCommentId);
          newComments.splice(idx, 1);
          success(removeData.message);
          setQuestionComments(newComments);
          setQuestionCommentCount((prevCount) => prevCount - 1);
        } else {
          warn(removeData.message);
        }
      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleClick = (commentId) =>{
    removeQuestionComment(commentId);
  }
  return (
    <div>
      <CommentFormat
        handleClick={handleClick}
        saveComment={addQuestionComment}
        comments={questionComments}
        Id={questionId}
      />
    </div>
  )
}

export default NewQuestionComment;
