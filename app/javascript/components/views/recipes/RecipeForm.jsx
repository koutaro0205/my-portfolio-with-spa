import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

const RecipeForm = ({onSave, recipes}) => {
  const { id } = useParams();
  const initialRecipeState = useCallback(
    () => {
      const defaults = {
        title: '',
        ingredient: '',
        body: '',
        duration: 0,
        cost: 0,
      };
  
      const currRecipe = id ?
        recipes.find((e) => e.id === Number(id)) :
        {};
  
      return { ...defaults, ...currRecipe }
    },
    [recipes, id]
  );
  const [recipe, setRecipe] = useState(initialRecipeState);

  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    setRecipe(initialRecipeState);
  }, [recipes]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setRecipe({ ...recipe, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]){
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setRecipe({
          ...recipe,
          image: {
            data: reader.result,
            filename: file ? file.name : "unknownfile"
          },
        });
      }
      reader.readAsDataURL(file);
    }
  }

  const validateRecipe = () => {
    const errors = [];

    if (recipe.title === '') {
      errors.push('レシピタイトルを入力してください');
    }

    if (recipe.ingredient === '') {
      errors.push("材料を入力してください");
    }

    if (recipe.duration === 0) {
      errors.push("所要時間(分)を入力してください");
    }

    if (recipe.cost === 0) {
      errors.push("値段(円)を入力してください");
    }

    return errors;
  };

  const isEmptyArray = (array) => array.length === 0;

  const renderErrors = () => {
    if (isEmptyArray(formErrors)) {
      return null;
    }

    return (
      <div className="error_explanation">
        <div className="alert alert-danger">
          {formErrors.length}つの入力内容が正しくありません。
        </div>
        <ul className="error_messages">
          {formErrors.map((formError) => (
            <li key={formError} className="message">{formError}</li>
          ))}
        </ul>
      </div>
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateRecipe(recipe);

    if (!isEmptyArray(errors)) {
      setFormErrors(errors);
    } else {
      onSave(recipe);
    }
  };

  return (
    <>
      <form className="form" onSubmit={handleSubmit}>
        {renderErrors()}

        <label className="form__label" htmlFor="title">レシピタイトル</label><span className="required">必須</span>
        <input
          className="form__field"
          type="text"
          id="title"
          name="title"
          placeholder='レシピタイトルを入力'
          onChange={handleInputChange}
          value={recipe.title}
        />

        <label className="form__label" htmlFor="ingredient">材料</label><span className="required">必須</span>
        <textarea
          className="form__field form__textarea"
          type="text"
          id="ingredient"
          name="ingredient"
          placeholder='レシピに用いる具材や調味料を入力'
          onChange={handleInputChange}
          value={recipe.ingredient}
        />

        <label className="form__label" htmlFor="body">作り方・説明</label>
        <textarea
          className="form__field form__textarea"
          type="text"
          id="body"
          name="body"
          placeholder='作り方やレシピについての説明を入力（※任意）'
          onChange={handleInputChange}
          value={recipe.body}
        />

        <div className="form__layout">
          <div className="form__layout-item">
            <label className="form__label-short" htmlFor="duration">所要時間(分)</label>
            <span className="required">必須</span>
            <input
              className="form__field-short"
              type="number"
              id="duration"
              name="duration"
              onChange={handleInputChange}
              value={recipe.duration}
            />
          </div>
          <div className="form__layout-item">
            <label className="form__label-short" htmlFor="cost">値段(円)</label>
            <span className="required">必須</span>
            <input
              className="form__field-short"
              type="number"
              id="cost"
              name="cost"
              onChange={handleInputChange}
              value={recipe.cost}
            />
          </div>
          <div className="form__layout-item">
            <label className="form__label-short" htmlFor="tag">ズボラポイント</label>
            <select name="tag" id="tag" className="form__field-short">
              <option value="short_time">時短レシピ</option>
              <option value="low_cost">格安レシピ</option>
            </select>
          </div>
        </div>
    
        <div className="form__layout">
          <div className="form__layout-item">
            <label className='form__label form__label-image' htmlFor="image">イメージ画像</label>
            <input
              className='image__field'
              type="file"
              name="image"
              id="image"
              accept="image/*,.png,.jpg,.jpeg,.gif"
              onChange={handleFileChange}
            />
          </div>
          <div className="form__layout-item">
            <label className='form__label' htmlFor="category_id">カテゴリーを選択</label>
            <select name="category_id" id="category_id" className="form__field">
              <option value="o1">オプション1</option>
              <option value="o2">オプション2</option>
              <option value="o3">オプション3</option>
              <option value="o4">オプション4</option>
              <option value="o5">オプション5</option>
            </select>
          </div>
        </div>

        <input type="submit" value={id ? "レシピを更新" : "レシピを投稿"} className="form__btn btn" />
      </form>
    </>
  );
};

export default RecipeForm;

RecipeForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      ingredient: PropTypes.string.isRequired,
      body: PropTypes.string.isRequired,
      duration: PropTypes.number.isRequired,
      cost: PropTypes.number.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

RecipeForm.defaultProps = {
  recipes: [],
};