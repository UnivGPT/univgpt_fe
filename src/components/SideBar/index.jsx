import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { SmallPrompt } from "../Prompts";
import Comment from "../Comments";
import emptyheart from "../../assets/images/emptyheart.png";
import redheart from "../../assets/images/redheart.png";
import { likePrompt, getSecureUser } from "../../api/api";
import { useState, useEffect } from "react";
import { getCookie } from "../../utils/cookie";
import Avatar from "react-avatar";

export const HomeSideBar = ({ user, prompt }) => {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const newUserName = user.profile.socials_username || user.username;
    setUserName(newUserName);
  }, [user]);

  const colors = [
    "#BACDFF",
    "#EFB4ED",
    "#E1BAFF",
    "#FFBEBA",
    "#FED4AD",
    "#9EDF8E",
  ];

  return (
    <div className="flex flex-col h-screen justify-items-center">
      <div className="flex flex-col space-y-4 align-middle items-center m-4">
        <Link
          to="/promptmake"
          className="button-b w-11/12 flex flex-col items-center"
        >
          내 프롬프트 만들기
        </Link>
        <div>
          {user.id ? (
            <div className="flex flex-col">
              <Avatar
                color={colors[userName.length % colors.length]}
                name={userName}
                className="rounded-full mb-7 mt-1 self-center font-bold text-2xl"
              />
              <div className="font-semibold">{userName}님 반갑습니다!</div>
            </div>
          ) : (
            <>
              <HiUserCircle size={150} />
              <div className="font-semibold">로그인이 필요합니다</div>
            </>
          )}
        </div>
        <div className="w-52 h-2/3 bg-slate-100 rounded-3xl text-black p-3 !mt-4 ml-2 space-y-2 section-c overflow-y-auto overflow-x-hidden">
          <div className="rounded-xl p-3.5 mb-3 text-center font-bold text-lg text-white bg-gpt-blue">
            오늘의 프롬프트
          </div>
          {prompt.length !== 0 && (
            <>
              <SmallPrompt rank="1" prompt={prompt[0]} />
              <SmallPrompt rank="2" prompt={prompt[1]} />
              <SmallPrompt rank="3" prompt={prompt[2]} />
              <SmallPrompt rank="4" prompt={prompt[3]} />
              <SmallPrompt rank="5" prompt={prompt[4]} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const PromptSideBar = ({ prompt, resultPage }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLike, setIsLike] = useState(false);
  const [user, setUser] = useState();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const newUserName =
      prompt.author.socials_username || prompt.author.username;
    setUserName(newUserName);
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

  const colors = [
    "#BACDFF",
    "#EFB4ED",
    "#E1BAFF",
    "#FFBEBA",
    "#FED4AD",
    "#9EDF8E",
  ];

  return (
    <div className="h-full flex flex-col items-center space-y-5 px-8 my-5 bg-white text-black rounded-tr-3xl py-5">
      <Link
        to="/promptmake"
        className="w-full button-b flex flex-col items-center"
      >
        내 프롬프트 만들기
      </Link>
      <div className="flex flex-col items-center justify-center">
        {/*이 얼굴,,,, 글자로 바꿔야,,,,*/}
        <Avatar
          color={colors[userName.length % colors.length]}
          name={userName}
          className="rounded-full mb-7 mt-3 text-2xl font-bold"
        />
        <div className="font-semibold text-lg text-center">
          {userName}님에 의해<br></br>
          생성된 프롬프트
        </div>
      </div>
      <div className="flex flex-col items-center">
        <div className="tag-b">
          <div className="tag">프롬프트 정보</div>
          <div className="flex flex-row space-x-2 justify-center">
            <div className="font-bold mr-3 mb-0.5">👀 {prompt.view}</div>
            {isLike ? (
              <div className="w-5 h-5 mt-0.5">
                <img src={redheart} onClick={onClickLike}></img>
              </div>
            ) : (
              <div className="w-5 h-5 mt-0.5">
                <img
                  src={emptyheart}
                  onClick={onClickLike}
                  className="cursor-pointer"
                ></img>
              </div>
            )}
            <div className="font-bold"> {likeCount}</div>
          </div>
        </div>
      </div>
      <div className="h-full">
        <Comment promptId={prompt.id} resultPage={resultPage} />
      </div>
    </div>
  );
};
