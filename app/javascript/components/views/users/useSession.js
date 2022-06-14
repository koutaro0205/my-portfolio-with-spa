import { useState } from "react";

export const useSession = () => {
  const [loggedInStatus, setLoggedInStatus] = useState("未ログイン");
	const [currentUser, setCurrentUser] = useState({});

  return {
    loggedInStatus,
    setLoggedInStatus,
    currentUser,
    setCurrentUser,
  };
};