import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { SmallPrompt } from "../Prompts";
import Comment from "../Comments";
import comments from "../../data/comments";
import emptyheart from "../../assets/images/emptyheart.png";
import redheart from "../../assets/images/redheart.png";
import { likePrompt, getSecureUser } from "../../api/api";
import { useState, useEffect } from "react";
import { getCookie } from "../../utils/cookie";

export const HomeSideBar = ({ user, prompt }) => {
  console.log("유저다 우하하하하하하", user);
  // console.log(user[0].username);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const newUserName = user.profile.socials_username || user.username;
    setUserName(newUserName);
  }, [user]);

  return (
    <div className="flex flex-col space-y-4 align-middle items-center">
      <Link
        to="/promptmake"
        className="button-b w-11/12 flex flex-col items-center"
      >
        내 프롬프트 만들기
      </Link>
      <div>
        <HiUserCircle size="150" />
        {user.id ? (
          <div className="font-semibold">{userName}님 반갑습니다!</div>
        ) : (
          <div className="font-semibold">로그인이 필요합니다</div>
        )}
      </div>
      <div className="w-52 bg-slate-100 rounded-3xl border-solid border-slate-300 border-2 text-black p-3 space-y-2">
        <div className="rounded-xl p-3.5 mb-3 text-center font-bold text-lg text-white bg-gpt-blue">
          오늘의 프롬프트
        </div>
        {/* <SmallPrompt rank="🥇" prompt={prompt[0]} />
        <SmallPrompt rank="🥈" prompt={prompt[1]} />
        <SmallPrompt rank="🥉" prompt={prompt[2]} />
        <SmallPrompt rank="4" prompt={prompt[3]} />
        <SmallPrompt rank="5" prompt={prompt[4]} /> */}
      </div>
    </div>
  );
};

export const PromptSideBar = ({ prompt }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getSecureUserAPI = async () => {
        const like_list = prompt.like_users;
        const user = await getSecureUser();
        const newUserName =
          prompt.author.socials_username || prompt.author.username;
        setUserName(newUserName);

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
    <div className="h-full flex flex-col space-y-5 bg-white text-black rounded-tr-3xl p-5">
      <Link
        to="/:promptmake"
        className="w-full button-b flex flex-col items-center"
      >
        내 프롬프트 만들기
      </Link>
      <div>
        <HiUserCircle size="150" className="self-center" />
        <div className="font-semibold">{userName}님에 의해 생성된 프롬프트</div>
      </div>
      <div>
        <div>프롬프트 정보</div>
        <div className="flex flex-row space-x-5 items-center">
          <div>👀 {prompt.view}</div>
          <div>
            {isLike ? (
              <div className="w-5 h-5 mr-2">
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
          </div>
          {likeCount}
        </div>
      </div>
      <div>
        <Comment promptId={prompt.id} />
      </div>
    </div>
  );
};
