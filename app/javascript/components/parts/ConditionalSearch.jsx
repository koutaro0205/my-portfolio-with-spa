import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isEmptyObject, isEmptyArray } from './helpers';

export const ConditionalSearch = () => {
  const [query, setQuery] = useState({});
  const [conditionalRecipes, setConditionalRecipes] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setQuery({ ...query, [name]: value });
  };

  const getSearchResult = async (q) => {
    try {
      const response = await window.fetch(`/api/recipes/conditional_search/?cost=${q.cost}&duration=${q.duration}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);
      const data = await response.json();
      setConditionalRecipes(data.recipes);
      if(isEmptyArray(data.recipes)){
        setMessage('条件に一致するレシピが見つかりません');
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  useEffect(() => {
    if (conditionalRecipes.length !== 0){
      navigate('/conditional_search', {state: {recipes: conditionalRecipes}});
    }
  }, [conditionalRecipes]);

  const renderMessage = () => {
    return (
      <p className='not-found'>{message}</p>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isEmptyObject(query)){
      getSearchResult(query);
    }
  };

  return (
    <>
      <h2 className="subTitle">条件を絞って検索</h2>
      <form onSubmit={handleSubmit}>
        {message && renderMessage()}
        <label className="form__label" htmlFor="cost">コストで絞り込む</label>
        <div className="radio__wrap">
          <input
            className="form__radio"
            type="radio"
            id="cost"
            name="cost"
            onChange={handleInputChange}
            value={100}
          />
          <span className="form__radio-text">100円以内</span>
        </div>
        <div className="radio__wrap">
          <input
            className="form__radio"
            type="radio"
            id="cost"
            name="cost"
            onChange={handleInputChange}
            value={500}
          />
          <span className="form__radio-text">500円以内</span>
        </div>
        <div className="radio__wrap">
          <input
            className="form__radio"
            type="radio"
            id="cost"
            name="cost"
            onChange={handleInputChange}
            value={1000}
          />
          <span className="form__radio-text">1000円以内</span>
        </div>

        <label className="form__label" htmlFor="duration">調理時間で絞り込む</label>
        <div className="radio__wrap">
          <input
            className="form__radio"
            type="radio"
            id="duration"
            name="duration"
            onChange={handleInputChange}
            value={10}
          />
          <span className="form__radio-text">10分以内</span>
        </div>
        <div className="radio__wrap">
          <input
            className="form__radio"
            type="radio"
            id="duration"
            name="duration"
            onChange={handleInputChange}
            value={20}
          />
          <span className="form__radio-text">20分以内</span>
        </div>
        <div className="radio__wrap">
          <input
            className="form__radio"
            type="radio"
            id="duration"
            name="duration"
            onChange={handleInputChange}
            value={30}
          />
          <span className="form__radio-text">30分以内</span>
        </div>
        <input type="submit" value={"検索"} className="sidebar__btn btn" />
      </form>
    </>
  );
};

