import React, { useState } from 'react';
import { HeadBlock } from "../../HeadBlock";
import { useQuestion } from './useQuestion';
import { Link } from 'react-router-dom';
import PartialQuestions from './PartialQuestions';
import { SearchForm } from './SearchForm';
import { handleAjaxError } from '../../parts/helpers';
import Pagination from '../../parts/Pagination';

const QuestionsList = () => {
  const { questions } = useQuestion();
  const [searchedQuestions, setSearchedQuestions] = useState([]);
	const [ keyword, setKeyword ] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const currentSearchedQuestions = searchedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  const searchQuestion = async (keyword) => {
    try {
      const response = await window.fetch(`/api/questions/search/?keyword=${keyword}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);
			const data = await response.json();
			setKeyword(data.keyword);
			setSearchedQuestions(data.questions);
    } catch (error) {
      handleAjaxError(error);
    };
  };

  const handleClick = () => {
    setKeyword('');
  }

  const renderQuestions = (questionArray) => {
    return questionArray.length === 0 ? (
      <p className="nothing">
        {keyword ? `「${keyword}」に関する質問は見つかりませんでした` : "現在投稿されている質問はありません"}
      </p>
    ) : (
      <PartialQuestions questions={questionArray}/>
    )
  }

  return (
    <>
      <HeadBlock title={"質問一覧"}/>
      <section className="section content-width questions-page">
        <h1 className="sectionTitle">
          {keyword ? `「${keyword}」に関する質問一覧` : "みんなの質問一覧"}
          <div className="questions__new">
            <Link className='questions__new-link' to="/questions/new">質問してみる</Link>
          </div>
        </h1>
        <div className="questions">
          <div className="questions__search">
            <SearchForm searchQuestion={searchQuestion}/>
          </div>
          <ul className="questions__list">
            {keyword ? renderQuestions(currentSearchedQuestions) : renderQuestions(currentQuestions)}
          </ul>
          {keyword && (
            <div className='form__btn__wrap search'>
              <span className='form__btn btn question-btn' onClick={handleClick}>質問一覧へ戻る</span>
            </div>
          )}
          <Pagination
            postsPerPage={questionsPerPage}
            totalPosts={keyword ? searchedQuestions.length : questions.length}
            paginate={paginate}
          />
        </div>
      </section>
    </>
  );
};

export default QuestionsList;
