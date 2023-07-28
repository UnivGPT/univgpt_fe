import { Link } from "react-router-dom";
import emptyheart from "../../assets/images/emptyheart.png";
import redheart from "../../assets/images/redheart.png";
import pencil from "../../assets/images/pencil.png";
import {
  likePrompt,
  getUser,
  getSecureUser,
  getUserProfile,
} from "../../api/api";
import { useState, useEffect } from "react";
import { getCookie } from "../../utils/cookie";
import { useHistory } from "react-router-dom";

export const SmallPrompt = ({ rank, prompt }) => {
  console.log(prompt);
  return (
    <div className="flex flex-row w-full rounded-xl bg-white border-gray-300 shadow py-3 px-2 m-1">
      <div className="m-1 pt-2 pr-1 font-extrabold text-gpt-indigo">{rank}</div>
      <div className="w-full h-full flex flex-col pr-2">
        <div className="font-bold font-notosanskr  text-gpt-blue px-2">
          {prompt.title}
        </div>
        <div className="flex flex-row text-sm justify-end mr-1 flex-shrink-0">
          <div className="font-bold text-gpt-red">
            ❤️ {prompt.like_users.length}
          </div>
          <div className="pl-2 font-bold">👀 {prompt.view}</div>
        </div>
      </div>
    </div>
  );
};

export const MidPrompt = ({ prompt }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getSecureUserAPI = async () => {
        const like_list = prompt.like_users;
        const user = await getSecureUser();

        if (like_list.includes(user.id)) {
          setIsLike(true);
        }

        setUser(user);
        if (prompt.author.id === user.id) {
          setIsAuthor(!isAuthor);
        }
      };
      getSecureUserAPI();
    }
    if (prompt.like_users) {
      setLikeCount(prompt.like_users.length);
    }
  }, [prompt.like_users]);

  const onClickLike = async () => {
    try {
      const response = await likePrompt(prompt.id);
      setLikeCount(response.like_users.length);
      setIsLike(!isLike);
    } catch (error) {
      console.log("[ERROR] failed to like prompt");
    }
  };

  return (
    <div className="flex flex-col w-80 h-64 space-y-8 p-5 shadow m-3 mx-6 rounded-3xl border-gpt-blue border-2 bg-white">
      <div className="font-bold text-lg h-1/6">{prompt.title}</div>
      <div className="font-medium h-1/3 mb-2">{prompt.description}</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row font-bold">
            {isAuthor && (
              <div className="w-5 h-5">
                <Link to={`/promptedit/${prompt.id}`}>
                  <img
                    src={pencil}
                    className="cursor-pointer mr-1.5"
                    alt="edit"
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-row font-bold">
            {isLike ? (
              <div className="w-5 h-5 mr-1.5">
                <img
                  src={redheart}
                  onClick={onClickLike}
                  className="cursor-pointer mt-0.5"
                ></img>
              </div>
            ) : (
              <div className="w-5 h-5 mr-1.5">
                <img
                  src={emptyheart}
                  onClick={onClickLike}
                  className="cursor-pointer mt-0.5"
                ></img>
              </div>
            )}
            {likeCount}
          </div>
          <div className="font-bold">👀 {prompt.view}</div>
        </div>
        <div>
          <Link
            to={`/promptdetail/${prompt.id}`}
            className="rounded-xl p-3 px-5 mb-3 font-semibold text-center text-sm text-white bg-gpt-blue"
          >
            사용하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export const MyPagePrompt = ({ prompt }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState();
  const [isAuthor, setIsAuthor] = useState(false);
  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getSecureUserAPI = async () => {
        const like_list = prompt.like_users;
        const user = await getSecureUser();

        if (like_list.includes(user.id)) {
          setIsLike(true);
        }

        setUser(user);
        if (prompt.author.id === user.id) {
          setIsAuthor(!isAuthor);
        }
      };
      getSecureUserAPI();
    }
    if (prompt.like_users) {
      setLikeCount(prompt.like_users.length);
    }
  }, [prompt.like_users]);

  const onClickLike = async () => {
    try {
      const response = await likePrompt(prompt.id);
      console.log("RESSPONSE", response);
      console.log(response.like_users.length);
      setLikeCount(response.like_users.length);
      setIsLike(!isLike);
      window.location.reload();
      // if (isLike) {
      //   setScrapPromptList((prevList) => prevList.filter((p) => p.id !== prompt.id));
      // } else {
      //   setScrapPromptList((prevList) => [...prevList, prompt]);
      // }
    } catch (error) {
      console.log("[ERROR] failed to like prompt");
    }
  };

  return (
    <div className="flex flex-col w-80 h-60 space-y-8 p-5 shadow m-3 rounded-3xl border-gpt-blue border-2 bg-white">
      <div className="font-bold text-lg h-1/6">{prompt.title}</div>
      <div className="font-medium h-1/3">{prompt.description}</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row font-bold">
            {isAuthor && (
              <div className="w-5 h-5 mr-1">
                <Link to={`/promptedit/${prompt.id}`}>
                  <img
                    src={pencil}
                    className="cursor-pointer mr-1"
                    alt="edit"
                  />
                </Link>
              </div>
            )}
          </div>
          <div className="flex flex-row font-bold">
            {isLike ? (
              <div className="w-5 h-5 mr-1">
                <img
                  src={redheart}
                  onClick={onClickLike}
                  className="cursor-pointer mt-0.5"
                ></img>
              </div>
            ) : (
              <div className="w-5 h-5 mr-1">
                <img
                  src={emptyheart}
                  onClick={onClickLike}
                  className="cursor-pointer mt-0.5"
                ></img>
              </div>
            )}
            {likeCount}
          </div>
          <div className="font-bold">👀 {prompt.view}</div>
        </div>
        <div>
          <Link
            to={`/promptdetail/${prompt.id}`}
            className="rounded-xl p-3 mb-3 font-semibold text-center text-sm text-white bg-gpt-blue"
          >
            사용하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export const BigPrompt = ({ prompt }) => {
  return (
    <div>
      <div>{prompt.title}</div>
      <div>{prompt.description}</div>
      <div></div>
      <button>보내기</button>
    </div>
  );
};
