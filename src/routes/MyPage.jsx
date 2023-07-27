import users from "../data/users";
import prompts from "../data/prompts";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MyPagePrompt } from "../components/Prompts";
import { getPromptList, getUserProfile } from "../api/api";
import { getCookie } from "../utils/cookie";

const MyPage = () => {
  const [profile, setProfile] = useState({
    id: "",
    email: "",
    username: "",
  });
  const [promptList, setPromptList] = useState([]);
  const [authorPromptList, setAuthorPromptList] = useState([]);
  const [scrapPromptList, setScrapPromptList] = useState([]);
  const [sortPromptList, setSortPromptList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (getCookie("access_token")) {
        const response = await getUserProfile();
        const profile = response.data;
        setProfile({
          id: profile.id,
          email: profile.email,
          username: profile.username,
        });
        const prompts = await getPromptList();
        setPromptList(prompts);
        setSortPromptList(prompts);
        setScrapPromptList(
          prompts.filter((prompt) => prompt.like_users.includes(profile.id))
        );
        setAuthorPromptList(
          prompts.filter((prompt) => prompt.author.id === profile.id)
        );
      }
    };
    fetchData();
  }, []);

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col w-full mt-8">
        <div className="h-48 flex flex-row bg-white rounded-3xl mb-5 mx-20 p-8 text-black align-middle justify-between">
          <div className="flex flex-row">
            <HiUserCircle size="150" />
            <div className="flex flex-col justify-between mx-10">
              <div className="text-3xl font-semibold">
                {profile.username}님 반갑습니다!
              </div>
              <div className="flex flex-row space-x-5 text-center">
                <div className="button-a-3 hover:!text-white">
                  나의 프롬프트 {authorPromptList.length}개
                </div>
                <div className="button-a-3 hover:!text-white">
                  스크랩한 프롬프트 {scrapPromptList.length}개
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 text-center justify-self-end justify-center">
            <Link to="/" className="button-d-1">
              로그아웃
            </Link>
            <Link to="/infocheck" className="button-d-1">
              회원정보 수정
            </Link>
          </div>
        </div>
        <div className="flex flex-row space-x-5 mx-20 justify-between">
          <div className="w-6/12 h-3/4 bg-slate-200 text-black rounded-3xl p-5 ">
            <div className="button-d text-center font-bold text-2xl hover:!text-white">
              나의 프롬프트
            </div>
            <br></br>
            <div className="w-full h-80 flex flex-wrap overflow-y-auto section-b">
              {promptList
                .filter((prompt) => prompt.author.id === profile.id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((prompt) => (
                  <MyPagePrompt key={prompt.id} prompt={prompt} />
                ))}
            </div>
          </div>
          <div className="w-6/12 h-3/4 bg-slate-200 text-black rounded-3xl p-5">
            <div className="button-d text-center font-bold text-2xl hover:!text-white">
              스크랩한 프롬프트
            </div>
            <br></br>
            <div className="w-full h-80 flex flex-wrap overflow-y-auto section-b">
              {sortPromptList
                .filter((prompt) => prompt.like_users.includes(profile.id))
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .map((prompt) => (
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
