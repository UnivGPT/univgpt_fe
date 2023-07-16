import { HomeSideBar } from "../components/SideBar";
import users from "../data/users";
import prompts from "../data/prompts";
import { useState } from "react";
import category from "../data/category";
import Select from "react-select";
import { MidPrompt } from "../components/Prompts";

const HomePage = () => {
  const [user, setUser] = useState(users);
  const [promptList, setPromptList] = useState(prompts);
  const [searchValue, setSearchValue] = useState("");
  // console.log(users);
  // console.log(prompts);
  console.log(user);
  console.log(promptList);
  const handlechange = (e) => {
    setSearchValue(e.target.toLowerCase());
  };

  return (
    <div className="w-full flex flex-row space-x-28">
      <HomeSideBar user={user} prompt={prompts} />
      <div className="w-full bg-white text-black p-11">
        <div className="flex felx-row justify-items-start space-x-5">
          <Select options={category} className="w-5/12 rounded-full bg-slate-200"/>
          <input
            type="text"
            placeholder="    검색어를 입력해주세요"
            onChange={handlechange}
            value={searchValue}
            className="w-5/12 rounded-full border bg-slate-200"
          />
        </div>
        <div>
          {promptList
            .filter((prompt) =>
              searchValue
                ? prompt.title.find((title) => title.content === searchValue)
                : prompt
            )
            .map((prompt) => (
              <MidPrompt key={prompt.id} prompt={prompt} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
