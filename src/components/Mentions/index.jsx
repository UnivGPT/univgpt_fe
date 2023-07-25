import { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import defaultStyle from "./defaultStyle";

const dummyInput = [
  {
    id: "젤리를 맛있게 먹는 방법",
    display: "주제",
  },
  { id: ["친절하게", "전문적으로"], display: "말투" },
  { id: "300", display: "글자수" },
];

const customRenderSuggestion = (suggestion, search, highlightedDisplay) => {
  return (
    <div>
      <span>{highlightedDisplay}</span>
    </div>
  );
};

const customDisplayTransform = (id, display) => {
  return `#${display}`; // Add '#' symbol to the display text
};

export const Mentions = () => {
  const [content, setContent] = useState("");
  console.log(content);
  console.log(content.match(/[^(]+(?=\))/g));
  return (
    <div>
      <MentionsInput
        style={defaultStyle}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        forceSuggestionsAboveCursor={true}
        placeholder={`ChatGPT에게 전달될 프롬프트를 작성해주세요. 
사용자의 입력값이 들어갔으면 하는 부분에 #을 입력하세요. 

[예시] 미팅 회의록을 요약해줘. 회의 주제는 #회의주제 이고, 요약할 때 말투는 #말투 로 해줘.`}
      >
        <Mention
          trigger="#"
          data={dummyInput}
          renderSuggestion={customRenderSuggestion}
          displayTransform={customDisplayTransform}
          appendSpaceOnAdd={true}
        />
      </MentionsInput>
    </div>
  );
};
