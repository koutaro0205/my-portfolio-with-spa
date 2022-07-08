import React, { useEffect, useState } from 'react';
import Footer from './templates/Footer';
import Header from './templates/Header';
import Main from './templates/Main';
import { ToastContainer } from 'react-toastify';
import './App.css';
import { useSession } from './views/users/useSession';
import { handleAjaxError } from './parts/helpers';
import { useNavigate } from 'react-router-dom';

export const CurrentUserContext  = React.createContext();
export const LoggedInStatusContext  = React.createContext();
export const ControllLoggedInContext  = React.createContext([()=>{}, ()=>{}]);
export const SearchRecipesContext = React.createContext({});

const App = () => {
	const { loggedInStatus,
					currentUser,
					setCurrentUser,
					setLoggedInStatus } = useSession();

	const navigate = useNavigate();

	useEffect(() => {
		const checkLoginStatus = async () => {
			try {
				const response = await window.fetch('/api/logged_in');
				if (!response.ok) throw Error(response.statusText);

				const userStatus = await response.json();

				if (userStatus.logged_in && loggedInStatus === false) {
					setLoggedInStatus(true);
					setCurrentUser(userStatus.user);
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

	const [recipes, setRecipes] = useState([]);
	const [keyword, setKeyword] = useState('');

	const searchRecipe = async (keyword) => {
    try {
      const response = await window.fetch(`/api/search/?keyword=${keyword}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);
			const data = await response.json();
			setKeyword(data.keyword);
			setRecipes(data.recipes);
			navigate('/search');
    } catch (error) {
      handleAjaxError(error);
    };
  };

	return(
		<>
			<Header
				setCurrentUser={setCurrentUser}
				setLoggedInStatus={setLoggedInStatus}
				currentUser={currentUser}
				searchRecipe={searchRecipe}
			/>
			<h1>デバッグ</h1>
			<p>ログイン状況：{loggedInStatus ? "ログイン中" : "未ログイン"}</p>
			<p>ログイン中のユーザー：{currentUser.name ? currentUser.name : "ログイン中のユーザーはいません"}</p>
			<CurrentUserContext.Provider value={currentUser}>
				<LoggedInStatusContext.Provider value={loggedInStatus}>
					<ControllLoggedInContext.Provider value={[setCurrentUser, setLoggedInStatus]}>
						<SearchRecipesContext.Provider value={{recipes: recipes, keyword: keyword}}>
							<Main currentUser={currentUser}/>
						</SearchRecipesContext.Provider>
					</ControllLoggedInContext.Provider>
				</LoggedInStatusContext.Provider>
			</CurrentUserContext.Provider>
			<Footer currentUser={currentUser} />
			<ToastContainer />
		</>
	);
};

export default App;