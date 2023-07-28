import { useState, useEffect } from "react";
import { gptCallBack } from "../../api/api";
import Select from "react-select";
import { MdOutlineCancel } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import gpt_logo from "../../assets/images/logo_gpt.png";

export const PromptMakeModal = ({ modalOpen, setModalOpen, prompt }) => {
  const [input, setInput] = useState([]);
  const [option, setOption] = useState([]);
  const [resultPage, setResultPage] = useState(false);
  const [inputArray, setInputArray] = useState([]);
  const [resultArray, setResultArray] = useState([]);
  const [message, setMessage] = useState("");
  const [answer, setAnswer] = useState("응답을 불러오는 중입니다...");

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

  return (
    <div className="modalContainer w-screen h-screen ">
      <button className="closeButton !mr-4" onClick={closeModal}>
        <MdOutlineCancel size={50} />
      </button>
      <div>
        {resultPage ? (
          <div className="w-screen h-screen flex flex-col items-center">
            <form className="w-4/5 h-3/4 flex flex-col items-center bg-gray-200 text-black p-11 rounded-3xl mx-20">
              {/*사용자 측 프롬프트 질문*/}
              <div className="flex justify-between mx-20">
                <div className="bubble-a font-medium overflow-x-hidden items-center overflow-y-auto ">
                  {message}
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
                  {answer}
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
                        <div className="button-f">{item.name}</div>
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
        ;
      </div>
    </div>
  );
};
