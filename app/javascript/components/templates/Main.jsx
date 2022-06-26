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

const Main = ({setCurrentUser, setLoggedInStatus, loggedInStatus, currentUser}) => {

  return (
    <main className='main'>
			<Routes>
				<Route path={`/`} element={<Home />} />
				<Route path={`/users/new/`} element={<Signup setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>}/>
				<Route path={`/login/`} element={<Login setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>}/>
				<Route path={`/users/:id/`} element={<User />} />
				<Route path={`/users/:id/edit`} element={<EditUser setCurrentUser={setCurrentUser} currentUser={currentUser} />} />

				<Route path={`/users/`} element={<UserList currentUser={currentUser} loggedInStatus={loggedInStatus} />}/>
				<Route path={`/users/:id/following`} element={<FollowList/>}/>
				<Route path={`/users/:id/followers`} element={<FollowList/>}/>
				<Route path={`/users/:id/favorite_recipes`} element={<FavoriteList/>}/>
				<Route path={`/password_resets/new`} element={<PasswordResetForm/>} />
				<Route path={`/password_resets/:token/edit`} element={<EditPassword setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>} />
				<Route path={`/account_activations/:token/edit`} element={<AccountActivation setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>} />
				<Route path={`/recipes/`} element={<RecipesList/>}/>
				<Route path={`/recipes/:id`} element={<Recipe/>} />
				<Route path={`/recipes/new`} element={<NewRecipe/>} />
				<Route path={`/recipes/:id/edit`} element={<EditRecipe currentUser={currentUser}/>}/>

				<Route path="*" element={<NotFound/>}/>
			</Routes>
		</main>
  );
};

export default Main;