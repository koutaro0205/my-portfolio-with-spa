import { useState } from "react";

export const useUrl = () => {
  const [url, setUrl] = useState();

  return {
    url,
    setUrl,
  };
};