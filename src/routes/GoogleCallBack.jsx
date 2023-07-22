import { useEffect } from "react";
import axios from "axios";
import { socialSignIn } from "../api/api";

const GoogleCallBack = () => {
  useEffect(() => {
    const fetchData = async () => {
      const params = new URL(document.location.toString()).searchParams;
      const code = params.get("code");

      const data = {
        code: code,
        state: "google",
        socials: 3,
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

export default GoogleCallBack;
