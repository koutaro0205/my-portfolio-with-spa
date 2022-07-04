import React, {useState, useEffect} from 'react'
import { HeadBlock } from '../../HeadBlock';
import { useParams } from 'react-router-dom';
import { handleAjaxError } from '../../parts/helpers';
import PartialRecipes from '../recipes/PartialRecipes';
import Pagination from '../../parts/Pagination';
import { Link } from 'react-router-dom';

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recipesPerPage] = useState(12);

  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const paginate = pageNumber => setCurrentPage(pageNumber);

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
      <HeadBlock title={""}/>
      <section className="section content-width">
        <h1 className="sectionTitle">「{category.name}」に関するレシピ一覧</h1>
        <ul className="recipes">
          {recipes.length === 0 ? (
            <p>見つかりませんでした</p>
          ) : (
            <PartialRecipes recipes={currentRecipes}/>
          )}
        </ul>
        <Pagination
          recipesPerPage={recipesPerPage}
          totalRecipes={recipes.length}
          paginate={paginate}
        />
        <div className="read-more">
          <Link to={`/recipes`} className='read-more__btn btn'>レシピ一覧へ</Link>
        </div>
      </section>
    </>
  )
}

export default Category;
