import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HeadBlock } from "../../HeadBlock";
import { handleAjaxError } from '../../parts/helpers';
import { QuestionForm } from './QuestionForm';
import { useQuestion } from './useQuestion';
import { success } from '../../parts/notifications';

const NewQuestion = () => {
  const { questions, setQuestions } = useQuestion();
  const navigate = useNavigate();

  const addQuestion = async (newQuestion) => {
    try {
      const response = await window.fetch('/api/questions', {
        method: 'POST',
        body: JSON.stringify(newQuestion),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);
      const newQuestionData = await response.json();
      if (newQuestionData.status === "created"){
        const savedQuestion = newQuestionData.question;
        const newQuestions = [...questions, savedQuestion];
        setQuestions(newQuestions);
        success("質問を投稿しました！");
        navigate(`/questions`);
      } else {
        warn("質問の投稿に失敗しました");
        navigate(`/`);
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <HeadBlock title={"質問を投稿"}/>
      <section className="section content-width">
        <div className="form__inner-newPage">
          <h1 className="sectionTitle">質問を投稿する</h1>
          <QuestionForm questions={questions} onSave={addQuestion}/>
        </div>
      </section>
    </>
  );
};

export default NewQuestion;
