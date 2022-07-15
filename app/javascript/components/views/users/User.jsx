import React, { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from "../../App";
import { HeadBlock } from '../../HeadBlock';
import { useNavigate, useParams } from 'react-router-dom';
import { handleAjaxError, defaultImage } from '../../parts/helpers';
import PartialQuestions from '../questions/PartialQuestions';
import FollowForm from '../relationships/FollowForm';
import { Stats } from '../../parts/Stats';
import { useFollow } from '../relationships/useFollow';
import { RecipesFormat } from '../recipes/RecipesFormat';
import Pagination from '../../parts/Pagination';
import { warn } from '../../parts/notifications';

const User = () => {
  const { id } = useParams();
  const navigate = useNavigate
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [myRecipes, setMyRecipes] = useState([]);
  const [recipesCount, setCount] = useState(0);
  const [questions, setQuestions] = useState([]);
  const currentUser = useContext(CurrentUserContext);
  const { followerCount, followingCount, getFollowers, getFollowing, setFollowerCount} = useFollow();

  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(10);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const paginate = pageNumber => setCurrentPage(pageNumber);
  useEffect(() => {
    getFollowers(id);
  }, [followerCount]);

  useEffect(() => {
    getFollowing(id);
  }, [followingCount]);

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true);
			try {
				const response = await window.fetch(`/api/users/${id}`);
				if (!response.ok) throw Error(response.statusText);
				const userInfo = await response.json();
        setIsLoading(false);
        if (userInfo.status === "forbidden"){
          navigate('/');
          warn('有効化されていないユーザーです');
        } else {
          setUser(userInfo.user);
          setMyRecipes(userInfo.recipes);
          setCount(userInfo.recipes_count);
          setQuestions(userInfo.questions);
        }
			} catch (error) {
				handleAjaxError(error);
        setIsLoading(false);
			};
		};

    getUser();
  }, []);

  return (
    <>
      <HeadBlock title={"ユーザー情報"}/>
      <section className="section content-width profile">
        <h1 className="sectionTitle">ユーザー情報</h1>
        <div className="profileCard profileCard--margin-top">
          <ul className="profileCard__info">
            <li className="profileCard__image">
              <img src={user.image_url ? user.image_url : defaultImage()} alt="" />
            </li>
            <li className="profileCard__user">
              <p className="profileCard__user-name">{user.name}</p>
              <p className="profileCard__user-postsCounts">投稿数 {recipesCount}</p>
              <Stats followerCount={followerCount} followingCount={followingCount} userId={id}/>
            </li>
          </ul>
          {currentUser.id && currentUser.id !== user.id && (
            <FollowForm user={user} userId={id} setFollowerCount={setFollowerCount}/>
          )}
        </div>
      </section>
      {isLoading ? (
        <div className="loading-image">
          <img src="/assets/loading.gif" alt="" className='image'/>
        </div>
      ) : (
        <>
          <RecipesFormat sectionTitle={"私のレシピ一覧"} recipes={myRecipes}/>
          <section className="section content-width">
            <h1 className="sectionTitle">私の質問一覧</h1>
            <ul className="questions__list">
              <PartialQuestions questions={currentQuestions}/>
              {questions.length === 0 && (
                <p className="nothing">現在投稿されている質問はありません</p>
              )}
            </ul>
            <Pagination
              postsPerPage={questionsPerPage}
              totalPosts={questions.length}
              paginate={paginate}
            />
          </section>
        </>
      )}
    </>
  );
};

export default User;