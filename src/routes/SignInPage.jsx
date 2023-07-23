import { RiKakaoTalkFill } from "react-icons/ri";
import { SiNaver } from "react-icons/si";
import { AiOutlineGoogle } from "react-icons/ai";
import { useState, useEffect } from "react";
import { signIn } from "../api/api";
import { Link } from "react-router-dom";
import axios from "axios";

const SignInPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    signIn(formData);
  };

  const NaverLogin = () => {
    const naverClient = process.env.REACT_APP_NAVER_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_NAVER_REDIRECT_URI;
    const state = "false";
    const naverAuthUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${naverClient}&state=${state}&redirect_uri=${redirectUrl}`;

    window.location.href = naverAuthUrl;

    // const url = new URL(window.location.href);
    // const code = url.searchParams.get("code");
    // console.log("code", code);
  };

  const GoogleLogin = () => {
    const googleClient = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const redirectUrl = process.env.REACT_APP_GOOGLE_REDIRECT_URI;
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClient}&redirect_uri=${redirectUrl}&response_type=code&scope=email%20profile`;

    window.location.href = googleAuthUrl;
  };

  const KakaoLogin = () => {
    const CLIENT_ID = process.env.REACT_APP_KAKAO_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const kakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    window.location.href = kakaoURL;
  };

  return (
    <div className="flex flex-col items-center w-1/2">
      <br></br>
      <br></br>
      <h3 className="font-semibold text-5xl">UnivGPT 로그인</h3>
      <br></br>
      <form className="form-a" onSubmit={handleSignInSubmit}>
        <label className="label font-bold text-l" htmlFor="username">
          아이디
        </label>
        <input
          required
          type="text"
          id="username"
          className="input"
          onChange={handleFormData}
          value={formData.username}
        />
        <label htmlFor="password" className="label font-bold text-l">
          비밀번호
        </label>
        <input
          required
          type="password"
          id="password"
          className="input"
          onChange={handleFormData}
          value={formData.password}
        />
        <br></br>
        <button type="submit" className="button-a mt-7">
          로그인
        </button>
        <br></br>
        <br></br>
        <div className="flex flex-row items-center space-x-14">
          <RiKakaoTalkFill size="60" onClick={KakaoLogin} />
          <SiNaver size="50" onClick={NaverLogin} />
          <AiOutlineGoogle size="70" onClick={GoogleLogin} />
        </div>
        <br></br>
        <br></br>
        <h3 className="text-l">
          UnivGPT 계정이 없으신가요?{" "}
          <Link to="/signup" className="font-bold text-teal-300">
            {" "}
            회원가입
          </Link>
          하러 가기
        </h3>
      </form>
    </div>
  );
};

export default SignInPage;
