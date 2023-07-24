import users from "../data/users";
import prompts from "../data/prompts";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MyPagePrompt } from "../components/Prompts";
import { getUserProfile } from "../api/api";

const MyPage = () => {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
  });

  useEffect(() => {
    const getUserProfileAPI = async () => {
      const profile = await getUserProfile();
      setProfile({
        email: profile.email,
        username: profile.username,
      });
    };
    getUserProfileAPI();
    console.log(profile);
  }, []);

  const [promptList, setPromptList] = useState(prompts);

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col w-full mt-8">
        <div className="h-48 flex flex-row bg-white rounded-3xl mb-10 mx-20 p-8 text-black align-middle justify-between">
          <div className="flex flex-row">
            <HiUserCircle size="150" />
            <div className="flex flex-col space-y-10 mx-10">
              <div className="text-3xl font-semibold">
                {profile.username}님 환영합니다!
              </div>
              <div className="flex flex-row space-x-5">
                <div className="button-a">나의 프롬프트 {prompts.length}개</div>
                <div className="button-a">
                  스크랩한 프롬프트 {prompts.length}개
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 text-center justify-self-end">
            <Link to="/" className="button-d">
              로그아웃
            </Link>
            <Link to="/infocheck" className="button-d">
              회원정보 수정
            </Link>
          </div>
        </div>
        <div className="flex flex-row space-x-5 mx-20 justify-between">
          <div className="w-6/12 h-3/4 bg-slate-200 text-black rounded-3xl p-5 ">
            <div className="button-d text-center font-bold text-2xl">
              나의 프롬프트
            </div>
            <br></br>
            <div className="w-full h-80 grid grid-cols-2 overflow-y-scroll">
              {promptList.map((prompt) => (
                <MyPagePrompt key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
          <div className="w-6/12 h-3/4 bg-slate-200 text-black rounded-3xl p-5">
            <div className="button-d text-center font-bold text-2xl">
              스크랩한 프롬프트
            </div>
            <br></br>
            <div className="w-full h-80 grid grid-cols-2 overflow-y-scroll">
              {promptList.map((prompt) => (
                <MyPagePrompt key={prompt.id} prompt={prompt} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
