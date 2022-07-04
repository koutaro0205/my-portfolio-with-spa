import React, { useState, useEffect } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchAllCategories = async() => {
      try {
        const response = await window.fetch('/api/categories');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        handleAjaxError(error);
      }
    };
    fetchAllCategories();
  }, []);

  return{
    categories,
    setCategories
  };
};