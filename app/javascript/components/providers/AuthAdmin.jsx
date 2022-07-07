import { useEffect } from "react";
import { warn } from "../parts/notifications";
import { useNavigate } from "react-router-dom";

const AuthAdmin = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAdminUser = async () => {
      try {
        const response = await window.fetch('/api/admin_user');
        if (!response.ok) throw Error(response.statusText);
        const adminUserStatus = await response.json();
        if (!adminUserStatus.admin) {
          navigate('/')
          warn('権限がありません');
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };
    checkAdminUser();

  }, []);
};

export default AuthAdmin;
