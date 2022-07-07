import { useState, useEffect } from "react";
import { handleAjaxError } from "../../parts/helpers";

export const useAdmin = () => {
  const [admin, setAdmin] = useState(false);

  useEffect(() => {
    const checkAdminUser = async () => {
      try {
        const response = await window.fetch('/api/admin_user');
        if (!response.ok) throw Error(response.statusText);
        const adminUserStatus = await response.json();
        if (adminUserStatus.admin) {
          setAdmin(true);
        } else {
          setAdmin(false);
        }
      } catch (error) {
        handleAjaxError(error);
      }
    };
    checkAdminUser();

  }, []);

  return {
    admin,
    setAdmin,
  };
};