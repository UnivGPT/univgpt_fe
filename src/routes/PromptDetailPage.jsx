import { useState, useEffect } from "react";
import {
  getSecureUser,
  getPromptDetail,
  getOptionList,
  getCommentList,
  getUserProfile,
  gptCallBack,
} from "../api/api";
import { PromptSideBar } from "../components/SideBar";
import Select from "react-select";
import { useParams } from "react-router-dom";
import { HiUserCircle } from "react-icons/hi";
import gpt_logo from "../assets/images/logo_gpt.png";
import { getCookie } from "../utils/cookie";
import Avatar from "react-avatar";

const PromptDetailPage = () => {
  const { promptId } = useParams();
  const [prompt, setPrompt] = useState([]);
  const [input, setInput] = useState([]);
  const [option, setOption] = useState([]);
  const [resultPage, setResultPage] = useState(false);
  const [resultArray, setResultArray] = useState([]);
  const [inputArray, setInputArray] = useState([]);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("응답을 불러오는 중입니다...");
  const [profile, setProfile] = useState({
    profile: { id: "", socials_username: "" },
    username: "",
    id: "",
  });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    if (getCookie("access_token")) {
      const getUserProfileAPI = async () => {
        const response = await getSecureUser();
        setProfile({
          profile: {
            id: response.profile.id,
            socials_username: response.profile.socials_username,
          },
          username: response.username,
          id: response.id,
        });
      };
      getUserProfileAPI();
    }
  }, []);

  console.log(profile.username);

  useEffect(() => {
    const result = resultArray.map((item) => {
      if (typeof item === "number") {
        return inputArray[item - 1];
      } else {
        return item;
      }
    });
    setMessage(result.join(" "));
  }, [inputArray]);

  function createArrayOfEmptyStrings(count) {
    if (count <= 0) {
      return [];
    }

    return Array.from({ length: count }, () => "");
  }

  const handlegptCall = async (e) => {
    e.preventDefault();
    setAnswer("응답을 불러오는 중입니다...");
    setResultPage(true);
    const data = { content: message };
    const response = await gptCallBack(data);
    const gptAnswer = response.data;
    console.log(gptAnswer);
    setAnswer(gptAnswer.content);
  };

  useEffect(() => {
    const getPromptDetailAPI = async () => {
      const response = await getPromptDetail(promptId);
      setPrompt(response.prompt);
      if (response.prompt) {
        const inputString = response.prompt.content;
        const result = parseInputString(inputString);
        console.log(result);
        setResultArray(result);
      }
      setInput(response.inputs);

      const inputIds = response.inputs
        .filter((item) => item.type === 0)
        .map((item) => item.id);
      console.log("INPUT LENGTH", response.inputs.length);
      console.log(response.inputs);
      setInputArray(createArrayOfEmptyStrings(response.inputs.length));

      const results = await Promise.all(
        inputIds.map(async (id) => {
          const response = await getOptionList({ input: id });
          return response;
        })
      );
      console.log(results.flat());

      setOption(results.flat());
    };

    getPromptDetailAPI();
  }, [promptId]);

  useEffect(() => {
    console.log("INPUT", input);
  }, [input]);

  function parseInputString(inputString) {
    const resultString = inputString.replace(/\$[^\$]+\$/g, "");
    const resultArray1 = resultString.split("|").join("").split(" ");

    const resultArray2 = resultArray1.map((item) => {
      if (!isNaN(item)) {
        return parseInt(item, 10);
      }
      return item;
    });

    return resultArray2;
  }

  useEffect(() => {
    const newUserName = profile.profile.socials_username || profile.username;
    setUserName(newUserName);
  }, [profile]);

  const colors = [
    "#BACDFF",
    "#EFB4ED",
    "#E1BAFF",
    "#FFBEBA",
    "#FED4AD",
    "#9EDF8E",
  ];

  console.log(userName);
  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-60">
        {prompt.id ? (
          <PromptSideBar resultPage={resultPage} prompt={prompt} />
        ) : (
          <div></div>
        )}
      </div>
      {/* PromptResult 모달 */}
      {resultPage ? (
        <div className="flex-grow flex flex-col justify-center items-center h-4/5 w-2/3 bg-gray-200 text-black mx-20 mt-8 rounded-3xl">
          {/* 질문답변 */}
          <div className="rounded-3xl bg-gray-200 px-8 pb-3 mr-8 mx-6 h-4/5 w-5/6">
            {/* 프롬프트 통한 질문 */}
            <div className="flex justify-center items-center mt-2 w-full h-1/3">
              <div className="flex justify-start w-full h-full">
                <div className="flex bubble-a section-a items-center overflow-y-auto overflow-x-hidden w-3/4 h-1/3">
                  <div className="inline-block align-middle whitespace-pre-line font-notosanskr !my-auto p-4 pl-6">
                    {message}
                  </div>
                </div>
                <div className="bubble-a-after mt-14"></div>
              </div>
              <Avatar
                color={colors[userName.length % colors.length]}
                name={userName}
                className="rounded-full mb-7 mt-1 self-center font-bold !text-4xl !h-40 !w-40"
              />
            </div>

            {/* GPT 답변 */}
            <div className="flex justify-center items-center mt-5 w-full h-1/2">
              <div className="flex justify-start w-full h-full">
                <div className="flex flex-col justify-center items-center w-1/4 h-auto">
                  <img
                    id="gpt-logo"
                    src={gpt_logo}
                    alt="gpt_logo"
                    className="h-40 w-40"
                  />
                </div>
                <div className="bubble-b-after mt-28"></div>
                <div className="flex bubble-b section-a items-center overflow-y-auto overflow-x-hidden w-full h-2/3">
                  <div className="font-medium p-6 pl-9 font-notosanskr inline-block align-middle whitespace-pre-line !my-auto">
                    {answer}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <button
            type="button"
            onClick={() => {
              setResultPage(false);
              // console.log(resultPage);
            }}
            className="bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 !mb-2 shadow-xl"
          >
            나가기
          </button>
        </div>
      ) : (
        /* 프롬프트 작성 폼 */
        <form
          onSubmit={handlegptCall}
          className="flex-grow flex flex-col items-center justify-center h-4/5 w-2/3 bg-white text-black p-11 mx-20 mt-8 rounded-3xl"
        >
          <h1 className="font-bold text-7xl text-gpt-indigo">{prompt.title}</h1>
          <h1 className="font-extrabold text-xl text-gpt-indigo mt-4">
            {prompt.description}
          </h1>
          <br></br>
          <div className="rounded-3xl bg-gray-200 px-8 pb-5 mr-8 mx-6 h-96 w-5/6 overflow-y-auto section-d">
            <div className="flex flex-col w-full justify-between">
              {input.map((item, index) => {
                if (item.type === 0) {
                  console.log(item);
                  console.log(option);
                  const options = option
                    .flat()
                    .filter((opt) => opt.input === item.id)
                    .map((opt) => {
                      return {
                        value: opt.name,
                        label: opt.name,
                      };
                    });
                  // 객관식
                  return (
                    <div key={index}>
                      <div className="button-f mb-1">{item.name}</div>
                      <Select
                        key={index}
                        options={options}
                        onChange={(e) => {
                          const newArray = [...inputArray];
                          newArray[index] = e.value;
                          setInputArray(newArray);
                        }}
                      />
                    </div>
                  );
                } else if (item.type === 1) {
                  return (
                    <div key={index}>
                      <div className="button-f">{item.name}</div>
                      <input
                        required
                        type="text"
                        placeholder={item.placeholding}
                        className="input-c"
                        onChange={(e) => {
                          const newArray = [...inputArray];
                          newArray[index] = e.target.value;
                          setInputArray(newArray);
                        }}
                      />
                    </div>
                  );
                } else {
                  return (
                    <div key={index}>
                      <div className="button-f">{item.name}</div>
                      <textarea
                        required
                        placeholder={item.placeholding}
                        className="input-c !placeholder:self-center"
                        onChange={(e) => {
                          const newArray = [...inputArray];
                          newArray[index] = e.target.value;
                          setInputArray(newArray);
                        }}
                      />
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <br></br>
          <br></br>
          {/* 버튼 */}
          <button
            type="submit"
            className="bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 shadow-xl"
          >
            보내기
          </button>
        </form>
      )}
    </div>
  );
};

export default PromptDetailPage;
