import users from "../data/users";
import { HiUserCircle } from "react-icons/hi";
import { Link } from "react-router-dom";

const MyPage = (user) => {
  return (
    <div>
      <div>
        <HiUserCircle size="150" />
        <div>
          <div>{user.name} 님 환영합니다!</div>
          <Link to="">나의 프롬프트 {/*myprompt.count*/}개</Link>
          <Link to="">스크랩한 프롬프트 {/*prompt.count*/}개</Link>
        </div>
      </div>
    </div>
  );
};

export default MyPage;
