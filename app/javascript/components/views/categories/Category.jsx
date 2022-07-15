import React, {useState, useEffect} from 'react'
import { HeadBlock } from '../../HeadBlock';
import { useParams } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import { RecipesFormat } from '../recipes/RecipesFormat';

const Category = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState({});
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const response = await window.fetch(`/api/categories/${id}`);
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setIsLoading(false);
        setCategory(data.category);
        setRecipes(data.recipes);
      } catch (error) {
        handleAjaxError(error);
        setIsLoading(false);
      }
    };
    fetchCategory();
  }, [])

  return (
    <>
      <HeadBlock title={category.name}/>
      {isLoading ? (
        <div className="loading-image">
          <img src="/assets/loading.gif" alt="" className='image'/>
        </div>
      ) : (
        <RecipesFormat sectionTitle={`「${category.name}」に関するレシピ一覧`} recipes={recipes}/>
      )}
    </>
  )
}

export default Category;
