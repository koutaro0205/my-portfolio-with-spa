import { useEffect } from "react";
import { warn } from "../parts/notifications";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
			try {
				const response = await window.fetch('/api/logged_in');
				if (!response.ok) throw Error(response.statusText);

				const userStatus = await response.json();

				console.log(userStatus);

				if (!userStatus.logged_in) {
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