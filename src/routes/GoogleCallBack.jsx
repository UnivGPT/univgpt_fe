import { useEffect } from "react";
import axios from "axios";

const GoogleCallBack = () => {
  useEffect(() => {
    const params = new URL(document.location.toString()).searchParams;
    const code = params.get("code");

    console.log("code", code);

    const url = "http://127.0.0.1:8000/api/account/socials";
    const data = {
      code: code,
      socials: 3,
    };

    axios
      .get(url, { params: data })
      .then((response) => {
        console.log("Response", response.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  });
};

export default GoogleCallBack;
