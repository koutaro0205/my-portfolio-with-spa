import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../App';
import { handleAjaxError } from '../../parts/helpers';
import { warn, success } from '../../parts/notifications';
import { useNavigate, useParams } from 'react-router-dom';
import { HeadBlock } from '../../HeadBlock';
import { QuestionForm } from './QuestionForm';
import { useQuestion } from './useQuestion';
import { isCurrntUser, isEmptyObject } from '../../parts/helpers';
import Auth from '../../providers/Auth';

const EditQuestion = () => {
  const { id } = useParams();
  const { questions, setQuestions } = useQuestion();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    const getQuestion = async (questionId) => {
      try {
        const response = await window.fetch(`/api/questions/${questionId}/edit`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        if (data.status === 'forbidden'){
          warn(data.message);
          navigate(`/questions`);
        } else {
          setUser(data.user);
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };

    getQuestion(id);
  }, []);

  const updateQuestion = async (updatedQuestion) => {
    try {
      const response = await window.fetch(
        `/api/questions/${updatedQuestion.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedQuestion),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const updatedQuestionData = await response.json();
      if (updatedQuestionData.status === 'ok'){
        const newQuestions = questions;
        const idx = newQuestions.findIndex((question) => question.id === updatedQuestion.id);
        newQuestions[idx] = updatedQuestion;
        setQuestions(newQuestions);
        success(updatedQuestionData.message);
        navigate(`/questions/${updatedQuestion.id}`);
      } else {
        warn(updatedQuestionData.errors);
        navigate(`/`);
      };
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const RemoveQuestion = async (questionId) => {
    const sure = window.confirm('本当に削除しますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/questions/${questionId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw Error(response.statusText);
        const removeQuestionStatus = await response.json();
        if (removeQuestionStatus.status === "ok"){
          success("質問を削除しました");
          navigate('/questions');
        } else {
          warn("投稿の削除に失敗しました");
        }

      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleRemoveQuestion = (questionId) =>{
    RemoveQuestion(questionId);
  }

  return (
    <>
      <HeadBlock title={"質問を編集"}/>
      <section className="section content-width">
        <div className="form__inner-newPage">
          <h1 className="sectionTitle">質問を編集する</h1>
          <QuestionForm questions={questions} onSave={updateQuestion}/>
          {!isEmptyObject(currentUser) && isCurrntUser(user, currentUser) && (
            <div className="form__btn__wrap delete-wrap">
              <span className='btn question-btn delete-btn' onClick={() => handleRemoveQuestion(id)}>質問を削除する</span>
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default EditQuestion;
