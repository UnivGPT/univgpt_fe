import { useState } from "react";
import prompts from "../data/prompts";
import users from "../data/users";
import { useEffect } from "react";
import { inputType } from "../data/category";

const PromptMakePage = () => {
  {
    /*+버튼 누르면 폼 생성*/
  }

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [form, setForm] = useState([]);
  {
    /*나중에 prompt에 넣어야*/
  }
  const [content, setContent] = useState("");
  //console.log(title);
  //console.log(description);
  //console.log(content);
  const [prompt, setPrompt] = useState({
    title: "",
    description: "",
    content: "",
  });
  useEffect(() => {
    setPrompt({ title: title, description: description, content: content });
  }, [title, description, content]);
  //console.log(prompt);

  // const promptInputAdd = () => {
  //   if () {

  //   }
  // }

  return (
    <div className="w-screen h-screen flex justify-evenly">
      {/*왼쪽 절반*/}
      <div className="bg-gpt-indigo w-1/2 h-full px-20 pb-6 pt-12">
        <h1 className="text-3xl font-bold mb-2.5">제목</h1>
        <input
          required
          type="text"
          className="input-d"
          maxLength={20}
          placeholder="제작하실 프롬프트의 제목을 20자 이내로 입력해주세요."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <h1 className="text-3xl font-bold mb-2.5">설명</h1>
        <input
          required
          type="text"
          className="input-d"
          maxLength={30}
          placeholder="프롬프트에 대한 30자 이내의 간단한 설명을 작성하세요."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h1 className="text-2xl font-bold mb-2.5 flex flex-col items-center">
          ____________________________________________________________________
        </h1>
        {/*input입력기*/}
        <h1 className="text-3xl font-bold mt-6 mb-2.5">입력값</h1>
        <div className="h-2/5 flex flex-col items-center overflow-y-auto">
          {form.map((el) => el)}{" "}
        </div>
        <div className="flex flex-col items-center">
          <button
            type="submit"
            className="button-plus"
            onClick={() => {
              setForm([
                ...form,
                <div className="flex flex-row">
                  <input className="input-b my-4" />
                  <select className="w-full" options={inputType} />
                </div>,
              ]);
            }}
          >
            +
          </button>
        </div>
      </div>

      {/*오른쪽 절반*/}
      <div className="bg-white text-black w-1/2 h-full p-10 pr-20">
        <h1 className="text-5xl font-bold mx-6 mb-8">프롬프트</h1>
        <div className="rounded-3xl bg-gray-200  mx-6 h-3/5 w-full flex flex-col">
          <textarea
            className="w-auto h-5/6 bg-gray-200 overflow-y-auto focus:border-transparent m-4 p-6 resize-none outline-none"
            placeholder=" ChatGPT에게 전달될 프롬프트를 작성해주세요.
      &#13;&#10;사용자의 입력값이 들어갔으면 하는 부분에 #을 입력하세요.
      &#13;&#10; [예시]
      &#13;&#10; 미팅 회의록을 요약해줘. 회의 주제는 #회의주제 이고,
      &#13;&#10; 요약할 때 말투는 #말투 로 해줘."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button className="button-a self-end m-8">미리보기</button>
        </div>
        {/*버튼*/}
        <div className="mt-12 flex justify-center">
          <button className="button-e mr-16" type="reset">
            삭제하기
          </button>
          <button
            className="button-d ml-16" /*onClick=서버로 프롬프트 덩어리를 보내는 함수*/
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptMakePage;
