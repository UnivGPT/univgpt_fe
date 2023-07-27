import { useState, useEffect } from "react";
import trashBin from "../assets/images/trashbin.png";
import {
  createPrompt,
  createInput,
  createOption,
  getCategoryList,
  getPromptDetail,
  getOptionList,
  updatePrompt,
  updateOption,
  deletePrompt,
} from "../api/api";
import { BsQuestionCircle } from "react-icons/bs";
import { PromptMakeModal } from "../components/Modal";
import { Mentions } from "../components/Mentions";
import { type } from "@testing-library/user-event/dist/type";
import { useNavigate, useParams } from "react-router-dom";

const PromptEditPage = () => {
  const { promptId } = useParams();
  const [title, setTitle] = useState("");
  const [input, setInput] = useState([]);
  const [option, setOption] = useState([]);
  const [description, setDescription] = useState("");
  const [form, setForm] = useState([]);
  const [activatedChoices, setActivatedChoices] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    form: [],
    category: "",
  });

  useEffect(() => {
    console.log("자고 싶어요", formData);
  }, [formData]);

  useEffect(() => {
    const getPromptAPI = async () => {
      const result = await getPromptDetail(promptId);
      const promptFormData = {
        ...result.prompt,
        category: result.prompt.category.map((c) => c.name),
      };
      setTitle(result.prompt.title);
      setDescription(result.prompt.description);
      setInput(result.inputs);
      setContent(result.prompt.content);

      const inputIds = result.inputs
        .filter((item) => item.type === 0)
        .map((item) => item.id);

      const results = await Promise.all(
        inputIds.map(async (id) => {
          const response = await getOptionList({ input: id });
          return response;
        })
      );

      function addOptionsToArr2(option, input) {
        return input.map((item2) => {
          const matchingArr1Items = option.filter(
            (item1) => item1.input === item2.id
          );
          const options = matchingArr1Items.map((item) => item.name);

          return { ...item2, options };
        });
      }

      let resultArr2 = addOptionsToArr2(results.flat(), result.inputs);
      resultArr2 = resultArr2.map((element, index) => {
        console.log("map시작한다!!!!!!");
        if (element.type === 0) {
          console.log("이것은 객관식", resultArr2.indexOf(element));
          setActivatedChoices((prevChoices) => [...prevChoices, index]);
          return { ...element, type: "객관식" };
        } else if (element.type === 1) {
          return { ...element, type: "단문형" };
        } else if (element.type === 2) {
          return { ...element, type: "장문형" };
        } else {
          return element; // 다른 경우에는 요소를 그대로 반환
        }
      });
      console.log("RESULT ARRAY2222222", resultArr2);
      setForm(resultArr2);
      setFormData((prevFormData) => ({
        ...prevFormData,
        form: resultArr2,
      }));
      setOption(results.flat());

      const category_content = promptFormData.category;
      setSelectedCategories(category_content);
    };
    getPromptAPI();
  }, [promptId]);

  useEffect(() => {
    const getCategoryListAPI = async () => {
      const categories = await getCategoryList();
      const categoryName = categories.data.map((category) => {
        return category.name;
      });
      setCategoryList(categoryName.slice(1));
    };
    getCategoryListAPI();
  }, []);

  //미리보기 모달 노출 여부

  const showModal = () => {
    setModalOpen(true);
  };

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
    setFormData({
      title: title,
      description: description,
      form: form,
      content: content,
      category: selectedCategories,
    });
  }, [title, description, content, form, selectedCategories]);

  const handleUpdate = async (prompt) => {
    let { form, ...data } = prompt;
    const response = await updatePrompt(
      prompt.id,
      {
        ...formData,
        form,
        category: selectedCategories,
      },
      navigate
    );

    // const promptId = response.data.id;

    console.log("FORM", form);

    // form = form.map((element) => {
    //   if (element.type === 0) {
    //     return { ...element, type: "객관식" };
    //   } else if (element.type === 1) {
    //     return { ...element, type: "단문형" };
    //   } else if (element.type === 2) {
    //     return { ...element, type: "장문형" };
    //   } else {
    //     return element; // 다른 경우에는 요소를 그대로 반환
    //   }
    // });

    // console.log("CHANGED FORM", form);
    // input 데이터 가공
    // api 호출 (for문돌아야할듯)
    for (let i in form) {
      const data = form[i];
      data.prompt = promptId;

      const inputResponse = await createInput(data);
      if (data.type === 0) {
        const inputId = inputResponse.data.id;
        const options = data.options;
        for (let j in options) {
          const option = options[j];
          const optionData = {
            name: option,
            input: inputId,
          };
          const optionResponse = await updateOption();
          console.log("option created", optionResponse);
        }
      }
      console.log("inputResponse", inputResponse);
    }
    console.log("RESPONSE", response);
  };

  const handleDelete = async () => {
    try {
      await deletePrompt(promptId);
      window.alert("프롬프트가 삭제되었습니다!");
      navigate("/");
    } catch (error) {
      console.log("[ERROR] 프롬프트 삭제에 실패했습니다.");
    }
  };

  //   const navigate = useNavigate();

  // const onSubmit = (e) => {
  // 	e.preventDefault();
  // 	updatePrompt(promptId, formData, navigate);
  // };
  // console.log("FORMDATA TITLE", formData.title);

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
          //   placeholder="제작하실 프롬프트의 제목을 20자 이내로 입력해주세요."
          defaultValue={formData.title}
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
          ______________________________________________________________________
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
                  //   placeholder="입력값 명칭"
                  value={el.name}
                ></input>
                <select
                  className="text-black w-28 h-13 mx-2 mb-2 rounded-xl font-medium text-center shadow"
                  key={"type" + idx}
                  id={"type" + idx}
                  value={el.type}
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
                  value={el.placeholding}
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
                      const newForm = [...form];
                      const idx = Number(e.target.id.replace("options", ""));
                      newForm[idx].options[idx2] = e.target.value;
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
                      newOptions.push("");
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
                      // console.log(newForm);
                    }}
                  >
                    -
                  </button>
                </div>
              ))}
            </>
          ))}{" "}
        </div>
      </div>

      {/*오른쪽 절반*/}
      <div className="bg-white text-black w-1/2 h-full p-8 pl-10 pr-20">
        <div className="flex justify-between mt-4">
          <h1 className="text-5xl font-bold mx-6 mb-6 ">프롬프트</h1>
          <BsQuestionCircle size={45} className="qmark ml-4" />
        </div>
        <div className="rounded-3xl bg-gray-200  mx-6 h-1/2 w-full flex flex-col">
          <Mentions content={content} setContent={setContent} form={form} />
          <div className="self-end">
            <button className="button-b  m-8" onClick={showModal}>
              미리보기
            </button>
            {modalOpen && (
              <PromptMakeModal setModalOpen={setModalOpen} prompt={prompt} />
            )}
          </div>
        </div>

        {/*카테고리*/}
        <div className="mx-6 mt-6 ml-8 flex justify-start items-baseline">
          <h1 className="text-2xl font-bold">카테고리</h1>
          <h2 className="flex font-semibold text-sm text-gray-700 ml-1">
            카테고리는 중복 선택이 가능합니다.
          </h2>
        </div>
        <div className="flex justify-items ml-14 mt-4">
          {/* categories.data.map((category) => {
        return category.name;
      }); */}
          {categoryList.map((category) => {
            return (
              <label
                className={`button-checkbox ${
                  selectedCategories.includes(category) ? "active" : ""
                } button-check`}
              >
                {category}
                <input
                  type="checkbox"
                  value={category}
                  checked={selectedCategories.includes(category)}
                  onChange={handleCategoryChange}
                  style={{ display: "none" }}
                />
              </label>
            );
          })}
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
        <div className="mt-12 flex justify-center">
          <button
            className="button-et ml-4 mr-16"
            type="reset"
            onClick={() => {
              handleDelete();
              //   window.location.reload();
              window.alert("프롬프트가 삭제되었습니다!");
            }}
          >
            삭제하기
          </button>
          <button
            className="button-dt ml-16"
            onClick={() => {
              handleUpdate(prompt);
              window.alert("프롬프트가 성공적으로 만들어졌습니다!");
            }}
            //axios 통해 서버로 프롬프트 덩어리를 보내는 함수가 있어야!
            //지금은 잘 들어왔는지 확인하기 위해 콘솔로그 찍는 기능 넣어놨어유
            //공란이 있을 시 'ㅇㅇ을 입력해주세요' alert가 뜨고 프롬프트 저장이 안되는 기능도 있어야
          >
            수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptEditPage;
