import React, { useState, useEffect } from "react";
import { handleAjaxError } from "../../parts/helpers";

const InterestForm = ({questionId, question, setInterestCount}) => {
  const [interestStatus, setInterestStatus] = useState(false);

  useEffect(() => {
		const checkInterestStatus = async (id) => {
			try {
				const response = await window.fetch(`/api/interest_status/${id}`);
				if (!response.ok) throw Error(response.statusText);
				const data = await response.json();
        if (data.interest){
          setInterestStatus(true);
        } else if (!data.interest){
          setInterestStatus(false);
        }
			} catch (error) {
				handleAjaxError(error);
			};
		};

    checkInterestStatus(questionId);
  }, []);

  const InterestedIn = async (question) => {
    try {
      const response = await window.fetch(`/api/interests`, {
        method: 'POST',
        body: JSON.stringify(question),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);

    } catch (error) {
      handleAjaxError(error);
    }
  };

  const notInterestedIn = async (id) => {
    try {
      const response = await window.fetch(`/api/interests/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw Error(response.statusText);

    } catch (error) {
      handleAjaxError(error);
    }
  };

  const toggleInterestStatus = () => {
    if ( interestStatus ){
      notInterestedIn(questionId);
      setInterestStatus(false);
      setInterestCount((prevCount) => prevCount - 1);
    } else {
      InterestedIn(question)
      setInterestStatus(true);
      setInterestCount((prevCount) => prevCount + 1);
    }
  };

  return (
    <div className="question__interest-form">
      {interestStatus ? (
        <div onClick={toggleInterestStatus}>
          <div className="question__interest-btn btn-opacity">
          <span>知りたい!(済)</span>
            <img src={'/assets/interest.svg'} alt="" />
          </div>
        </div>
      ) : (
        <div onClick={toggleInterestStatus}>
          <div className="question__interest-btn">
            <span>知りたい!</span>
            <img src={'/assets/interest.svg'} alt="" />
          </div>
        </div>
      )}
    </div>
  );
};

export default InterestForm;
