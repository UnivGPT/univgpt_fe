import { useState } from "react";
import prompts from "../data/prompts";
import { PromptSideBar } from "../components/SideBar";
import comments from "../data/comments";
import users from "../data/users";
import {HiUserCircle} from "react-icons/hi";
import gpt_logo from "../assets/images/logo_gpt.png";

const PromptResultPage = () => {
  const [isUser, setIsUser] = useState(users);
  // 	const [newPrompt, setNewPrompt] = useState({
  //     title: "",
  //     content: "",
  //     category: [],
  //     description: "",
  //   });
  // 	const handlechange = (e) => {
  //     setNewPrompt
  //   };

  
  return (
    <div className="w-full flex flex-row space-x-2">
    <div className="w-60 m-5">
      <PromptSideBar
        key={isUser.id}
        user={isUser}
        prompt={prompts}
        comment={comments[0]} />
    </div>

    <form className="w-auto h-fit flex flex-col items-center bg-gray-200 text-black p-11 rounded-3xl ">
      {/*사용자 측 프롬프트 질문*/}
  <div className="flex justify-between mx-20">
  <div className="bubble-a font-medium overflow-x-hidden overflow-y-scroll">각 지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고, 제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침 최저기온은 중서부 지방이 영하 23도에서 영하 14도, 영동과 남부지방은 영하 13도에서 영하 8도로 몹시 추운 날씨가 내일 아침까지도 계속되겠습니다.
그렇지만 낮 최고 기온은 영하 6도에서 영상 1도의 분포로 오늘보다 3-4도 가량 올라갈 전망입니다.
날씨를 전해 드렸습니다.</div>
  <div className="bubble-a:after"/>
  <HiUserCircle size="150" className="flex flex-col items-center ml-10"/>
  </div>
  <br></br>
{/*GPT 답변*/} 
<div className="flex justify-between mx-20">
<img id="gpt-logo" src={gpt_logo} alt="gpt_logo" className="flex flex-col items-center mr-10 w-28 h-28"/>
<div className="bubble-b font-medium overscroll-y-auto">각 지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고, 제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침 최저기온은 중서부 지방이 영하 23도에서 영하 14도, 영동과 남부지방은 영하 13도에서 영하 8도로 몹시 추운 날씨가 내일 아침까지도 계속되겠습니다.
그렇지만 낮 최고 기온은 영하 6도에서 영상 1도의 분포로 오늘보다 3-4도 가량 올라갈 전망입니다.
날씨를 전해 드렸습니다.</div>
  <div className="bubble-b:right"/>
  </div>
  {/*버튼*/}
  <button type="submit" className=" bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 mt-96 shadow-xl">
  나가기
  </button>
  </form>
  </div>
  );
};

export default PromptResultPage;
