import {RiKakaoTalkFill} from "react-icons/ri";
import {SiNaver} from "react-icons/si";
import {BsGithub} from "react-icons/bs";
import { useState } from "react";
import { signIn } from "../api/api";

const SignInPage = () => {
	
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	  });

	const handleFormData = (e) => {
		const { id, value } = e.target;
		setFormData({ ...formData, [id]: value });
	  };

  	const handleSignInSubmit = (e) => {
		e.preventDefault();
		signIn(formData);
    	alert("로그인이 완료되었습니다!");
  };
	

  return (
    <div className="flex flex-col items-center w-1/2">
		<br></br>
		<br></br>
      <h3 className="font-semibold text-5xl">UnivGPT 로그인</h3>
		<br></br>
      <form className="form-a" onSubmit={handleSignInSubmit}>
        <label className="label font-bold text-l" htmlFor="email">
          이메일
        </label>
        <input required type="email" id="email" className="input" onChange={handleFormData} value={formData.email} />
        <label htmlFor="password" className="label font-bold text-l">
          비밀번호
        </label>
        <input required type="password" id="password" className="input" onChange={handleFormData} value={formData.password} />
        <br></br>
		<button type="submit" className="button mt-7">
          로그인
        </button>
		<br></br>
		<div className="flex flex-row items-center space-x-14"> 
		<RiKakaoTalkFill size= "60"/> 
		<SiNaver size= "50"/>
		<BsGithub size= "60"/> </div>
		<br></br>
		<h3 className="text-l">UnivGPT 계정이 없으신가요?  회원가입 하러가기</h3>
      </form>
			
    </div>
  );
};

export default SignInPage;