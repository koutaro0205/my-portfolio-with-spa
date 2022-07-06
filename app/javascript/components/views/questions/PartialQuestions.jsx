import React from 'react';
import { NavLink } from 'react-router-dom';

const PartialQuestions = ({questions}) => {

  const renderQuestions = (questionArray) => {
    return questionArray.map((question) => (
      <li key={question.id} className="questions__item">
        <div className="questions__number">
          {/* コメント数 */}
          <p className="questions__number-count">{question.question_comments.length}</p>
          <p className="questions__number-label">回答</p>
        </div>
        <div className="questions__number">
           {/* interest数 */}
          <p className="questions__number-count">{question.interests.length}</p>
          <p className="questions__number-label">知りたい</p>
        </div>
        <div className="questions__content">
          <h2 className="questions__title"><NavLink to={`/questions/${question.id}`}>{question.title}</NavLink></h2>
          {/* 90文字以内 */}
          <p className="questions__body">{question.content}</p>

          <div className="questions__user-info">
            <div className="questions__user-image">
              <NavLink to={`/users/${question.user_id}`} className="questions__user-link">
                <img src={question.user.image_url ? question.user.image_url : "/assets/default.jpeg"} alt="" />
              </NavLink>
            </div>
            <p className="questions__user-name"><NavLink to={`/users/${question.user_id}`}>{question.user.name}</NavLink></p>
          </div>
        </div>
      </li>
    ));
  };

  return (
    <div>
      {renderQuestions(questions)}
    </div>
  )
}

export default PartialQuestions
