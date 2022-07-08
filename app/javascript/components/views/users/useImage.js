import { useState, useEffect } from 'react';
import { handleAjaxError } from '../../parts/helpers';

export const useImage = () => {
  const [currentImage, setCurrentImage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await window.fetch('/api/current_image');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setCurrentImage(data.image);
      } catch (error) {
        handleAjaxError(error);
      }

    };
    fetchData();

  }, []);

  return {
    currentImage,
    setCurrentImage,
  };
};