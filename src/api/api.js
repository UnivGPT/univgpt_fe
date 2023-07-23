import { instance, instanceWithToken } from "./axios";
// Account 관련 말고 다른 API들 추후 추가해야!
// Account 관련 API들
export const signIn = async (data) => {
  const response = await instance.post("/account/signin/", data);
  if (response.status === 200) {
    window.location.href = "/";
  } else {
    console.log("Error");
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

export const checkPassword = async (data) => {
  let response;
  try {
    response = await instanceWithToken.post("/account/info/", data);
    if (response.status === 200) {
      alert("비밀번호가 일치하네용");
      window.location.href = "/infoedit";
    }
  } catch (error) {
    if (error.response.status === 400) {
      alert("비밀번호가 일치하지 않네용");
    } else if (error.response.status === 401) {
      alert("소셜 간편 로그인은 안됩니다");
    }
    console.error(error);
  }
  return response;
};

export const getPromptList = async () => {
  const response = await instance.get("/prompt/");
  return response.data;
};

export const getPromptDetail = async (id) => {
  const response = await instance.get(`/prompt/${id}/`);
  return response.data;
};

export const createPrompt = async (data, navigate) => {
  const response = await instanceWithToken.post("/prompt/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
    const prompt_id = response.id;
    navigate(`/${prompt_id}/`);
  } else {
    console.log("[ERROR] error while creating prompt");
  }
};

export const updatePrompt = async (id, data, navigate) => {
  const response = await instanceWithToken.patch(`/prompt/${id}/`, data);
  if (response.status === 200) {
    console.log("PROMPT UPDATE SUCCESS");
    navigate(-1);
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
    window.location.reload();
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
    window.location.reload(); // 새로운 코멘트 생성시 새로고침으로 반영
  } else {
    console.log("[ERROR] error while creating comment");
  }
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

export const getInputList = async () => {
  const response = await instance.get("/input/");
  return response;
};

export const createInput = async (data) => {
  const response = await instanceWithToken.post("/input/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
  } else {
    console.log("[ERROR] error while creating input");
  }
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
  const response = await instanceWithToken.get("/option/", data);
  return response;
};

export const createOption = async (data) => {
  const response = await instanceWithToken.post("/option/", data);
  if (response.status === 201) {
    console.log("POST SUCCESS");
  } else {
    console.log("[ERROR] error while creating option");
  }
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

export const updateOption = async (id, data) => {
  const response = await instanceWithToken.patch(`/option/${id}/`, data);
  if (response.status === 200) {
    console.log("OPTION UPDATE SUCCESS");
  } else {
    console.log("[ERROR] error while updating option");
  }
};
