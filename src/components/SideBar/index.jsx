import { Link } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { SmallPrompt } from "../Prompts";
import { Comment } from "../Comments";

export const HomeSideBar = ( {user, prompt}) => {
  return (
    <div className="flex flex-col space-y-4 align-middle items-center">
      <Link to="" className="button w-11/12">내 프롬프트 만들기</Link>
      <div>
        <HiUserCircle size="150" />
        <div>{user.name} 님 반갑습니다!</div>
      </div>
      <div className="w-52 bg-slate-100 rounded-3xl border-solid border-slate-300 border-2 text-black p-3">
        <div>오늘의 프롬프트</div>
        <SmallPrompt rank="🥇" prompt={prompt} />
        <SmallPrompt rank="🥈" prompt={prompt} />
        <SmallPrompt rank="🥉" prompt={prompt} />
        <SmallPrompt rank="4" prompt={prompt} />
        <SmallPrompt rank="5" prompt={prompt} />
      </div>
    </div>
  );
};

export const PromptSideBar = (user, prompt, comment) => {
  return (
    <div>
      <Link to="">내 프롬프트 만들기</Link>
      <div>
        <HiUserCircle size="150" />
        <div>{user.name} 님에 의해 생성된 프롬프트</div>
      </div>
      <div>
        <div>프롬프트 정보</div>
        <div>👀 {prompt.view}</div>
        <div>❤️ {prompt.like}</div>
      </div>
      <div>
        <div>{comment.num}개의 댓글</div>
        <Comment />
      </div>
    </div>
  );
};
