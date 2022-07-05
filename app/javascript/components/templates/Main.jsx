import React from 'react';
import Home from "../views/Home";
import Signup from '../views/users/Signup';
import { Routes, Route } from 'react-router-dom';
import UserList from '../views/users/UsersList';
import User from '../views/users/User';
import EditUser from '../views/users/EditUser';
import Login from '../views/users/Login';
import PasswordResetForm from '../views/users/PasswordResetForm';
import EditPassword from '../views/users/EditPassword';
import AccountActivation from '../views/users/AccountActivation';
import Recipe from '../views/recipes/Recipe';
import NewRecipe from '../views/recipes/NewRecipe';
import EditRecipe from '../views/recipes/EditRecipe';
import RecipesList from '../views/recipes/RecipesList';
import NotFound from './NotFound';
import FollowList from '../views/relationships/FollowList';
import FavoriteList from '../views/favorites/FavoriteList';
import Search from '../views/recipes/Search';
import Category from '../views/categories/Category';
import QuestionsList from '../views/questions/QuestionsList';
import NewQuestion from '../views/questions/NewQuestion';
import Question from '../views/questions/Question';
import EditQuestion from '../views/questions/EditQuestion';
import ConditionalSearchResult from '../views/recipes/ConditionalSearchResult';

const Main = () => {

  return (
    <main className='main'>
			<Routes>
				<Route path={`/`} element={<Home />} />
				<Route path={`/users/new/`} element={<Signup/>}/>
				<Route path={`/login/`} element={<Login/>}/>
				<Route path={`/users/:id/`} element={<User />} />
				<Route path={`/users/:id/edit`} element={<EditUser/>} />
				<Route path={`/users/`} element={<UserList/>}/>
				<Route path={`/users/:id/following`} element={<FollowList/>}/>
				<Route path={`/users/:id/followers`} element={<FollowList/>}/>
				<Route path={`/users/:id/favorite_recipes`} element={<FavoriteList/>}/>
				<Route path={`/password_resets/new`} element={<PasswordResetForm/>} />
				<Route path={`/password_resets/:token/edit`} element={<EditPassword/>} />
				<Route path={`/account_activations/:token/edit`} element={<AccountActivation/>} />

				<Route path={`/recipes/`} element={<RecipesList/>}/>
				<Route path={`/recipes/:id`} element={<Recipe/>} />
				<Route path={`/recipes/new`} element={<NewRecipe/>} />
				<Route path={`/recipes/:id/edit`} element={<EditRecipe/>}/>
				<Route path={`/search`} element={<Search/>}/>
				<Route path={`/conditional_search`} element={<ConditionalSearchResult/>}/>

				<Route path={`/categories/:id`} element={<Category/>}/>

				<Route path={`/questions`} element={<QuestionsList/>}/>
				<Route path={`/questions/new`} element={<NewQuestion/>}/>
				<Route path={`/questions/:id`} element={<Question/>}/>
				<Route path={`/questions/:id/edit`} element={<EditQuestion/>}/>

				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</main>
  );
};

export default Main;