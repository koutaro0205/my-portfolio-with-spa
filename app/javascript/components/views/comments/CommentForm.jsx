import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const CommentForm = ({Id, saveComment}) => {
  const location = useLocation();
  const id = location.pathname === `/recipes/${Id}/` ? {recipe_id: Id} : {question_id: Id};
  const [comment, setComment] = useState({
    content: '',
    ...id,
  });

  const [formErrors, setFormErrors] = useState([]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setComment({ ...comment, [name]: value });
  };

  const validateComment = () => {
    const errors = [];

    if (comment.content === '') {
      errors.push('コメントを入力してください');
    }

    if (comment.content.length > 140) {
      errors.push('コメントを140文字以内で入力してください');
    }

    return errors;
  };

  const isEmptyArray = (array) => array.length === 0;

  const renderErrors = () => {
    if (isEmptyArray(formErrors)) {
      return null;
    }

    return (
      <div className="error_explanation">
        <div className="alert alert-danger">
          {formErrors.length}つの入力内容が正しくありません。
        </div>
        <ul className="error_messages">
          {formErrors.map((formError) => (
            <li key={formError} className="message">{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateComment(comment);

    if (!isEmptyArray(errors)) {
      setFormErrors(errors);
    } else {
      saveComment(comment);
    }
  };

  return(
    <form className="form" onSubmit={handleSubmit}>
      {renderErrors()}
      <label htmlFor="content" className="form__label">コメント</label>
      <textarea
      type="text"
      id="content"
      name="content"
      className="form__field form__textarea"
      placeholder="コメントを入力"
      onChange={handleInputChange}
      />
      <input type="submit" value={"コメントを投稿する"} className="form__btn btn" />
    </form>
  );
};

export default CommentForm;