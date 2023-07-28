import { removeCookie } from "../utils/cookie";
import { instance, instanceWithToken } from "./axios";

export const signIn = async (data) => {
  let response;
  try {
    response = await instance.post("/account/signin/", data);
    if (response.status === 200) {
      window.location.href = "/";
    }
  } catch (error) {
    if (error.response.status === 400) {
      alert("아이디나 비밀번호가 일치하지 않습니다.");
    }
  }
};

export const socialSignIn = async (data) => {
  const response = await instance.get("/account/socials/", { params: data });
  if (response.status === 200) {
    window.location.href = "/";
  } else {
    console.log("Error");
  }
};

export const signUp = async (data) => {
  const response = await instance.post("/account/signup/", data);
  if (response.status === 200) {
    window.location.href = "/";
  }
  return response;
};

export const refreshToken = async (token) => {
  const response = await instance.post("/account/refresh/", { refresh: token });
  if (response.status === 200) {
    console.log("REFRESH TOKEN SUCCESS");
  } else {
    console.log("[ERROR] error while refreshing token");
  }
};

export const logOut = async (token) => {
  const response = await instanceWithToken.post("/account/logout/", {
    refresh: token,
  });
  if (response.status === 204) {
    console.log("LOGOUT SUCCESS");

    removeCookie("refresh_token");
    removeCookie("access_token");

    window.location.href = "/";
  } else {
    console.log("[ERROR] error while logging out");
  }
};

export const getUserProfile = async () => {
  const response = await instanceWithToken.get("/account/info/");
  if (response.status === 200) {
    console.log("GET USER SUCCESS");
  } else {
    console.log("[ERROR] error while getting profile");
  }
  return response;
};

export const checkPassword = async (data) => {
  let response;
  try {
    response = await instanceWithToken.post("/account/info/", data);
    if (response.status === 200) {
      window.location.href = "/infoedit";
    }
  } catch (error) {
    if (error.response.status === 400) {
      alert("비밀번호가 일치하지 않습니다.");
    } else if (error.response.status === 406) {
      alert("소셜 간편 로그인은 회원 정보를 변경할 수 없습니다.");
    }
    console.error(error);
  }
  return response;
};

export const editUserProfile = async (formData) => {
  const response = await instanceWithToken.patch("/account/info/", formData);
  if (response.status === 200) {
    console.log("EDIT USER SUCCESS");
    window.location.href = "/";
    removeCookie("access_token");
  } else {
    console.log("[ERROR] error while editting profile");
  }
  return response.data;
};

export const getPromptList = async () => {
  const response = await instance.get("/prompt/");
  return response.data;
};

export const getPromptDetail = async (id) => {
  const response = await instance.get(`/prompt/${id}/`);
  console.log("RESPONSE", response.data);
  return response.data;
};

export const createPrompt = async (data, navigate) => {
  const response = await instanceWithToken.post("/prompt/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
    const prompt_id = response.id;
    // navigate(`/${prompt_id}/`);
  } else {
    console.log("[ERROR] error while creating prompt");
  }
  return response;
};

export const updatePrompt = async (id, data, navigate) => {
  const response = await instanceWithToken.put(`/prompt/${id}/`, data);
  if (response.status === 200) {
    console.log("PROMPT UPDATE SUCCESS");
  } else {
    console.log("[ERROR] error while updating prompt");
  }
};

export const deletePrompt = async (id, navigate) => {
  const response = await instanceWithToken.delete(`/prompt/${id}/`);
  if (response.status === 204) {
    console.log("POST DELETE SUCCESS");
    navigate("/");
  } else {
    console.log("[ERROR] error while deleting prompt");
  }
};

export const likePrompt = async (promptId) => {
  const response = await instanceWithToken.post(`/prompt/${promptId}/like/`);
  if (response.status === 200) {
    console.log("PROMPT LIKE SUCCESS");
    return response.data;
  } else {
    console.log("[ERROR] error while liking post");
  }
};

export const getCategoryList = async () => {
  const response = await instance.get("/category/");
  return response;
};

export const getCategoryDetail = async (categoryId) => {
  const response = await instanceWithToken.get(`/category/${categoryId}/`);
  return response;
};

export const getCommentList = async (promptId) => {
  const response = await instance.get(`/comment/?prompt=${promptId}`);
  return response;
};

export const createComment = async (data) => {
  const response = await instanceWithToken.post("/comment/", data);
  if (response.status === 201) {
    console.log("COMMENT SUCCESS");
    // window.location.reload(); // 새로운 코멘트 생성시 새로고침으로 반영
  } else {
    console.log("[ERROR] error while creating comment");
  }
  return response;
};

export const deleteComment = async (id) => {
  const response = await instanceWithToken.delete(`/comment/${id}/`);
  if (response.status === 204) {
    console.log("COMMENT DELETE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while deleting comment");
  }
};

export const createInput = async (data) => {
  const response = await instanceWithToken.post("/input/", data);
  if (response.status === 201) {
    // console.log("POST SUCCESS");
  } else {
    console.log("[ERROR] error while creating input");
  }
  return response;
};

export const deleteInput = async (id) => {
  const response = await instanceWithToken.delete(`/input/${id}/`);
  if (response.status === 204) {
    console.log("INPUT DELETE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while deleting input");
  }
};

export const getOptionList = async (data) => {
  // console.log("method called");
  const response = await instance.post("/option/frominput/", data);
  // const response = await instanceWithToken.post("/option/frominput/", data);
  // console.log("RESPONSERESPONSE", response.data);
  return response.data;
};

export const createOption = async (data) => {
  const response = await instanceWithToken.post("/option/", data);
  if (response.status === 201) {
    console.log("OPTION SUCCESS");
  } else {
    console.log("[ERROR] error while creating option");
  }

  return response;
};

export const deleteOption = async (id) => {
  const response = await instanceWithToken.delete(`/option/${id}/`);
  if (response.status === 204) {
    console.log("OPTION DELETE SUCCESS");
    window.location.reload();
  } else {
    console.log("[ERROR] error while deleting option");
  }
};

// export const updateOption = async (id, data) => {
//   const response = await instanceWithToken.patch(`/option/${id}/`, data);
//   if (response.status === 200) {
//     console.log("OPTION UPDATE SUCCESS");
//   } else {
//     console.log("[ERROR] error while updating option");
//   }
// };

export const getUser = async () => {
  const response = await instanceWithToken.get("/account/info/");
  if (response.status === 200) {
    console.log("GET USER SUCCESS");
  } else {
    console.log("[ERROR] error while getting user");
  }
  return response.data;
};

export const getSecureUser = async () => {
  const response = await instanceWithToken.get("/account/secureinfo/");
  if (response.status === 200) {
    console.log("GET SECUREUSER SUCCESS");
  } else {
    console.log("[ERROR] error while getting secureuser");
  }
  return response.data;
};

export const gptCallBack = async (data) => {
  console.log("FUNCAIJIWEIFEIQEWIFUI");
  const response = await instance.post("/prompt/gpt/", data);
  if (response.status === 200) {
    console.log("GPT CALLBACK SUCCESS");
  } else {
    console.log("[ERROR] error while gpt callback");
  }
  return response;
};
