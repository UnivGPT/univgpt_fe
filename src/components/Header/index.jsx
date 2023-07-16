import logo from "../../assets/images/logo_horizontal.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const [isUser, setIsUser] = useState("");

  return (
    <div id="header-wrapper" className="flex justify-between">
      <div className="flex items-center">
        <img id="header-logo" src={logo} alt="logo" />
      </div>
      <div className="flex flex-row space-x-5 m-5">
        {isUser ? (
          <>
            <Link to="">마이페이지</Link>
            <Link to="">로그아웃</Link>
          </>
        ) : (
          <>
            <Link to="">회원가입</Link>
            <Link to="">로그인</Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
