import React, { useEffect, useState } from 'react';
import Footer from './templates/Footer';
import Header from './templates/Header';
import Main from './templates/Main';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { useSession } from './views/users/useSession';
import { handleAjaxError } from './parts/helpers';

export const CurrentUserContext  = React.createContext();

const App = () => {
	const { loggedInStatus, currentUser, setCurrentUser, setLoggedInStatus, recipesCount, setRecipesCount } = useSession();

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const response = await window.fetch('/api/logged_in');
				if (!response.ok) throw Error(response.statusText);

				const userStatus = await response.json();
				// console.log(userStatus.user.image_url); // 画像表示

				if (userStatus.logged_in && loggedInStatus === false) {
					setLoggedInStatus(true);
					setCurrentUser(userStatus.user);
					setRecipesCount(userStatus.recipes_count);
				} else if (!userStatus.logged_in && loggedInStatus === true) {
					setLoggedInStatus(false);
					setCurrentUser({});
				}
			} catch (error) {
				handleAjaxError(error);
			};
		};

    checkLoginStatus();
  });

	return(
		<>
			<Header setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus} currentUser={currentUser}/>
			<h1>デバッグ</h1>
			<p>ログイン状況：{loggedInStatus ? "ログイン中" : "未ログイン"}</p>
			<p>ログイン中のユーザー：{currentUser.name ? currentUser.name : "ログイン中のユーザーはいません"}</p>
			<CurrentUserContext.Provider value={currentUser}>
				<Main
					setCurrentUser={setCurrentUser}
					setLoggedInStatus={setLoggedInStatus}
					loggedInStatus={loggedInStatus}
					currentUser={currentUser}
				/>
			</CurrentUserContext.Provider>
			<Footer />
			<ToastContainer />
		</>
	);
};

export default App;