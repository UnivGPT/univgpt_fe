import { Link } from "react";

export const SmallPrompt = ({ rank, prompt }) => {
  return (
    <div className="flex flex-row rounded-xl bg-white  border-gray-300 shadow p-3 m-1">
      <div className="m-1 pt-2 pr-2">{rank}</div>
      <div className="flex flex-col">
        <div className="text-sm font-semibold">{prompt.title}</div>
        <div className="flex flex-ro text-sm justify-end">
          <div className="font-bold">❤️ {prompt.like}</div>
          <div className="pl-2 font-bold">👀 {prompt.view}</div>
        </div>
      </div>
    </div>
  );
};

export const MidPrompt = ({ prompt }) => {
  return (
    <div className="flex flex-col w-80 h-60 space-y-8 p-5 shadow-xl m-3 rounded-3xl border-gray-300 border bg-white">
      <div className="font-semibold text-lg">{prompt.title}</div>
      <div className="font-medium">{prompt.description}</div>
      <div className="flex flex-row space-x-2">
        <div className="font-bold">❤️ {prompt.like}</div>
        <div className="font-bold">👀 {prompt.view}</div>
      </div>
      {/* <Link to="">이 프롬프트 사용하기</Link> */}
    </div>
  );
};

export const MyPagePrompt = ({ prompt }) => {
  return (
    <div className="flex flex-col w-75 h-60 space-y-8 p-5 shadow-xl m-3 rounded-3xl  border-gray-300 bg-white">
      <div className="font-semibold text-lg">{prompt.title}</div>
      <div className="font-medium">{prompt.description}</div>
      <div className="flex flex-row space-x-2 align-start">
        <div className="font-bold">❤️ {prompt.like}</div>
        <div className="font-bold">👀 {prompt.view}</div>
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
