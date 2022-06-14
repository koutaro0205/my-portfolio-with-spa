import React from 'react';
import Home from "../views/Home";
import Signup from '../views/users/Signup';
import { Routes, Route } from 'react-router-dom';
import UserList from '../views/users/UsersList';
import User from '../views/users/User';
import EditUser from '../views/users/EditUser';
import Login from '../views/users/Login';

const Main = ({setCurrentUser, setLoggedInStatus, currentUser}) => {
  return (
    <main className='main'>
			<Routes>
				<Route path={`/`} element={<Home />} />
				<Route path={`/users/new/`} element={<Signup setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>}/>
				<Route path={`/login/`} element={<Login setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus}/>}/>
				<Route path={`/users/`} element={<UserList />} />
				<Route path={`/users/:id/`} element={<User />} />
				<Route path={`/users/:id/edit`} element={<EditUser setCurrentUser={setCurrentUser} currentUser={currentUser}/>} />
			</Routes>
		</main>
  );
};

export default Main;