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

const Main = ({setCurrentUser, setLoggedInStatus, currentUser}) => {

  return (
    <main className='main'>
			<Routes>
				<Route path={`/`} element={<Home />} />
				<Route path={`/users/new/`} element={<Signup setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>}/>
				<Route path={`/login/`} element={<Login setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>}/>
				<Route path={`/users/:id/`} element={<User />} />
				<Route path={`/users/:id/edit`} element={<EditUser setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />

				<Route path={`/users/`} element={<UserList />}/>
				<Route path={`/password_resets/new`} element={<PasswordResetForm/>} />
				<Route path={`/password_resets/:token/edit`} element={<EditPassword setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>} />
			</Routes>
		</main>
  );
};

export default Main;