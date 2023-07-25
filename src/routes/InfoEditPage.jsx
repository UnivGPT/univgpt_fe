import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import { getUserProfile, editUserProfile } from "../api/api";
import { getCookie } from "../utils/cookie";
import { BsCheckAll } from "react-icons/bs";

const InfoEditPage = () => {
  const handleChangeInfoSubmit = (e) => {
    e.preventDefault();
    editUserProfile(formData);
    alert("정보 수정이 완료되었습니다!");
  };

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  const handleFormData = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserProfileAPI = async () => {
        const response = await getUserProfile();
        const profile = response.data;
        setFormData({
          email: profile.email,
          username: profile.username,
          password: profile.password,
        });
      };
      getUserProfileAPI();
    }
  }, []);

  const navigate = useNavigate();

  const navigateMain = (e) => {
    navigate("/");
  };

  const navigateMypage = (e) => {
    e.preventDefault();
    navigate("/mypage");
  };

  return (
    <div className="flex flex-col items-center h-screen w-1/2">
      <br></br>
      <br></br>
      <h3 className="font-semibold text-5xl">회원정보 수정</h3>
      <br></br>
      {/*일단은 사이즈 보려고 이미지로 넣어놨으! 근데 사람 이름 이니셜로 아이콘 만드는 법 못 찾으면 계속 이미지 써야할지도ㅠㅠ*/}
      <HiUserCircle size="150" />
      <form className="form-a" onSubmit={handleChangeInfoSubmit}>
        {/*이메일은 수정 안되게 바꿔야*/}
        <label className="label font-bold text-l" htmlFor="email">
          이메일
        </label>
        <input
          required
          type="email"
          id="email"
          className="input"
          value={formData.email || ""}
          readOnly
        />
        <label className="label font-bold text-l" htmlFor="username">
          아이디
        </label>
        <input
          required
          type="text"
          id="username"
          className="input"
          value={formData.username || ""}
          onChange={handleFormData}
          readOnly
        />
        <label htmlFor="password" className="label font-bold text-l">
          {/*API 등등 다시 다 고쳐야!*/}새 비밀번호
        </label>
        <input
          required
          type="password"
          id="password"
          className="input"
          onChange={handleFormData}
          value={formData.password || ""}
        />
        <label htmlFor="confirm_password" className="label font-bold text-l">
          새 비밀번호 확인{" "}
        </label>
        <div className="w-full">
          <input
            required
            type="password"
            id="confirm_password"
            className="input"
            onChange={handleFormData}
            value={formData.confirm_password || ""}
          />
          {formData.confirm_password === "" ? (
            <>
              <br></br>
              <br></br>
            </>
          ) : formData.confirm_password === formData.password ? (
            <BsCheckAll className="checkIcon" size={25} />
          ) : (
            <>
              <br></br>
              <br></br>
            </>
          )}
        </div>

        <br></br>
        <div className="flex flex-row items-center space-x-14">
          <button
            type="submit"
            className="button-a mt-7"
            //onClick={navigateMain}
          >
            저장하기
          </button>
          {/*취소 버튼은 type을 뭘로 해야 할지? -> button으로 하면 submit 막아준대용*/}
          <button
            type="button"
            className="button-a mt-7"
            onClick={navigateMypage}
          >
            취소하기
          </button>
        </div>
        <br></br>
      </form>
    </div>
  );
};

export default InfoEditPage;
