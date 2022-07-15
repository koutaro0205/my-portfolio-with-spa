import { useState, useEffect } from 'react';
import { handleAjaxError } from '../../parts/helpers';

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await window.fetch('/api/users');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setIsLoading(false);
        setUsers(data.users);
      } catch (error) {
        handleAjaxError(error);
        setIsLoading(false);
      }
    };
    fetchData();

  }, []);

  return {
    users,
    setUsers,
    isLoading,
    setIsLoading
  };
};
