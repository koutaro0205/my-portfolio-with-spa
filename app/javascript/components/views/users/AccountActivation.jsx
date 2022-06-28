import React, { useEffect, useContext } from 'react';
import { ControllLoggedInContext } from '../../App';
import { success, warn } from '../../parts/notifications';
import { handleAjaxError } from '../../parts/helpers';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

const AccountActivation = () => {
  const { token } = useParams();
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const navigate = useNavigate();
  const ControllLoggedInFuncs = useContext(ControllLoggedInContext);
  const setCurrentUser = ControllLoggedInFuncs[0];
  const setLoggedInStatus = ControllLoggedInFuncs[1];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch(`/api/account_activations/${token}/edit?${query}`);
        if (!response.ok) throw Error(response.statusText);
        const AccountActivationStatus = await response.json();

        if (AccountActivationStatus.logged_in && AccountActivationStatus.activated){
          setLoggedInStatus(true);
          setCurrentUser(AccountActivationStatus.user);
          success("アカウントの有効化が完了しました");
          navigate(`/users/${AccountActivationStatus.user.id}`);
        } else {
          warn(AccountActivationStatus.message);
          navigate(`/`);
        }
      } catch (error) {
        handleAjaxError(error);
      }

    };

    fetchData();
  }, []);
}

export default AccountActivation;