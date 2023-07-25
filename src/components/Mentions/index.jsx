import { useState } from "react";
import { MentionsInput, Mention } from "react-mentions";
import defaultStyle from "./defaultStyle";

// const dummyInput = [
//   {
//     id: 1, //input id
//     display: "주제", //input name
//   },
//   { id: ["친절하게", "전문적으로"], display: "말투" },
//   { id: 3, display: "글자수" },
// ];

const customRenderSuggestion = (suggestion, search, highlightedDisplay) => {
  return (
    <div>
      <span>{highlightedDisplay}</span>
    </div>
  );
};

const customDisplayTransform = (id, display) => {
  console.log("CUSTOM DISPLAY TRANSFORM", id, display);
  return `#${display}`; // Add '#' symbol to the display text
};

// const handleMentionSelect = (mention) => {
//   // Add | before and after the mention value
//   const transformedValue = `|${mention.id}|`;
//   console.log("HANDLE MENTION SELECT");
//   return transformedValue;
// };

export const Mentions = ({ content, setContent, form }) => {
  console.log("MENTION CONTENT", content);
  console.log(content.match(/[^(]+(?=\))/g));

  const data = form.map((input, idx) => {
    console.log("INPUT", input);
    return {
      id: idx + 1,
      display: input.name,
    };
  });
  console.log("MENTION DATA", data);

  return (
    <div>
      <MentionsInput
        style={defaultStyle}
        value={content}
        onChange={(e) => setContent(e.target.value)}
        forceSuggestionsAboveCursor={true}
        placeholder={`ChatGPT에게 전달될 프롬프트를 작성해주세요. 
사용자의 입력값이 들어갔으면 하는 부분에 #을 입력하세요. 

[예시]
미팅 회의록을 요약해줘. 회의 주제는 #회의주제 이고, 요약할 때 말투는 #말투 로 해줘.`}
      >
        <Mention
          trigger="#"
          data={data}
          renderSuggestion={customRenderSuggestion}
          displayTransform={customDisplayTransform}
          appendSpaceOnAdd={true}
          markup="|__id__|$__display__$"
        />
      </MentionsInput>
    </div>
  );
};
