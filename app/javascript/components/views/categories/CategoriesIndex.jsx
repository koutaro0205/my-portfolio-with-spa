import React from 'react';
import { HeadBlock } from '../../HeadBlock';
import { Link } from 'react-router-dom';
import { useCategories } from './useCategories';
import { handleAjaxError } from '../../parts/helpers';
import { success, warn } from '../../parts/notifications';
import AuthAdmin from '../../providers/AuthAdmin';
import { CategoryForm } from './CategoryForm';

const CategoriesIndex = () => {
  const { categories, setCategories } = useCategories();

  const addCategory = async (newCat) => {
    try {
      const response = await window.fetch('/api/categories', {
        method: 'POST',
        body: JSON.stringify(newCat),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

      const newCategory = await response.json();
      if(newCategory.admin === false){
        navigate('/')
        warn('権限がありません');
      } else {
        const savedCategory = newCategory.category;
        const newCategories = [...categories, savedCategory];
        setCategories(newCategories);
        success('カテゴリーを追加しました');
      }
    } catch (error) {
      handleAjaxError(error);
    }
  };

  const removeCategory = async (categoryId) => {
    const sure = window.confirm('カテゴリを削除しますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/categories/${categoryId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw Error(response.statusText);
        const removeData = await response.json();
        if (removeData.status === 'ok'){
          const newCategories = [...categories];
          const idx = newCategories.findIndex((category) => category.id === categoryId);
          newCategories.splice(idx, 1);
          success("カテゴリを削除しました");
          setCategories(newCategories);
        } else {
          warn('削除に失敗しました');
        }
      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleClick = (categoryId) =>{
    removeCategory(categoryId);
  }

  return (
    <>
      <HeadBlock title={"カテゴリを追加(管理者)"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">カテゴリを追加する</h1>
        <div className="add-categories">
          <div className="add-categories__form">
            <CategoryForm onSave={addCategory} categories={categories}/>
          </div>
          <ul className="add-categories__list">
            <h2 className="subTitle">カテゴリ一覧</h2>
            {categories.map(category => (
              <li key={category.id} className="add-categories__item">
                <h3 className="add-categories__name">{category.name}</h3>
                <Link to={`/categories/${category.id}/edit`} className='add-categories__edit-btn'>編集</Link>
                <span onClick={() => handleClick(category.id)} className='add-categories__delete-btn'>削除</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default CategoriesIndex;
