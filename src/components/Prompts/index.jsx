import { Link } from "react";

export const SmallPrompt = ({ rank, prompt }) => {
  return (
    <div>
      <div>{rank}</div>
      <div>
        <div>{prompt.title}</div>
        <div>
          <div>❤️ {prompt.like}</div>
          <div>👀 {prompt.view}</div>
        </div>
      </div>
    </div>
  );
};

export const MidPrompt = ({ prompt }) => {
  
  return (
    <div className="flex flex-col w-80 h-60 space-y-8 p-5 shadow-xl m-5 rounded-3xl">
      <div className="font-semibold text-lg">{prompt.title}</div>
      <div className="font-semibold">{prompt.description}</div>
      <div>
        <div>❤️ {prompt.like}</div>
        <div>👀 {prompt.view}</div>
      </div>
      {/* <Link to="">이 프롬프트 사용하기</Link> */}
    </div>
  );
};

export const BigPrompt = (prompt) => {
  return (
    <div>
      <div>{prompt.title}</div>
      <div>{prompt.description}</div>
      <div></div>
      <button>보내기</button>
    </div>
  );
};
