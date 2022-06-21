import { useLayoutEffect } from "react";
import { warn } from "../parts/notifications";
import { useNavigate, useLocation } from "react-router-dom";
import { useUrl } from "../views/users/useUrl";

const Auth = () => {
  const navigate = useNavigate();
	const location = useLocation();
	const { setUrl } = useUrl();

  useLayoutEffect(() => {
    const checkLoginStatus = async () => {
			try {
				const response = await window.fetch('/api/logged_in');
				if (!response.ok) throw Error(response.statusText);

				const userStatus = await response.json();

				if (!userStatus.logged_in) {
					setUrl(location.pathname);
					warn("ログインが必要です");
          navigate(`/login/`);
				}
			} catch (error) {
				handleAjaxError(error);
			};
		};

    checkLoginStatus();
  }, []);
};

export default Auth;