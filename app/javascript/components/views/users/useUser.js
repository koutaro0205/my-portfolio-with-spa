import { useState, useEffect } from 'react';
import { handleAjaxError } from '../../parts/helpers';

export const useUser = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [userImg, setUserImg] = useState();
  // const [ exsistedEmail, setEmail ] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/users');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        // console.log(data[0].image_url);
        setUsers(data);
      } catch (error) {
        setIsError(true);
        handleAjaxError(error);
      }

      setIsLoading(false);
    };
    fetchData();

  }, []);

  return {
    users,
    setIsLoading,
    isLoading,
    isError,
    setUsers,
    userImg,
    setUserImg,
  };
};
