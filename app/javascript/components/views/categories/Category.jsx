import React, {useState, useEffect} from 'react'
import { HeadBlock } from '../../HeadBlock';
import { useParams } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import { RecipesFormat } from '../recipes/RecipesFormat';

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await window.fetch(`/api/categories/${id}`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setCategory(data.category);
        setRecipes(data.recipes);
      } catch (error) {
        handleAjaxError(error);
      }
    };
    fetchCategory();
  }, [])

  return (
    <>
      <HeadBlock title={category.name}/>
      <RecipesFormat sectionTitle={`「${category.name}」に関するレシピ一覧`} recipes={recipes}/>
    </>
  )
}

export default Category;
