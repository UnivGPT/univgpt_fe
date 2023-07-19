import users from "../data/users";
import prompts from "../data/prompts";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState } from "react";
import { MyPagePrompt } from "../components/Prompts";

const MyPage = () => {
  const [user, setUser] = useState(users);
  const [promptList, setPromptList] = useState(prompts);

  return (
    <div className="flex flex-col w-full">
      <div className="h-48 flex flex-row bg-white rounded-3xl mb-10 mx-20 p-8 text-black align-middle justify-between">
        <div className="flex flex-row">
          <HiUserCircle size="150" />
          <div className="flex flex-col space-y-10 mx-10">
            <div className="text-2xl">{user[0].username} 님 환영합니다!</div>
            <div className="flex flex-row space-x-5">
              <div className="button">나의 프롬프트 {prompts.length}개</div>
              <div className="button">스크랩한 프롬프트 {prompts.length}개</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-5 text-center justify-self-end">
          <Link to="/" className="button">
            로그아웃
          </Link>
          <Link to="/infocheck" className="button">
            회원정보 수정
          </Link>
        </div>
      </div>
      <div className="flex flex-row space-x-5 mx-20 justify-between">
        <div className="w-6/12 h-96 bg-slate-200 text-black rounded-3xl p-5 ">
          <div className="font-semibold">나의 프롬프트</div>
          <div className="w-full h-80 grid grid-cols-2 overflow-y-scroll">
            {promptList.map((prompt) => (
              <MyPagePrompt key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
        <div className="w-6/12 h-96 bg-slate-200 text-black rounded-3xl p-5">
          <div className="font-semibold">스크랩한 프롬프트</div>
          <div className="w-full h-80 grid grid-cols-2 overflow-y-scroll">
            {promptList.map((prompt) => (
              <MyPagePrompt key={prompt.id} prompt={prompt} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
