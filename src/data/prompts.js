const prompts = [
  {
    id: 1,
    title: "코드에 주석달기",
    description:
      "내가 작성한 코드를 한 줄씩 자세하게 설명해주는 주석을 달아주는 프롬프트(과제용)",
    content: "#코드에 주석 달아줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 73,
    view: 113,
  },
  {
    id: 2,
    title: "여행 계획",
    description:
      "여행 장소와 숙박 일정 등을 입력하면 여행 계획을 짜주는 프롬프트(과제용)",
    content: "#장소에 #숙박일정으로 놀러갈거야, 여행 계획 짜줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 56,
    view: 122,
  },
];

export default prompts;
