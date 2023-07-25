import { useState, useEffect } from "react";
import { getPromptDetail, getOptionList, getCommentList } from "../api/api";
import { PromptSideBar } from "../components/SideBar";
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
  // const navigate = useNavigate();

  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getPromptDetailAPI = async () => {
      const response = await getPromptDetail(promptId);
      setPrompt(response.prompt);
      setInput(response.inputs);
      const inputIds = response.inputs
        .filter((item) => item.type === 0)
        .map((item) => item.id);
      const results = await Promise.all(
        inputIds.map(async (id) => {
          const response = await getOptionList({ input: id });
          return response;
        })
      );
      const OptionResult = results.flat();
      setOption(OptionResult);
      setOption(results);
    };

    const getCommentsAPI = async () => {
      const comments = await getCommentList(promptId);
      setComments(comments);
    };

    getCommentsAPI();
    getPromptDetailAPI();
  }, [promptId]);

  useEffect(() => {
    console.log("prompt", prompt);
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
        <div className="h-full flex flex-col space-y-5 bg-white text-black rounded-tr-3xl p-5"></div>
        {/*<PromptSideBar
          key={prompt.id}
          user={prompt.author}
          prompt={prompt}
          comment={comments}
  />*/}
      </div>
      *{/*PromptResult 모달*/}
      {resultPage ? (
        <div className="flex-grow flex flex-col justify-center items-center h-4/5 w-2/3 bg-gray-200 text-black p-20 px-36 mx-20 mt-8 rounded-3xl">
          {/*프롬프트 통한 질문*/}
          <div className="flex justify-center items-center mx-24 mt-2">
            <div className="flex justify-start">
              <div className="bubble-a section-a">
                <h1 className="font-medium p-4 pl-6 align-middle overflow-y-auto ">
                  각 지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고,
                  제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침
                  최저기온은 니다. 날씨를 전해 드렸습니다.각 지방의 내일
                  날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고, 제주도와 울릉도
                  독도에는 한두 차례 눈이 오겠습니다. 아침 최저기온은 니다.
                  날씨를 전해 드렸습니다.각 지방의 내일 날씨입니다. 내일은 맑은
                  뒤 구름이 많이 끼겠고, 제주도와 울릉도 독도에는 한두 차례 눈이
                  오겠습니다. 아침 최저기온은 니다. 날씨를 전해 드렸습니다.각
                  지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고,
                  제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침
                  최저기온은 니다. 날씨를 전해 드렸습니다.
                </h1>
              </div>
              <div className="bubble-a-after mt-14"></div>
            </div>
            <HiUserCircle size="186" className="profile flex flex-col mr-6" />
          </div>

          {/*GPT 답변*/}
          <div className="flex justify-center items-center mx-24 mt-6">
            <img
              id="gpt-logo"
              src={gpt_logo}
              alt="gpt_logo"
              className="flex flex-col items-center w-36 h-36 mb-4"
            />
            <div className="flex justify-start">
              <div className="bubble-b-after mt-28"></div>
              <div className="bubble-b section-a items-center">
                <h1 className="font-medium p-4 pl-6 inline-block align-middle  overflow-y-auto ">
                  각 지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고,
                  제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침
                  최저기온은 니다. 날씨를 전해 드렸습니다.각 지방의 내일
                  날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고, 제주도와 울릉도
                  독도에는 한두 차례 눈이 오겠습니다. 아침 최저기온은 니다.
                  날씨를 전해 드렸습니다.각 지방의 내일 날씨입니다. 내일은 맑은
                  뒤 구름이 많이 끼겠고, 제주도와 울릉도 독도에는 한두 차례 눈이
                  오겠습니다. 아침 최저기온은 니다. 날씨를 전해 드렸습니다.각
                  지방의 내일 날씨입니다. 내일은 맑은 뒤 구름이 많이 끼겠고,
                  제주도와 울릉도 독도에는 한두 차례 눈이 오겠습니다. 아침
                  최저기온은 니다. 날씨를 전해 드렸습니다.
                </h1>
              </div>
            </div>
          </div>
          <br></br>
          <br></br>
          {/*버튼*/}
          <button
            type="button"
            onClick={() => {
              setResultPage(false);
              // console.log(resultPage);
            }}
            className=" bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 mt-18 shadow-xl"
          >
            나가기
          </button>
        </div>
      ) : (
        /*프롬프트 작성 폼*/
        <form className="flex-grow flex flex-col items-center justify-center h-4/5 w-2/3 bg-white text-black p-11 mx-20 mt-8 rounded-3xl">
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
    </div>
  );
};

export default PromptDetailPage;
