import { checkPassword } from "../api/api";
import { useState, useEffect } from "react";

const InfoCheck = () => {
  const [password, setPassword] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    console.log("password input", password);
    const data = {
      password: password,
    };
    await checkPassword(data);
  };

  return (
    <div className="w-100% h-100% py-20 mx-10">
      <div className="border-box border-white bg-white rounded-3xl px-20 py-10 m-12">
        <div className="flex flex-col items-center">
          <h3 className="font-bold text-4xl text-black ">비밀번호 확인</h3>
          <br></br>
          <div className="items-center">
            <h1 className="font-semibold text-lg text-gray-700">
              회원정보를 안전하게 보호하기 위해
              <br></br>
              비밀번호를 한 번 더 입력해 주세요!
              <br></br>
              <br></br>
            </h1>
            <form
              className="form-b flex flex-col items-center"
              onSubmit={handlePasswordSubmit}
            >
              <input
                required
                type="password"
                id="password"
                className="input-b !w-11/12 !shadow-md"
                onChange={handlePasswordChange}
              />
              <div className="flex flex-col items-center w=1/2">
                <button
                  type="submit"
                  className="items-center button-b !px-8 !py-3 mt-7"
                >
                  확인
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCheck;
