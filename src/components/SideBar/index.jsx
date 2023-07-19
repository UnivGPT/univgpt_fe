import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { SmallPrompt } from "../Prompts";
import Comment from "../Comments";
import comments from "../../data/comments";

export const HomeSideBar = ({ user, prompt }) => {
  console.log(user);
  console.log(user[0].username);

  return (
    <div className="flex flex-col space-y-4 align-middle items-center">
      <Link to="/:promptId/make" className="button w-11/12">
        내 프롬프트 만들기
      </Link>
      <div>
        <HiUserCircle size="150" />
        <div>{user[0].username} 님 반갑습니다!</div>
      </div>
      <div className="w-52 bg-slate-100 rounded-3xl border-solid border-slate-300 border-2 text-black p-3 space-y-2 pb-10">
        <div className="ml-3 mb-3">오늘의 프롬프트</div>
        <SmallPrompt rank="🥇" prompt={prompt[0]} />
        <SmallPrompt rank="🥈" prompt={prompt[1]} />
        <SmallPrompt rank="🥉" prompt={prompt[2]} />
        <SmallPrompt rank="4" prompt={prompt[3]} />
        <SmallPrompt rank="5" prompt={prompt[4]} />
      </div>
    </div>
  );
};

export const PromptSideBar = (user, prompt, comment) => {
  return (
    <div className="flex flex-col space-y-5">
      <Link to="/:promptId/make" className="w-full button">내 프롬프트 만들기</Link>
      <div>
        <HiUserCircle size="150" />
        <div>{user.username} 님에 의해 생성된 프롬프트</div>
      </div>
      <div>
        <div>프롬프트 정보</div>
        <div>👀 {prompt.view}</div>
        <div>❤️ {prompt.like}</div>
      </div>
      <div>
        <div>{comments.length}개의 댓글</div>
        <Comment />
      </div>
    </div>
  );
};
