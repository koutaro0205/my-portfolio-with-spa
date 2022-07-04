import React, { useCallback, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const QuestionForm = ({questions, onSave}) => {
  const { id } = useParams();
  const initialQuestionState = useCallback(
    () => {
      const defaults = {
        title: '',
        content: '',
      };
      const currentQuestion = id ?
        questions.find((e) => e.id === Number(id)) :
        {};
      return { ...defaults, ...currentQuestion }
    },
    [questions, id]
  );
  const [ question, setQuestion ] = useState(initialQuestionState);
  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    setQuestion(initialQuestionState);
  }, [questions]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setQuestion({ ...question, [name]: value });
  };

  const validateQuestion = () => {
    const errors = [];

    if (question.title === '') {
      errors.push('質問のタイトルを入力してください');
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
    const errors = validateQuestion(question);
    if (!isEmptyArray(errors)) {
      setFormErrors(errors);
    } else {
      onSave(question);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      {renderErrors()}
      <label className="form__label" htmlFor="title">質問タイトル</label>
      <span className="required">必須</span>
      <input
        className="form__field"
        type="text"
        id="title"
        name="title"
        placeholder='質問タイトルを入力'
        onChange={handleInputChange}
        value={question.title}
      />

      <label className="form__label" htmlFor="content">質問内容</label>
      <textarea
        className="form__field form__textarea"
        type="text"
        id="content"
        name="content"
        placeholder='質問内容を入力'
        onChange={handleInputChange}
        value={question.content}
      />
      <div className="form__btn__wrap">
        <input type="submit" value={id ? "質問内容を更新する" : "質問を投稿する"} className="form__btn btn question-btn" />
      </div>
    </form>
  );
}
