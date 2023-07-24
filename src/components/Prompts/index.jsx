import { Link } from "react-router-dom";
import emptyheart from "../../assets/images/emptyheart.png";
import redheart from "../../assets/images/redheart.png";
import { likePrompt, getUser, getSecureUser } from "../../api/api";
import { useState, useEffect } from "react";
import { getCookie } from "../../utils/cookie";

export const SmallPrompt = ({ rank, prompt }) => {
  return (
    <div className="flex flex-row rounded-xl bg-white  border-gray-300 shadow p-3 m-1">
      <div className="m-1 pt-2 pr-2">{rank}</div>
      <div className="flex flex-col">
        <div className="text-sm font-semibold">{prompt.title}</div>
        <div className="flex flex-ro text-sm justify-end">
          <div className="font-bold">❤️ {prompt.like_users.length}</div>
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
    <div className="flex flex-col w-80 h-60 space-y-8 p-5 shadow-xl m-3 rounded-3xl border-gray-300 border bg-white">
      <div className="font-semibold text-lg">{prompt.title}</div>
      <div className="font-medium">{prompt.description}</div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-row space-x-2">
          <div className="flex flex-row font-bold">
            {isLike ? (
              <div className="w-5 h-5">
                <img src={redheart} onClick={onClickLike}></img>
              </div>
            ) : (
              <div className="w-5 h-5">
                <img
                  src={emptyheart}
                  onClick={onClickLike}
                  className="cursor-pointer"
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
            프롬프트 사용하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export const MyPagePrompt = ({ prompt }) => {
  return (
    <div className="flex flex-col w-75 h-60 space-y-8 p-5 shadow-xl m-3 rounded-3xl  border-gray-300 bg-white">
      <div className="font-semibold text-lg">{prompt.title}</div>
      <div className="font-medium">{prompt.description}</div>
      <div className="flex flex-row space-x-2 self-end pb-10">
        <div className="font-bold">❤️ {prompt.like_users.length}</div>
        <div className="font-bold">👀 {prompt.view}</div>
      </div>
      <Link to={`/promptdetail/${prompt.id}`}>프롬프트 사용하기</Link>
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
