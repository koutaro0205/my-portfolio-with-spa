import React, { useEffect } from 'react';
import Footer from './templates/Footer';
import Header from './templates/Header';
import Main from './templates/Main';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { useSession } from './views/users/useSession';

const App = () => {
	const { loggedInStatus, currentUser, setCurrentUser, setLoggedInStatus } = useSession();

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const response = await window.fetch('/api/logged_in');
				if (!response.ok) throw Error(response.statusText);

				const userStatus = await response.json();

				if (userStatus.logged_in && loggedInStatus === "未ログイン") {
					setLoggedInStatus("ログイン中");
					setCurrentUser(userStatus.user);
				} else if (!userStatus.logged_in && loggedInStatus === "ログイン中") {
					setLoggedInStatus("未ログイン");
					setCurrentUser({});
				}
			} catch (error) {
				console.log("ログインエラー", error);
				// handleAjaxError(error);
			};
		};

    checkLoginStatus();
  });

	return(
		<>
			<Header setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus} currentUser={currentUser}/>
			<p>ログイン状況：{loggedInStatus}</p>
			<p>ログイン中のユーザー：{currentUser.name ? currentUser.name : "ログイン中のユーザーはいません"}</p>
			<Main setCurrentUser={setCurrentUser} setLoggedInStatus={setLoggedInStatus} currentUser={currentUser}/>
			<Footer />
			<ToastContainer />
		</>
	);
};

export default App;