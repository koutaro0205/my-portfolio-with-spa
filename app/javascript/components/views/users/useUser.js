import { useState, useEffect } from 'react';
import { handleAjaxError } from '../../parts/helpers';

export const useUser = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/users');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setUsers(data.users);
      } catch (error) {
        handleAjaxError(error);
      }
    };
    fetchData();

  }, []);

  return {
    users,
    setUsers,
  };
};
