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
import { HiUserCircle } from "react-icons/hi";
import gpt_logo from "../assets/images/logo_gpt.png";

const PromptDetailPage = () => {
  const { promptId } = useParams();
  const [prompt, setPrompt] = useState([]);

  const [input, setInput] = useState([]);
  const [option, setOption] = useState([]);
  const [resultPage, setResultPage] = useState(false);
  //const navigate = useNavigate();

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
  console.log(prompt);

  return (
    <div className="w-screen h-screen flex flex-row ">
      <div className="w-60">
        <PromptSideBar
          key={prompt.id}
          user={prompt.author}
          prompt={prompt}
          comment={comments[0]}
        />
      </div>
      {resultPage ? (
        <div className="w-screen h-screen flex flex-col items-center">
          <form className="w-4/5 h-3/4 flex flex-col items-center bg-gray-200 text-black p-11 rounded-3xl ">
            {/*사용자 측 프롬프트 질문*/}
            <div className="flex justify-between mx-20">
              <div className="bubble-a font-medium overflow-x-hidden items-center overflow-y-auto ">
                각 지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고,
                제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침
                최저기온은 중서부 지방이 영하 23도에서 영하 14도, 영동과
                남부지방은 영하 13도에서 영하 8도로 몹시 추운 날씨가 내일
                아침까지도 계속되겠습니다. 그렇지만 낮 최고 기온은 영하 6도에서
                영상 1도의 분포로 오늘보다 3-4도 가량 올라갈 전망입니다.
              </div>
              <div className="bubble-a:left" />
              <HiUserCircle
                size="150"
                className="flex flex-col items-center ml-10"
              />
            </div>
            <br></br>
            {/*GPT 답변*/}
            <div className="flex justify-between mx-20">
              <img
                id="gpt-logo"
                src={gpt_logo}
                alt="gpt_logo"
                className="flex flex-col items-center mr-10 w-28 h-28"
              />
              <div className="bubble-b font-medium overscroll-y-auto line-clamp-4">
                각 지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고,
                제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침
                최저기온은 중서부 지방이 영하 23도에서 영하 14도, 영동과
                남부지방은 영하 13도에서 영하 8도로 몹시 추운 날씨가 내일
                아침까지도 계속되겠습니다. 그렇지만 낮 최고 기온은 영하 6도에서
                영상 1도의 분포로 오늘보다 3-4도 가량 올라갈 전망입니다. 날씨를
                전해 드렸습니다.
              </div>
              <div className="bubble-b:right" />
            </div>
            {/*버튼*/}
            <button
              type="button"
              onClick={() => {
                setResultPage(false);
                // console.log(resultPage);
              }}
              className=" bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 shadow-xl"
            >
              나가기
            </button>
          </form>
        </div>
      ) : (
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
          <br></br>
          {/*버튼*/}
          <button
            type="submit"
            className=" bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 shadow-xl"
            onClick={() => {
              setResultPage(true);
              // console.log(resultPage);
            }}
          >
            보내기
          </button>
        </form>
      )}
      ;
    </div>
  );
};

export default PromptDetailPage;
