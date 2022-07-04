import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import { useCategories } from './useCategories';

const CategoriesList = () => {
  const { categories } = useCategories();

  return (
    <>
      <h2 className="subTitle">カテゴリから探す</h2>
      <ul className="categories">
        {categories.map(category => (
          <li key={category.id} className="categories__item">
            <Link to={`/categories/${category.id}`} className="categories__link">{category.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoriesList;
