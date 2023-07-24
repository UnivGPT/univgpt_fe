import { useState, useEffect } from "react";
import { getPromptDetail, getOptionList } from "../api/api";
import { PromptSideBar } from "../components/SideBar";
import comments from "../data/comments";
// import prompts from "../data/prompts";
import users from "../data/users";
import Select from "react-select";
import { useParams } from "react-router-dom";
import emptyheart from "../assets/images/emptyheart.png";
import redheart from "../assets/images/redheart.png";

const PromptDetailPage = () => {
  const { promptId } = useParams();
  const [prompt, setPrompt] = useState([]);
  const [isUser, setIsUser] = useState(users);
  const [input, setInput] = useState([]);
  const [option, setOption] = useState([]);

  useEffect(() => {
    const getPromptDetailAPI = async () => {
      const response = await getPromptDetail(promptId);
      setPrompt(response.prompt);
      setInput(response.inputs);
      const inputIds = response.inputs
        .filter((item) => item.type === 0)
        .map((item) => item.id);
      console.log("INPUTID", inputIds);

      const results = await Promise.all(
        inputIds.map(async (id) => {
          const response = await getOptionList({ input: id });
          return response;
        })
      );

      const OptionResult = results.flat();

      console.log("RSRAERQ", OptionResult);

      setOption(OptionResult);

      // const filteredResults = results.filter(
      //   (result) =>
      //     result.data !== null &&
      //     result.data !== undefined &&
      //     Object.keys(result.data).length > 0
      // );
      // console.log("FILTERED RESULTS", filteredResults);
      setOption(results);
    };
    getPromptDetailAPI();
  }, [promptId]);

  useEffect(() => {
    console.log("prompt", prompt.title);
    console.log("INPUT", input);
  }, [prompt, input]);

  // const getOptions = async (inputId) => {
  //   try {
  //     const data = {
  //       input: inputId,
  //     };
  //     const response = await getOptionList(data);

  //     if (response && response.data) {
  //       const originalOptions = response.data;
  //       const processedOptions = originalOptions.map((option) => ({
  //         value: option.name,
  //         label: generateRandomLabel(), // 랜덤한 문자열 생성 함수를 호출하여 label에 할당
  //       }));
  //       return processedOptions;
  //     }

  //     return ""; // 서버 응답이 없거나 비어있는 경우 빈 배열 반환
  //   } catch (error) {
  //     console.error("Error fetching options:", error);
  //     return []; // 에러가 발생한 경우 빈 배열 반환 또는 에러 처리를 원하는 방식으로 처리
  //   }
  // };

  // function generateRandomLabel() {
  //   // 랜덤한 문자열을 생성하여 반환하는 함수 구현 (예시)
  //   const randomString = Math.random().toString(36).substring(7);
  //   return `Random Label - ${randomString}`;
  // }

  // console.log(isUser);
  // 	const [newPrompt, setNewPrompt] = useState({
  //     title: "",
  //     content: "",
  //     category: [],
  //     description: "",
  //   });
  // 	const handlechange = (e) => {
  //     setNewPrompt
  //   };

  return (
    <div className="w-screen h-screen flex flex-row ">
      <div className="w-60">
        <PromptSideBar
          key={isUser.id}
          user={isUser[0]}
          prompt={prompt}
          comment={comments[0]}
        />
      </div>

      <form className="flex-grow flex flex-col items-center justify-center h-4/5 w-2/3 bg-white text-black p-11 mx-20 rounded-3xl">
        <h1 className="font-bold text-7xl text-gpt-indigo">{prompt.title}</h1>

        <h1 className="font-extrabold text-xl text-gpt-indigo mt-4">
          {prompt.description}
        </h1>
        <br></br>
        <div className="rounded-3xl bg-gray-200 px-8 pb-5 mx-6 h-96 w-5/6 overflow-y-scroll">
          <div className="flex flex-col w-full justify-between">
            {input.map((item, index) => {
              if (item.type === 0) {
                const options = option
                  .flat()
                  .filter((opt) => opt.input === item.id)
                  .map((opt) => {
                    return {
                      value: opt.name,
                      label: opt.name,
                    };
                  });
                return (
                  <div key={index}>
                    <div className="button-f">{item.name}</div>
                    <Select key={index} options={options} />
                  </div>
                );
              } else {
                return (
                  <div key={index}>
                    <div className="button-f">{item.name}</div>
                    <input
                      required
                      type="text"
                      placeholder="요약을 원하는 자료 조사 내용을 작성해주세요"
                      className="input-c"
                    />
                  </div>
                );
              }
            })}
          </div>
        </div>
        <br></br>
        {/*버튼*/}
        <button
          type="submit"
          className=" bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 shadow-xl"
        >
          보내기
        </button>
      </form>
    </div>
  );
};

export default PromptDetailPage;
