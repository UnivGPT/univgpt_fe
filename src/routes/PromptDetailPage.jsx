import { useState } from "react";
import prompts from "../data/prompts";
import { PromptSideBar } from "../components/SideBar";
import comments from "../data/comments";
import users from "../data/users";
import Select from "react-select";

const PromptDetailPage = () => {
  const [isUser, setIsUser] = useState(users);
  // console.log(isUser);
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
    <div className="w-full flex flex-row space-between">
      <div className="w-60">
        <PromptSideBar
          key={isUser.id}
          user={isUser}
          prompt={prompts}
          comment={comments[0]}
        />
      </div>

      {/*프롬프트 내용 작성 박스/하드코딩된 거 내일 다 바꿔야*/}
      <form className="w-4/6 flex flex-col items-center bg-white text-black p-11 ml-20 pl rounded-3xl ">
        <h1 className="font-bold text-7xl text-gpt-indigo">
          {" "}
          발표 대본 만들기{" "}
        </h1>
        <h1 className="font-extrabold text-xl text-gpt-indigo mt-4">
          자료조사 내용을 발표 대본 형태로 변환해주는 프롬프트 (과제용)
        </h1>
        <br></br>
        <div className="rounded-3xl bg-gray-200 px-8 pb-5 mx-6 h-96 w-5/6 overflow-y-scroll">
          <div className="flex flex-col w-full justify-between">
            <div className="button-f">자료 내용</div>
            <input
              required
              type="text"
              placeholder="요약을 원하는 자료 조사 내용을 작성해주세요"
              className="input-c"
            />
            <div className="button-f">답변 길이</div>
            <input
              required
              type="text"
              placeholder="원하는 단어의 수를 숫자로 입력하세요"
              className="input-c"
            />
            <div className="button-f">발표 목적</div>
            <input
              required
              type="text"
              placeholder="발표의 목적을 작성해주세요"
              className="input-c"
            />
            <div className="button-f">답변 언어</div>
            <input
              required
              type="text"
              placeholder="답변을 작성할 언어를 지정해주세요"
              className="input-c"
            />
          </div>
        </div>
        <br></br>
        {/*버튼*/}
        <button
          type="submit"
          className=" bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 shadow-xl"
        >
          보내기
        </button>
      </form>
    </div>
  );
};

export default PromptDetailPage;
