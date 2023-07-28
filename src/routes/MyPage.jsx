import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { MyPagePrompt } from "../components/Prompts";
import { getPromptList, getSecureUser } from "../api/api";
import { getCookie } from "../utils/cookie";
import Avatar from "react-avatar";

const MyPage = () => {
  const [profile, setProfile] = useState({
    profile: { id: "", socials_username: "" },
    username: "",
    email: "",
    id: "",
  });
  const [promptList, setPromptList] = useState([]);
  const [authorPromptList, setAuthorPromptList] = useState([]);
  const [scrapPromptList, setScrapPromptList] = useState([]);
  const [sortPromptList, setSortPromptList] = useState([]);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      if (getCookie("access_token")) {
        const response = await getSecureUser();
        setProfile({
          profile: {
            id: response.profile.id,
            socials_username: response.profile.socials_username,
          },
          username: response.username,
          email: response.email,
          id: response.id,
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
  console.log(scrapPromptList);

  useEffect(() => {
    const newUserName = profile.profile.socials_username || profile.username;
    setUserName(newUserName);
  }, [profile]);

  const colors = [
    "#BACDFF",
    "#EFB4ED",
    "#E1BAFF",
    "#FFBEBA",
    "#FED4AD",
    "#9EDF8E",
  ];

  // console.log(userName.length % colors.length);

  return (
    <div className="h-screen w-screen">
      <div className="flex flex-col w-full mt-8">
        <div className="h-48 flex flex-row bg-white rounded-3xl mb-5 mx-20 py-8 px-14 text-black align-middle justify-between">
          <div className="flex flex-row">
            <Avatar
              color={colors[userName.length % colors.length]}
              name={userName}
              className="rounded-full mb-7 font-bold text-2xl"
              size={130}
            />
            <div className="flex flex-col justify-between mx-12">
              <div className="text-3xl font-semibold mt-1">
                {userName} 님 반갑습니다!
              </div>
              <div className="flex flex-row space-x-8 text-center">
                <div className="button-a-3 hover:!text-white !py-2 !px-16 !mt-1 !shadow-lg">
                  나의 프롬프트<br></br>{" "}
                  {
                    promptList.filter(
                      (prompt) => prompt.author.id === profile.id
                    ).length
                  }
                  개
                </div>
                <div className="button-a-3 hover:!text-white !py-2 !px-12 !mt-1 !shadow-lg">
                  스크랩한 프롬프트<br></br>{" "}
                  {
                    promptList.filter((prompt) =>
                      prompt.like_users.includes(profile.id)
                    ).length
                  }
                  개
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-5 text-center justify-self-end justify-center">
            <Link
              to="/infocheck"
              className="button-d-1 !px-10 !py-4 !rounded-2xl !shadow-lg"
            >
              비밀번호 변경
            </Link>
          </div>
        </div>
        <div className="flex flex-row space-x-5 mx-20 justify-between">
          <div className="w-6/12 h-11/12 bg-slate-200 text-black rounded-3xl p-5 ">
            <div className="button-d text-center font-bold text-2xl hover:!text-white">
              나의 프롬프트
            </div>
            <br></br>

            <div className="w-full h-96 flex flex-col  overflow-y-auto section-b">
              {promptList
                .filter((prompt) => prompt.author.id === profile.id)
                .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
                .reduce((pairs, prompt, index) => {
                  // Group prompts into pairs (two prompts in each sub-array)
                  if (index % 2 === 0) {
                    pairs.push([prompt]);
                  } else {
                    pairs[pairs.length - 1].push(prompt);
                  }
                  return pairs;
                }, [])
                .map((pair, pairIndex) => (
                  <div key={pairIndex} className="flex">
                    {pair.map((prompt) => (
                      <MyPagePrompt key={prompt.id} prompt={prompt} />
                    ))}
                  </div>
                ))}
            </div>
          </div>
          <div className="w-6/12 h-11/12 bg-slate-200 text-black rounded-3xl p-5">
            <div className="button-d text-center font-bold text-2xl hover:!text-white">
              스크랩한 프롬프트
            </div>
            <br></br>
            <div className="w-full h-96 flex flex-wrap overflow-y-auto section-b">
              {promptList
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
