import { useState } from "react";

export const SearchEngine = (prompt) => {
  // [prompt에는 각 프롬프트들이 배열로 저장되어있어야 함 useState 활용할 것]
  const [userInput, setUserInput] = useState(" ");
  const getValue = (e) => {
    setUserInput(e.target.value.tolowercase());
  };

  const searched = prompt.filter((items) => items.title.tolowercase().includes(userInput))

  return (
    <div>
      <input
        onchange={getValue}
        value={userInput}
        placeholder="검색어를 입력하세요"
      />
    </div>
  );
};
