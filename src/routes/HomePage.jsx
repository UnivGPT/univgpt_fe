import { HomeSideBar } from "../components/SideBar";
import users from "../data/users";
import prompts from "../data/prompts";
import { useState } from "react";
import { category, order } from "../data/category";
import Select from "react-select";
import { MidPrompt } from "../components/Prompts";

const HomePage = () => {
  const [isUser, setIsUser] = useState(users);
  const [promptList, setPromptList] = useState(prompts);
  const [searchValue, setSearchValue] = useState("");
  // console.log(users);
  // console.log(prompts);
  //console.log(isUser);
  //console.log(promptList);
  console.log(
    promptList.filter((prompt) => prompt.title.includes(searchValue))
  );
  const handleChange = (e) => {
    setSearchValue(e.target.value);
    console.log(searchValue);
  };

  const changeNameOrder = () => {
    setPromptList(
      [...prompt].sort(function (a, b) {
        return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
      })
    );
  };

  const changeLikeOrder = () => {
    setPromptList(
      [...prompt].sort(function (a, b) {
        return a.like < b.like ? -1 : a.like > b.like ? 1 : 0;
      })
    );
  };

  const changeViewOrder = () => {
    setPromptList(
      [...prompt].sort(function (a, b) {
        return a.view < b.view ? -1 : a.view > b.view ? 1 : 0;
      })
    );
  };

  return (
    <div className="w-full flex flex-row space-x-1">
      <div className="m-5 w-60">
        <HomeSideBar key={isUser.id} user={isUser} prompt={prompts} />
      </div>
      <div className="w-full bg-white text-black p-11">
        <div className="flex felx-row justify-between space-x-5 p-5">
          <Select
            options={category}
            className="w-6/12 rounded-full bg-slate-200"
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={handleChange}
            className="w-6/12 rounded-full border bg-slate-200 pl-5"
            value={searchValue}
          />  
        </div>
        <div className="rounded-3xl border-solid border-slate-300 border-2 m-5 px-5 pb-5 h-3/5">
          <div className="flex flex-row w-full justify-between mt-5 p-5">
            <div className="rounded-xl p-3.5 text-center font-bold text-xl text-white bg-gpt-green px-14">프롬프트</div>
            <Select 
            options={order} 
            //onClick={() => {category.value === "like" ? changeLikeOrder : category.value === "view" ? changeViewOrder : changeNameOrder}}
            //value={category.value}
            />
          </div>
          <div className="h-4/5 grid grid-cols-3 overflow-y-scroll">
            {promptList
              .filter((prompt) =>
                searchValue
                  ? prompt.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  : prompt
              )
              .map((prompt) => (
                <MidPrompt key={prompt.id} prompt={prompt} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
