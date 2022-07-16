import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { isEmptyArray, isEmptyObject } from '../../parts/helpers';

const UserForm = ({onSave, users, setIsLoading, isLoading}) => {
  const { id } = useParams();
  const defaults = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };
  const currUser = id? users.find((e) => e.id === Number(id)) : {};
  const initialUserState = { ...defaults, ...currUser };
  const [user, setUser] = useState(initialUserState);

  const [formErrors, setFormErrors] = useState([]);

  useEffect(() => {
    setUser(initialUserState);
  }, [users]);

  const handleInputChange = (e) => {
    const { target } = e;
    const { name } = target;
    const value = target.value;

    setUser({ ...user, [name]: value });
  };

  const handleFileChange = (e) => {
    if (e.target.files[0]){
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = () => {
        setUser({
          ...user,
          image: {
            data: reader.result,
            filename: file ? file.name : "unknownfile"
          },
        });
      }
      reader.readAsDataURL(file);
    }
  }

  const validateUser = () => {
    const errors = [];
    const regex = new RegExp(/\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i);
    const existedUser = users.find((e) => e.email === user.email);

    if (user.name === '') {
      errors.push('名前を入力してください');
    }

    if (user.email === '') {
      errors.push("メールアドレスを入力してください");
    }

    if (existedUser !== undefined && isEmptyObject(currUser)){
      if (user.email === existedUser.email) {
        errors.push("入力されたメールアドレスは既に使われています");
      }
    }

    if (regex.test(user.email)) {
      errors.push("メールアドレスに不正な値が含まれています");
    }

    if(!id){
      if (user.password === '' || user.password_confirmation === ''){
        errors.push('パスワードを入力してください');
      }

      if (user.password.length < 6 || user.password_confirmation.length < 6) {
        errors.push('パスワードを6文字以上で入力してください');
      }
    }

    if (user.password_confirmation !== user.password) {
      errors.push("入力されたパスワードが一致しません");
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
    const errors = validateUser(user);

    if (!isEmptyArray(errors)) {
      setFormErrors(errors);
    } else {
      onSave(user);
      setIsLoading(true);
    }
  };

  return (
    <>
      {isLoading ? (
        <>
          {id ? (
            <p className='loading'>ユーザー情報を更新中です。今しばらくお待ちください。</p>
          ) : (
            <p className='loading'>メールを送信中です。今しばらくお待ちください。</p>
          )}
          <div className="loading-image">
            <img src="/assets/loading.gif" alt="" />
          </div>
        </>
        ) : (
          <form className="form" onSubmit={handleSubmit}>
          {renderErrors()}

          <label className="form__label" htmlFor="name">名前</label>
          <input
            className="form__field"
            type="text"
            id="name"
            name="name"
            onChange={handleInputChange}
            value={user.name}
          />

          <label className="form__label" htmlFor="email">メールアドレス</label>
          <input
            className="form__field"
            type="email"
            id="email"
            name="email"
            onChange={handleInputChange}
            value={user.email}
          />

          <label className="form__label" htmlFor="password">パスワード{id ? "(再入力)" : null}</label>
          <input
            className="form__field"
            type="password"
            id="password"
            name="password"
            onChange={handleInputChange}
          />

          <label className="form__label" htmlFor="password_confirmation">パスワード確認{id ? "(再入力)" : null}</label>
          <input
            className="form__field"
            type="password"
            id="password_confirmation"
            name="password_confirmation"
            onChange={handleInputChange}
          />

          <label className='form__label form__label-image' htmlFor="image">イメージ画像</label>
          <input
            className='image__field'
            type="file"
            name="image"
            id="image"
            accept="image/*,.png,.jpg,.jpeg,.gif"
            onChange={handleFileChange}
          />

          <input type="submit" value={id ? "登録情報更新" : "ユーザー登録"} className="form__btn btn" />
        </form>
        )
      }
    </>
  );
};

export default UserForm;

UserForm.propTypes = {
  users: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    })
  ),
  onSave: PropTypes.func.isRequired,
};

UserForm.defaultProps = {
  users: [],
};
