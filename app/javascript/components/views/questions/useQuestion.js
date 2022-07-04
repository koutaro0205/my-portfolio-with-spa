import { useState, useEffect } from 'react';
import { handleAjaxError } from '../../parts/helpers';

export const useQuestion = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getAllQuestions = async () => {
      try {
        const response = await window.fetch('/api/questions');
        if (!response.ok) throw Error(response.statusText);
        const data = await response.json();
        setQuestions(data.questions);
      } catch (error) {
        handleAjaxError(error);
      }
    };
    getAllQuestions();

  }, []);

  return {
    questions,
    setQuestions,
  };
};