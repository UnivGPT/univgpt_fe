import logo from "../../assets/images/logo_horizontal.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import users from "../../data/users";

const Header = () => {
  const [isUser, setIsUser] = useState(users);

  return (
    <div id="header-wrapper" className="flex justify-between">
      <div className="flex items-center">
        <Link to="/"><img id="header-logo" src={logo} alt="logo" /></Link>
      </div>
      <div className="flex flex-row space-x-5 m-5">
        {isUser ? (
          <>
            <Link to="/mypage">마이페이지</Link>
            <Link to="/">로그아웃</Link>
          </>
        ) : (
          <>
            <Link to="/signup">회원가입</Link>
            <Link to="/signin">로그인</Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
