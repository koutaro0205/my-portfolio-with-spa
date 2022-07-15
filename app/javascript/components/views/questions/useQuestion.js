import { useState, useEffect } from 'react';
import { handleAjaxError } from '../../parts/helpers';

export const useQuestion = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await window.fetch('/api/questions');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setIsLoading(false);
        setQuestions(data.questions);
      } catch (error) {
        handleAjaxError(error);
        setIsLoading(false);
      }
    };
    getAllQuestions();

  }, []);

  return {
    questions,
    setQuestions,
    isLoading,
    setIsLoading
  };
};