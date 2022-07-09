import React, { useState } from 'react';

export const SearchForm = ({searchQuestion}) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const value = target.value;

    setKeyword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchQuestion(keyword);
  };

  return (
    <form className="questions__search-form" onSubmit={handleSubmit}>
      <input
      type="text"
      name="keyword"
      className="questions__search-field"
      placeholder="質問のキーワードを入力"
      onChange={handleInputChange}
      />
      <input type="submit" value={"質問検索"} className="questions__search-submit btn" />
    </form>
  );
};
