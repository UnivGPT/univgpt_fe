import { useState, useEffect } from "react";
import trashBin from "../assets/images/trashbin.png";

const PromptMakePage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [form, setForm] = useState([]);
  const [activatedChoices, setActivatedChoices] = useState([]);
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [prompt, setPrompt] = useState({
    title: "",
    description: "",
    content: "",
    form: [],
    category: "",
  });
  useEffect(() => {
    setPrompt({
      title: title,
      description: description,
      form: form,
      content: content,
      category: category,
    });
  }, [title, description, content, form, category]);

  // const promptInputAdd = () => {
  //   if () {

  //   }
  // }

  return (
    <div className="w-screen h-screen flex justify-evenly">
      {/*왼쪽 절반*/}
      <div className="bg-gpt-indigo w-1/2 h-full px-20 pb-6 pt-12">
        <h1 className="text-3xl font-bold mb-2.5">제목</h1>
        <input
          required
          type="text"
          className="input-d"
          maxLength={20}
          placeholder="제작하실 프롬프트의 제목을 20자 이내로 입력해주세요."
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <br></br>
        <br></br>
        <h1 className="text-3xl font-bold mb-2.5">설명</h1>
        <input
          required
          type="text"
          className="input-d"
          maxLength={30}
          placeholder="프롬프트에 대한 30자 이내의 간단한 설명을 작성하세요."
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
        <h1 className="text-2xl font-bold mb-2.5 flex flex-col items-center">
          ____________________________________________________________________
        </h1>
        {/*{#입력값} 생성기*/}
        <h1 className="text-3xl font-bold mt-6 mb-2.5">입력값</h1>
        <div className="h-2/5 flex flex-col items-center overflow-y-auto">
          {form.map((el, idx) => (
            <>
              <div className="w-full flex flex-row justify-between">
                <input
                  key={"label" + idx}
                  id={"label" + idx}
                  className="input-b mb-2"
                  onChange={(e) => {
                    const editedForm = [...form][idx];
                    editedForm["label"] = e.target.value;
                    const newForm = [...form];
                    newForm.splice(idx, 1, editedForm);
                    setForm(newForm);
                  }}
                  placeholder="입력값 명칭"
                  value={el.label}
                ></input>
                <select
                  className="text-black w-28 h-13 ml-2 mb-2 rounded-xl font-medium text-center shadow"
                  key={"type" + idx}
                  id={"type" + idx}
                  onChange={(e) => {
                    const editedForm = [...form][idx];
                    editedForm["type"] = e.target.value;
                    const newForm = [...form];
                    newForm.splice(idx, 1, editedForm);
                    setForm(newForm);
                    if (e.target.value === "객관식") {
                      setActivatedChoices([...activatedChoices, idx]);
                    } else {
                      const idxIndex = activatedChoices.indexOf(idx);
                      const deletedAcitvatedChocies = [...activatedChoices];
                      deletedAcitvatedChocies.splice(idxIndex, 1);
                      setActivatedChoices(deletedAcitvatedChocies);
                    }
                  }}
                >
                  <option>단문형</option>
                  <option>장문형</option>
                  <option>객관식</option>
                </select>
              </div>

              {/*placeholder 입력기: 단문형과 장문형에서만 떠야*/}
              <div className="flex flex-row justify-center w-full">
                <input
                  id="placeholding"
                  className="input-b-1 mb-2 justify-self-center"
                  placeholder="이용자가 입력값 내용을 어떻게 작성하면 좋을지 설명해주세요."
                  style={{
                    display: activatedChoices.includes(idx) ? "none" : "block",
                  }}
                  onChange={(e) => {
                    const editedForm = [...form][idx];
                    editedForm["placeholding"] = e.target.value;
                    const newForm = [...form];
                    newForm.splice(idx, 1, editedForm);
                    setForm(newForm);
                  }}
                ></input>
              </div>
              {/*객관식 선지 입력기: 객관식에서만 떠야*/}
              {el["options"].map((el2, idx2) => (
                <div
                  className="flex flex-row justify-around mb-2"
                  style={{
                    display: activatedChoices.includes(idx) ? "flex" : "none",
                  }}
                >
                  <input
                    key={"options" + idx}
                    id={"options" + idx}
                    className="input-e mr-8"
                    onChange={(e) => {
                      const newOptions = [...form[idx].options];
                      const newOptionValue = e.target.value;
                      newOptions.splice(idx2, 1, newOptionValue);
                      const newOptionForm = {
                        ...form[idx],
                        options: newOptions,
                      };
                      const newForm = [...form];
                      newForm.splice(idx, 1, newOptionForm);
                      setForm(newForm);
                    }}
                    value={el2}
                    placeholder="객관식 선택지"
                    style={{
                      width: "250px",
                    }}
                  ></input>
                  <button
                    className="button-plus-blue mr-2"
                    onClick={() => {
                      const newOptions = [...form[idx].options];
                      const newOptionForm = {
                        ...form[idx],
                        options: newOptions,
                      };
                      const newForm = [...form];
                      newForm.splice(idx, 1, newOptionForm);
                      setForm(newForm);
                    }}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    className="button-plus-red mr-2"
                    style={{
                      visibility: idx2 === 0 ? "hidden" : "visible",
                    }}
                    onClick={() => {
                      const deletedOption = [...form[idx].options];
                      const deletedOptionForm = {
                        ...form[idx],
                        options: deletedOption,
                      };
                      deletedOption.splice(idx2, 1);
                      const newForm = [...form];
                      newForm.splice(idx, 1, deletedOptionForm);
                      setForm(newForm);
                      console.log(newForm);
                    }}
                  >
                    -
                  </button>
                </div>
              ))}

              {/*삭제버튼(누르면 입력값 한 세트가 삭제됨)*/}
              <button
                type="button"
                className="button-e items-center mb-8"
                onClick={() => {
                  const deletedForm = [...form];
                  deletedForm.splice(idx, 1);
                  setForm(deletedForm);
                }}
              >
                <img src={trashBin} className="w-4 h-4"></img>
              </button>
            </>
          ))}{" "}
        </div>
        <div className="flex flex-col items-center">
          {/*입력값 추가(누르면 폼이 하나씩 추가됨)*/}
          <button
            type="submit"
            className="button-a mt-4"
            onClick={() => {
              setForm([
                ...form,
                {
                  label: "",
                  type: "단문형",
                  placeholding: "",
                  options: [],
                },
              ]);
            }}
          >
            입력값 추가
          </button>
        </div>
      </div>

      {/*오른쪽 절반*/}
      <div className="bg-white text-black w-1/2 h-full p-10 pr-20">
        <h1 className="text-5xl font-bold mx-6 mb-8">프롬프트</h1>
        <div className="rounded-3xl bg-gray-200  mx-6 h-1/2 w-full flex flex-col">
          <textarea
            className="w-auto h-5/6 bg-gray-200 overflow-y-auto focus:border-transparent m-4 p-6 resize-none outline-none"
            placeholder=" ChatGPT에게 전달될 프롬프트를 작성해주세요.
      &#13;&#10;사용자의 입력값이 들어갔으면 하는 부분에 #을 입력하세요.
      &#13;&#10; [예시]
      &#13;&#10; 미팅 회의록을 요약해줘. 회의 주제는 #회의주제 이고,
      &#13;&#10; 요약할 때 말투는 #말투 로 해줘."
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          ></textarea>
          <button className="button-a self-end m-8">미리보기</button>
        </div>
        {/*카테고리*/}
        <h1 className="text-2xl font-bold mx-6 mt-8">카테고리</h1>
        <select
          onChange={(e) => {
            setCategory(e.target.value);
          }}
          className="text-black w-32 h-12 mt-4 mx-6 border-gpt-green border-2 rounded-xl font-medium text-center shadow"
        >
          <option>과제</option>
          <option>발표</option>
          <option>여가</option>
          <option>대외활동</option>
          <option>컴퓨팅</option>
          <option>진로</option>
          <option>커뮤니케이션(연락)</option>
          <option>일정</option>
        </select>
        {/*삭제&게시 버튼*/}
        <div className="mt-12 flex justify-center">
          <button className="button-e mr-16" type="reset">
            삭제하기
          </button>
          <button
            className="button-d ml-16"
            onClick={() => console.log(prompt)}
            //axios 통해 서버로 프롬프트 덩어리를 보내는 함수가 있어야!
            //지금은 잘 들어왔는지 확인하기 위해 콘솔로그 찍는 기능 넣어놨어유
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptMakePage;
