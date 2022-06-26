import { useState } from "react";

export const useSession = () => {
  const [loggedInStatus, setLoggedInStatus] = useState(false);
	const [currentUser, setCurrentUser] = useState({});
  const [recipesCount, setRecipesCount] = useState();

  return {
    loggedInStatus,
    setLoggedInStatus,
    currentUser,
    setCurrentUser,
    recipesCount,
    setRecipesCount,
  };
};