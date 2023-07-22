const prompts = [
  {
    id: 1,
    title: "코드에 주석달기",
    description:
      "내가 작성한 코드를 한 줄씩 자세하게 설명해주는 주석을 달아주는 프롬프트(과제용)",
    content: "#코드에 주석 달아줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    category: [
      {
        id: 1,
        name: "과제",
      },
    ],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 73,
    view: 113,
  },
  {
    id: 2,
    title: "여행 계획 짜기",
    description:
      "여행 장소와 숙박 일정 등을 입력하면 여행 계획을 짜주는 프롬프트(여행용)",
    content: "#장소에 #숙박일정으로 놀러갈거야, 여행 계획 짜줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    category: [
      {
        id: 2,
        name: "여행",
      },
    ],
    created_at: "2023-07-13T04:16:50.658501Z",
    like: 56,
    view: 122,
  },
  {
    id: 3,
    title: "북한학개론 PPT 요약하기",
    description: "북한학개론 기말고사 준비를 위한 요약노트 만들기(시험공부용)",
    content: "#텍스트 내용을 500자로 요약해줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    category: [
      {
        id: 1,
        name: "과제",
      },
    ],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 73,
    view: 113,
  },
  {
    id: 4,
    title: "여행할 때 듣기 좋은 음악 추천받기",
    description: "여행할 때 듣기 좋은 음악을 추천해주는 프롬프트(음악)",
    content: "여행할 때 듣기 좋은 음악 추천해줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    category: [
      {
        id: 1,
        name: "음악",
      },
    ],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 34,
    view: 11,
  },
  {
    id: 5,
    title: "발표 대본 만들기",
    description: "자료조사 내용을 발표 대본 형태로 변환해주는 프롬프트(과제용)",
    content: "#공적인 말투로 #3분 분량의 #발표 대본을 만들어줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    category: [
      {
        id: 1,
        name: "과제",
      },
    ],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 77,
    view: 145,
  },
  {
    id: 6,
    title: "코드에 주석달기",
    description:
      "내가 작성한 코드를 한 줄씩 자세하게 설명해주는 주석을 달아주는 프롬프트(과제용)",
    content: "#코드에 주석 달아줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    category: [
      {
        id: 1,
        name: "과제",
      },
    ],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 113,
    view: 33,
  },

  {
    id: 7,
    title: "코드에 주석달기",
    description:
      "내가 작성한 코드를 한 줄씩 자세하게 설명해주는 주석을 달아주는 프롬프트(과제용)",
    content: "#코드에 주석 달아줘",
    author: { id: 1, username: "yoojin" },
    like_user: [1, 2],
    category: [
      {
        id: 1,
        name: "과제",
      },
    ],
    created_at: "2023-07-14T04:19:50.658501Z",
    like: 113,
    view: 33,
  },
];

export default prompts;
