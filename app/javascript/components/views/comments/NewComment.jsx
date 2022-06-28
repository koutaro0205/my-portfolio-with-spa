import React, {useState, useEffect, useContext, useRef} from "react";
import { CurrentUserContext } from "../../App";
import CommentForm from "./CommentForm";
import { handleAjaxError } from "../../parts/helpers";
import { useNavigate } from "react-router-dom";
import { success } from "../../parts/notifications";

const NewComments = ({recipeId}) => {
  const [comments, setComments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext(CurrentUserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchComments = async (recipeId) => {
      try {
				const response = await window.fetch(`/api/recipes/${recipeId}/comments`);
				if (!response.ok) throw Error(response.statusText);
				const data = await response.json();
        setComments(data.comments);
			} catch (error) {
				handleAjaxError(error);
			};
    };
    fetchComments(recipeId);
  }, []);

  const addComment = async (newComment) => {
    try {
      const response = await window.fetch(`/api/recipes/${recipeId}/comments`, {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw Error(response.statusText);
      const newData = await response.json();
      const savedComment = newData.comment;
      const newComments = [...comments, savedComment];
      setComments(newComments);
      success(newData.message);
      navigate(`/recipes/${recipeId}`);
    } catch (error) {
      handleAjaxError(error);
    }
  }

  const modalRef = useRef();

    useEffect(() => {
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, []);

    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setShowModal(false);
        }
    };

  const ShowModal = () => {
    setShowModal(!showModal);
  };

  const removeComment = async (commentId) => {
    const sure = window.confirm('コメントを削除しますか?');

    if (sure) {
      try {
        const response = await window.fetch(`/api/recipes/${recipeId}/comments/${commentId}`, {
          method: 'DELETE',
        });
        if (!response.ok) throw Error(response.statusText);
        const removeData = await response.json();
        if (removeData.status === "ok"){
          success(removeData.message);
          const newComments = [...comments];
          const idx = newComments.findIndex((comment) => comment.id === commentId);
          newComments.splice(idx, 1);
          setComments(newComments);
        } else {
          warn(removeData.message);
        }
      } catch (error) {
        handleAjaxError(error);
      };
    };
  };

  const handleClick = (commentId) =>{
    removeComment(commentId);
  }

  const renderComments = (commentArray) => {
    return commentArray.map((comment) => (
      <li key={comment.id} className="comments__item">
        <div className="comments__userInfo">
          <div className="comments__user-image">
            <img src={comment.user.image_url ? comment.user.image_url :'/assets/default.jpeg'} alt="" />
          </div>
          <p className="comments__user-name">{comment.user.name}</p>
        </div>
        <p className="comments__content">
          {comment.content}
          <span className="comments__timestamp">
            {comment.created_at}
          </span>
          {comment.user.id === currentUser.id && (
            <span className="comments__delete">
              <span onClick={() => handleClick(comment.id)} className="comments__delete-btn">コメントを削除</span>
            </span>
          )}
        </p>
      </li>
    ));
  };

  return (
    <>
      <section className="section content-width">
        <h1 className="sectionTitle">コメント一覧</h1>
          <div className="comments">
            <ul className="comments__list">
              {comments.length !== 0 ? (
                renderComments(comments)
              ) : (
                <p className="nothing">この投稿にコメントはありません。</p>
              )}
            </ul>
          </div>

        {currentUser.id && (
          <>
            <div className="modalBtn">
              <button onClick={ShowModal} id="openModal">コメントを追加</button>
            </div>
            {showModal && (
            <div id="modalArea" className="modalArea">
              <div id="modalBg" className="modalBg"></div>
                <div className="modalWrapper" ref={modalRef}>
                  <div className="modalContents">
                    <div className="form__inner-modal">
                      <h1 className="sectionTitle">コメントを投稿する</h1>
                      <CommentForm recipeId={recipeId} addComment={addComment}/>
                    </div>
                  </div>
                </div>
            </div>
            )}
          </>
        )}
      </section>
    </>
  );
};

export default NewComments;