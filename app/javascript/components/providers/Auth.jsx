import { useEffect, useState, useLayoutEffect } from "react";
import { warn } from "../parts/notifications";
import { useNavigate, useLocation } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
	const location = useLocation();
	const [url, setUrl] = useState('');

  useLayoutEffect(() => {
    const checkLoginStatus = async () => {
			try {
				const response = await window.fetch('/api/logged_in');
				if (!response.ok) throw Error(response.statusText);

				const userStatus = await response.json();

				if (!userStatus.logged_in) {
					setUrl(location.pathname);
					warn("ログインが必要です");
				}
			} catch (error) {
				handleAjaxError(error);
			};
		};
    checkLoginStatus();
  }, []);

	useEffect(() => {
		if (url){
			navigate(`/login`, {state: {url: url}});
		}
	}, [url]);
};

export default Auth;