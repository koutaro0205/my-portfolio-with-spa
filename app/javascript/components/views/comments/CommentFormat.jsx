import React, {useState, useContext, useRef, useEffect} from 'react';
import { CurrentUserContext } from '../../App';
import CommentForm from "./CommentForm";
import { timeStamp } from '../../parts/helpers';

const CommentFormat = ({Id, handleClick, comments, saveComment}) => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = useContext(CurrentUserContext);
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
            {timeStamp(comment)}
          </span>
          {comment.user.id === currentUser.id && (
            <span className="comments__delete">
              <span onClick={() => handleClick(comment.id)} className="comments__delete-btn">削除</span>
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
                      <CommentForm Id={Id} saveComment={saveComment}/>
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

export default CommentFormat;
