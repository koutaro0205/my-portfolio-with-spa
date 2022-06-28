import React, { useState } from "react";

export const SearchForm = ({searchRecipe}) => {
  const [keyword, setKeyword] = useState('');

  const handleInputChange = (e) => {
    const { target } = e;
    const value = target.value;

    setKeyword(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchRecipe(keyword);
  };

  return (
    <>
      <form className="header__search-form" onSubmit={handleSubmit}>
        <input
        type="text"
        name="keyword"
        className="header__search-field"
        placeholder="キーワードを入力"
        onChange={handleInputChange}
        />
        <input type="submit" className="header__search-submit btn" />
        <p className="header__search-text">検索したいキーワードを入力してください。</p>
      </form>
    </>
  );
};