import { useState, useEffect } from "react";
import { gptCallBack } from "../../api/api";
import Select from "react-select";
import { MdOutlineCancel } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import gpt_logo from "../../assets/images/logo_gpt.png";
import Avatar from "react-avatar";

export const PromptMakeModal = ({ modalOpen, setModalOpen, prompt, user }) => {
  const [input, setInput] = useState([]);
  const [option, setOption] = useState([]);
  const [resultPage, setResultPage] = useState(false);
  const [inputArray, setInputArray] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("응답을 불러오는 중입니다...");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const newUserName = user.profile.socials_username || user.username;
    setUserName(newUserName);
  }, [user]);

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const result = resultArray.map((item) => {
      if (typeof item === "number") {
        return inputArray[item - 1];
      } else {
        return item;
      }
    });
    setMessage(result.join(" "));
    console.log("인풋어레이", inputArray);
  }, [inputArray]);

  useEffect(() => {
    console.log("메세지 완성~~", message);
  }, [message]);

  useEffect(() => {
    if (modalOpen === true) {
      const content = prompt.content;
      const result = parseInputString(content);
      console.log("파싱하면 이렇게 된다", result);
      setResultArray(result);
    }
  }, [modalOpen]);

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

  const colors = [
    "#BACDFF",
    "#EFB4ED",
    "#E1BAFF",
    "#FFBEBA",
    "#FED4AD",
    "#9EDF8E",
  ];

  return (
    <div className="modalContainer w-screen h-screen ">
      <button className="closeButton !mr-4" onClick={closeModal}>
        <MdOutlineCancel size={50} />
      </button>
      <div>
        {resultPage ? (
          <div className="flex-grow flex flex-col justify-center items-center h-3/5 w-4/5 bg-gray-200 border-gpt-green border-solid border-2 text-black mx-20 p-10 rounded-3xl">
            {/*질문답변*/}
            <div className="rounded-3xl px-8 pb-7 mr-8 mx-6 h-1/2 w-5/6 section-d">
              {/*프롬프트 통한 질문*/}
              <div className="flex justify-center items-center mt-2 w-full h-1/3">
                <div className="flex justify-start w-full h-full">
                  <div className="flex bubble-a section-a items-center overflow-y-auto overflow-x-hidden w-3/4 h-1/3">
                    <div className="inline-block align-middle whitespace-pre-line !my-auto p-4 pl-6 font-notosanskr">
                      {message}
                    </div>
                  </div>
                  <div className="bubble-a-after mt-14"></div>
                </div>
                {/* <HiUserCircle className="profile flex flex-col !h-60 !w-60" /> */}
                <Avatar
                  color={colors[userName.length % colors.length]}
                  name={userName}
                  className="rounded-full mb-7 mt-1 self-center font-bold text-2xl !h-40 !w-40"
                />
              </div>

              {/*GPT 답변*/}
              <div className="flex justify-center items-center mt-6 w-full h-2/5">
                <div className="flex justify-start mt-2 w-full h-full">
                  <div className="flex flex-col justify-center items-center w-1/4 h-auto">
                    <img
                      id="gpt-logo"
                      src={gpt_logo}
                      alt="gpt_logo"
                      className="h-40 w-40"
                    />
                  </div>
                  <div className="bubble-b-after mt-28"></div>
                  <div className="flex bubble-b section-a items-center overflow-y-auto overflow-x-hidden w-full">
                    <div className="font-medium p-6 pl-8 inline-block font-notosanskr align-middle whitespace-pre-line !my-auto">
                      {answer}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/*버튼*/}
            <button
              type="button"
              onClick={() => {
                setResultPage(false);
                // console.log(resultPage);
              }}
              className=" bg-gpt-green text-white font-bold hover:text-black rounded-3xl text-lg py-3.5 px-20 
             shadow-xl"
            >
              나가기
            </button>
          </div>
        ) : (
          <form
            onSubmit={handlegptCall}
            className="flex-grow flex flex-col items-center justify-center w-4/5 h-3/4 shadow-3xl bg-white border-2 border-gpt-green border-solid text-black p-11 mx-20 rounded-3xl"
          >
            <h1 className="font-bold text-7xl text-gpt-indigo">
              {prompt.title}
            </h1>

            <h1 className="font-extrabold text-xl text-gpt-indigo mt-4">
              {prompt.description}
            </h1>
            <br></br>
            <div className="rounded-3xl bg-gray-200 px-8 pb-5 mr-8 mx-6 h-96 w-5/6 overflow-y-auto section-d">
              <div className="flex flex-col w-full justify-between">
                {prompt.form.map((item, index) => {
                  console.log(item);

                  if (item.type === "객관식") {
                    const options = item.options
                      //.flat()
                      //.filter((opt) => opt.input === item.id)
                      .map((opt) => {
                        return {
                          value: opt,
                          label: opt,
                        };
                      });
                    console.log(options);
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
                    // 주관식
                  } else {
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
            >
              보내기
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
