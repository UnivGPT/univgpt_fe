import { useEffect } from "react";
import axios from "axios";
import { socialSignIn } from "../api/api";

const NaverCallBack = () => {
  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get("code");
      const state = params.get("state");

      const data = {
        code: code,
        state: state,
        socials: 1,
      };

      try {
        await socialSignIn(data);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);
};

export default NaverCallBack;

// const REST_API_KEY = `${process.env.REACT_APP_NAVER_CLIENT_ID}`;
// const REST_API_SECRET = `${process.env.REACT_APP_NAVER_CLIENT_SECRET}`;

// 여기서 이렇게 하면 cors 에러 나니까 code랑 state를 장고 쪽으로 보내주고 나머지 처리는 장고에서 해야 할 듯...?
// axios.get(
//   `https://nid.naver.com/oauth2.0/token?client_id=${REST_API_KEY}&client_secret=${REST_API_SECRET}&grant_type=authorization_code&state=${state}&code=${code}`
// );

// 장고로 보내서 토큰 받고 유저 프로필 정보 받기 - 프론트로 전송 -> 보내는 건 code, state 받는 건 프로필정보(response), 토큰(cookie)
// 프론트는 정보를 받으면 로그인이 완료된 거니까 홈 화면으로 리다이렉트
