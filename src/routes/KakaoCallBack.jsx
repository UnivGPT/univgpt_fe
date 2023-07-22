import { useEffect } from "react";
import axios from "axios";
import { socialSignIn } from "../api/api";

const KakaoCallBack = () => {
  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get("code");

      const data = {
        code: code,
        state: "kakao",
        socials: 2,
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

export default KakaoCallBack;
