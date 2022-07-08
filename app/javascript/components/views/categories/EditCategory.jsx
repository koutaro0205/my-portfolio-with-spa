import React, { useState, useEffect } from 'react';
import { HeadBlock } from '../../HeadBlock';
import { useParams, useNavigate } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import { useCategories } from './useCategories';
import { success, warn } from '../../parts/notifications';
import { CategoryForm } from './CategoryForm';

const EditCategory = () => {
  const navigate = useNavigate();
  const { categories, setCategories } = useCategories();
  const { id } = useParams();
  const [cat, setCat] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await window.fetch(`/api/categories/${id}/edit`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        if(data.admin === false){
          navigate('/')
          warn('権限がありません');
        } else {
          setCat(data.category);
        }

      } catch (error) {
        handleAjaxError(error);
      }
    };
    fetchCategory();
  }, []);

  const updateCategory = async (updatedCategory) => {
    try {
      const response = await window.fetch(
        `/api/categories/${updatedCategory.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(updatedCategory),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (!response.ok) throw Error(response.statusText);

      const updatedCategoryInfo = await response.json();

      if (updatedCategoryInfo.status === 'ok'){
        const newCategories = categories;
        const idx = newCategories.findIndex((category) => category.id === updatedCategory.id);
        newCategories[idx] = updatedCategory;
        setCategories(newCategories);
        success('カテゴリ内容が更新されました！');
        navigate(`/categories`);
      } else {
        warn('カテゴリの更新に失敗しました');
        navigate(`/categories`);
      };
    } catch (error) {
      handleAjaxError(error);
    }
  };

  return (
    <>
      <HeadBlock title={"カテゴリを編集(管理者)"}/>
      <section className="section content-width">
        <h1 className="sectionTitle">カテゴリを編集する</h1>
        <div className="add-categories">
          <div className="add-categories__form">
            <CategoryForm categories={categories} onSave={updateCategory}/>
          </div>
          <ul className="add-categories__list">
            <h2 className="subTitle">対象のカテゴリ</h2>
            <li className="add-categories__item">
              <h3 className="add-categories__name">{cat.name}</h3>
            </li>
          </ul>
        </div>
      </section>
    </>
  )
}

export default EditCategory;
