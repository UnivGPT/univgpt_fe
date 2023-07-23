import { useState, useEffect } from "react";
import trashBin from "../assets/images/trashbin.png";
import { createPrompt } from "../api/api";
import { BsQuestionCircle } from "react-icons/bs";

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

  const [selectedCategories, setSelectedCategories] = useState([]);

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedCategories((prevSelected) => [...prevSelected, value]);
    } else {
      setSelectedCategories((prevSelected) =>
        prevSelected.filter((category) => category !== value)
      );
    }
  };

  useEffect(() => {
    setPrompt({
      title: title,
      description: description,
      form: form,
      content: content,
      category: selectedCategories,
    });
  }, [title, description, content, form, selectedCategories]);

  const handleCreate = async (prompt) => {
    let { form, ...data } = prompt;
    const response = await createPrompt(data);
    // prompt id 받아와서 변수에 저장
    const promptId = response.data.id;
    console.log("FORM", form);
    form = form.map((element) => {
      if (element.type === "객관식") {
        return { ...element, type: 0 };
      } else if (element.type === "단문형") {
        return { ...element, type: 1 };
      } else if (element.type === "장문형") {
        return { ...element, type: 2 };
      } else {
        return element; // 다른 경우에는 요소를 그대로 반환
      }
    });

    console.log("CHANGED FORM", form);
    // input 데이터 가공
    // api 호출 (for문돌아야할듯)
    // label이 name, placeholding이 placeholder, type이 type (근데 숫자로 바꿔야 함)
    console.log("RESPONSE", response);
  };

  return (
    <div className="w-screen h-screen flex justify-evenly">
      {/*왼쪽 절반*/}
      <div className="bg-gpt-indigo w-1/2 h-full pl-20 pr-20 pb-6 pt-8">
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
          ________________________________________________________________________
        </h1>

        {/*{#입력값} 생성기*/}
        <div className="flex flex-row justify-between items-bottom mt-6 mb-1.5">
          <h1 className="text-3xl font-bold mr-10">입력값</h1>
          <button
            type="submit"
            className="button-a-2 ml-8"
            onClick={() => {
              setForm([
                ...form,
                {
                  label: "",
                  type: "단문형",
                  placeholding: "",
                  options: [""],
                },
              ]);
            }}
          >
            입력값 추가
          </button>
        </div>

        <div className="h-96 flex flex-col items-center overflow-y-auto">
          {form.map((el, idx) => (
            <>
              <div className="w-full flex flex-row justify-between items-stretch mt-4">
                <input
                  key={"name" + idx}
                  id={"name" + idx}
                  className="input-b mb-2"
                  onChange={(e) => {
                    const editedForm = [...form][idx];
                    editedForm["name"] = e.target.value;
                    const newForm = [...form];
                    newForm.splice(idx, 1, editedForm);
                    setForm(newForm);
                  }}
                  placeholder="입력값 명칭"
                  value={el.name}
                ></input>
                <select
                  className="text-black w-28 h-13 mx-2 mb-2 rounded-xl font-medium text-center shadow"
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
                {/*삭제버튼(누르면 입력값 한 세트가 삭제됨)*/}
                <button
                  type="button"
                  className="button-e-2 mb-2 "
                  onClick={() => {
                    const deletedForm = [...form];
                    deletedForm.splice(idx, 1);
                    setForm(deletedForm);
                  }}
                >
                  <img src={trashBin} className="w-5 h-5"></img>
                </button>
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
                      const newForm = [...form]; // Create a copy of the form array

                      // Extract the index from the input element's id (e.g., "options1" -> 1)
                      const idx = Number(e.target.id.replace("options", ""));

                      // Update the value of the corresponding option in the copied form array
                      newForm[idx].options[idx2] = e.target.value;

                      setForm(newForm); // Update the state with the modified copy
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
                      newOptions.push(""); // Add a new empty option
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
                  name: "",
                  type: "단문형",
                  placeholding: "",
                  options: [""],
                },
              ]);
            }}
          >
            입력값 추가
          </button>
        </div>

      </div>

      {/*오른쪽 절반*/}
      <div className="bg-white text-black w-1/2 h-full p-8 pl-10 pr-20">
        <div className="flex justify-between mt-4">
          <h1 className="text-5xl font-bold mx-6 mb-8">프롬프트</h1>
          <BsQuestionCircle size={45} className="qmark ml-4" />
        </div>
        <div className="rounded-3xl bg-gray-200  mx-6 h-1/2 w-full flex flex-col">
          <textarea
            className="w-auto h-5/6 bg-gray-200 overflow-y-auto focus:border-transparent mx-4 p-6 resize-none outline-none"
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
          <button className="button-b self-end m-8">미리보기</button>
        </div>

        {/*카테고리*/}
        <div className="mx-6 mt-6 ml-8 flex justify-start items-baseline">
          <h1 className="text-2xl font-bold">카테고리</h1>
          <h2 className="flex font-semibold text-sm text-gray-700 ml-1">
            카테고리는 중복 선택이 가능합니다.
          </h2>
        </div>
        <div className="flex justify-items mx-10 mt-3">
          <label
            className={`button-checkbox ${
              selectedCategories.includes("과제") ? "active" : ""
            } button-check`}
          >
            과제
            <input
              type="checkbox"
              value="과제"
              checked={selectedCategories.includes("과제")}
              onChange={handleCategoryChange}
              style={{ display: "none" }}
            />
          </label>

          <label
            className={`button-checkbox ${
              selectedCategories.includes("발표") ? "active" : ""
            } button-check`}
          >
            발표
            <input
              type="checkbox"
              value="발표"
              checked={selectedCategories.includes("발표")}
              onChange={handleCategoryChange}
              style={{ display: "none" }}
            />
          </label>
          <label
            className={`button-checkbox ${
              selectedCategories.includes("취준") ? "active" : ""
            } button-check`}
          >
            취준
            <input
              type="checkbox"
              value="취준"
              checked={selectedCategories.includes("취준")}
              onChange={handleCategoryChange}
              style={{ display: "none" }}
            />
          </label>
          <label
            className={`button-checkbox ${
              selectedCategories.includes("여가") ? "active" : ""
            } button-check`}
          >
            여가
            <input
              type="checkbox"
              value="여가"
              checked={selectedCategories.includes("여가")}
              onChange={handleCategoryChange}
              style={{ display: "none" }}
            />
          </label>
          <label
            className={`button-checkbox ${
              selectedCategories.includes("연락") ? "active" : ""
            } button-check`}
          >
            연락
            <input
              type="checkbox"
              value="연락"
              checked={selectedCategories.includes("연락")}
              onChange={handleCategoryChange}
              style={{ display: "none" }}
            />
          </label>
        </div>

        {/*내가 볼라고 만든 기능
          <div><h3>선택된 카테고리</h3>
          <ul>
            {selectedCategories.map((category) => (
              <li key={category}>{category}</li>
            ))}
          </ul>
            </div>*/}


        {/*삭제&게시 버튼*/}
        <div className="mt-14 flex justify-center">
          <button
            className="button-et ml-4 mr-16"
            type="reset"
            onClick={() => {
              window.location.reload();
              window.alert("프롬프트가 삭제되었습니다!");
            }}
          >
            삭제하기
          </button>
          <button

            className="button-d ml-16"
            onClick={() => {
              handleCreate(prompt);
              window.alert("프롬프트가 성공적으로 만들어졌습니다!");
            }}
            //axios 통해 서버로 프롬프트 덩어리를 보내는 함수가 있어야!
            //지금은 잘 들어왔는지 확인하기 위해 콘솔로그 찍는 기능 넣어놨어유
            //공란이 있을 시 'ㅇㅇ을 입력해주세요' alert가 뜨고 프롬프트 저장이 안되는 기능도 있어야
          >
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptMakePage;
