import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from '../../App';
import { useParams, Link } from 'react-router-dom';
import { HeadBlock } from '../../HeadBlock';
import { defaultImage, handleAjaxError } from '../../parts/helpers';
import NewQuestionComment from './NewQuestionComment';
import InterestForm from '../interests/InterestForm';
import { timeStamp, isCurrntUser } from '../../parts/helpers';

const Question = () => {
  const { id } = useParams();
  const currentUser = useContext(CurrentUserContext);
  const [question, setQuestion] = useState({});
  const [user, setUser] = useState({});
  const [questionCommentCount, setQuestionCommentCount] = useState();
  const [interestCount, setInterestCount] = useState();

  useEffect(() => {
    const getQuestion = async (questionId) => {
      try {
        const response = await window.fetch(`/api/questions/${questionId}`);
        if (!response.ok) throw Error(response.statusText);
        const questionData = await response.json();
        setQuestion(questionData.question);
        setUser(questionData.user);
        setQuestionCommentCount(questionData.question_comment_count);
        setInterestCount(questionData.question.interests.length);
      } catch (error) {
				handleAjaxError(error);
			};
    };
    getQuestion(id);

  }, []);

  return (
    <>
      <HeadBlock title={"質問詳細"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">質問詳細</h1>
        <div className="question">
          <div className="question__user-info">
            <div className="question__user-image">
              <Link className="question__user-link" to={`/users/${user.id}`}>
                <img src={user.image_url ? user.image_url : defaultImage()} alt="アバター画像" className='image'/>
              </Link>
              <p className="question__user-name">{user.name}</p>
            </div>
          </div>
          <div className="question__content">
            <h2 className="question__title">{question.title}</h2>
            <p className="question__body">{question.content}</p>
            <div className="question__info">
              <span className="">コメント数: {questionCommentCount}</span>
              <span className="question__timestamp">{timeStamp(question)} 投稿</span>
            </div>
            {currentUser.id && (
              <div className="question__interest">
                <InterestForm
                  questionId={id}
                  question={question}
                  setInterestCount={setInterestCount}
                />
                <span className="question__interest-count">{interestCount}</span>
              </div>
            )}
            {isCurrntUser(user, currentUser) && (
              <Link className='question__edit-btn' to={`/questions/${id}/edit`}>編集</Link>
            )}
          </div>
        </div>
      </section>
      <NewQuestionComment questionId={id} setQuestionCommentCount={setQuestionCommentCount}/>
    </>
  );
};

export default Question;
