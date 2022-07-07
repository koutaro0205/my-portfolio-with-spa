import React, { useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { isEmptyArray } from '../../parts/helpers';
import PropTypes from 'prop-types';

export const CategoryForm = ({onSave, categories}) => {
  const { id } = useParams();
  const initialCategoryState = useCallback(
    () => {
      const defaults = {
        name: '',
      };
      const currCategory = id ?
        categories.find((e) => e.id === Number(id)) :
        {};
      return { ...defaults, ...currCategory }
    },
    [categories, id]
  );

  const [formErrors, setFormErrors] = useState([]);
  const [category, setCategory] = useState(initialCategoryState);

  useEffect(() => {
    setCategory(initialCategoryState);
  }, [categories]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setCategory({ ...category, [name]: value });
  };

  const validateCategory = () => {
    const errors = [];

    if (category.name === '') {
      errors.push('名前を入力してください');
    }

    return errors;
  };

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
    const errors = validateCategory(category);

    if (!isEmptyArray(errors)) {
      setFormErrors(errors);
    } else {
      onSave(category);
    }
  };


  return (
    <form className="form" onSubmit={handleSubmit}>
      {renderErrors()}
      <label className="form__label" htmlFor="name">名前</label>
      <input
        className="form__field"
        type="text"
        id="name"
        name="name"
        onChange={handleInputChange}
        value={category.name}
      />
      <input type="submit" value={!id ? "カテゴリを追加する" : "カテゴリーを更新する"} className="form__btn btn" />
    </form>
  );
};

CategoryForm.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

CategoryForm.defaultProps = {
  categories: [],
};
