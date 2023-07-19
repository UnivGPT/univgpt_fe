import { useEffect } from "react";
import axios from "axios";

const KakaoCallback = () => {
    useEffect(() => {
        const params= new URL(document.location.toString()).searchParams;
        const code = params.get('code');
        const grantType = "authorization_code";
        // const REST_API_KEY = `${process.env.REACT_APP_REST_API_KEY}`;
        // const REDIRECT_URI = `${process.env.REACT_APP_REDIRECT_URL}`;
        
        const url = "http://127.0.0.1:8000/api/account/kakao";
        const data = {
            code: code,
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
export default KakaoCallback;