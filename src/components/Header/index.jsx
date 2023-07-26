import logo from "../../assets/images/logo_horizontal.png";
import "./Header.css";
import { Link } from "react-router-dom";
import { getCookie, removeCookie } from "../../utils/cookie";
import { useState, useEffect } from "react";
// import users from "../../data/users";

const Header = () => {
  // const [isUser, setIsUser] = useState(users);
  const [isLoggedIn, setIsLoggedIn] = useState("");

  useEffect(() => {
    const loggedIn = getCookie("access_token") ? true : false;
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogout = () => {
    removeCookie("access_token");
    removeCookie("refresh_token");
    window.location.href = "/";
  };

  return (
    <div id="header-wrapper" className="flex justify-between">
      <div className="flex items-center">
        <Link to="/">
          <img id="header-logo" src={logo} alt="logo" />
        </Link>
      </div>
      <div className="flex flex-row space-x-5 m-5 mx-8">
        {/* {isUser ? ( */}
        {isLoggedIn ? (
          <>
            <Link to="/mypage" className="text-lg font-semibold mr-2">
              마이페이지
            </Link>
            <Link
              to="/"
              onClick={handleLogout}
              className="text-lg font-semibold"
            >
              로그아웃
            </Link>
          </>
        ) : (
          <>
            <Link to="/signup" className="text-m font-semibold">
              회원가입
            </Link>
            <Link to="/signin" className="text-m font-semibold">
              로그인
            </Link>
          </>
        )}
      </div>
    </div>
  );
};
export default Header;
