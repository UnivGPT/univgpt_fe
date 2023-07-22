import { HomeSideBar } from "../components/SideBar";
import users from "../data/users";
import prompts from "../data/prompts";
import { useState, useEffect } from "react";
import { category, order } from "../data/category";
import Select from "react-select";
import { MidPrompt } from "../components/Prompts";
import { getPromptList } from "../api/api";

const HomePage = () => {
  const [isUser, setIsUser] = useState(users);
  const [promptList, setPromptList] = useState(prompts);
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [sortPromptList, setSortPromptList] = useState(prompts);

  // console.log(users);
  // console.log(prompts);
  //console.log(isUser);
  //console.log(promptList);

  // useEffect(() => {
  //   const getPromptListAPI = async () => {
  //     const prompts = await getPromptList();
  //     setPromptList(prompts);
  //   };
  //   getPromptListAPI();
  // }, []);

  console.log(
    promptList.filter((prompt) => prompt.title.includes(searchValue))
  );

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
  };
  const handleSortChange = (e) => {
    setSelectedSort(e.value);
    // console.log(selectedSort);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.value);
    // console.log(selectedCategory);
  };

  const changeLikeOrder = () => {
    const sortedList = [...sortPromptList].sort((a, b) => {
      if (a.like > b.like) {
        return 1;
      } else if (a.like < b.like) {
        return -1;
      } else {
        return 0;
      }
    });
    setSortPromptList(sortedList);
  };

  const changeViewOrder = () => {
    const sortedList = [...sortPromptList].sort((a, b) => {
      if (a.view > b.view) {
        return 1;
      } else if (a.view < b.view) {
        return -1;
      } else {
        return 0;
      }
    });
    setSortPromptList(sortedList);
  };

  const changeDateOrder = () => {
    const sortedList = [...sortPromptList].sort(
      (a, b) => new Date(a.created_at) - new Date(b.created_at)
    );
    setSortPromptList(sortedList);
  };

  useEffect(() => {
    changeDateOrder();
  }, []);

  useEffect(() => {
    if (selectedSort === "like") {
      changeLikeOrder();
    } else if (selectedSort === "view") {
      changeViewOrder();
    } else {
      changeDateOrder();
    }
  }, [selectedSort]);

  // console.log(prompts);
  // console.log(promptList);

  return (
    <div className="w-full flex flex-row space-x-1">
      <div className="m-5 w-60">
        <HomeSideBar key={isUser.id} user={isUser} prompt={promptList} />
      </div>

      <div className="w-full bg-white text-black p-11 items-center">
        <div className="flex flex-row justify-around space-x-5 p-5">
          <Select
            options={category}
            className="w-5/12"
            onChange={handleCategoryChange}
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={handleChange}
            className="w-7/12 h-11 rounded-full border bg-slate-200 pl-5 "
            value={searchValue}
          />

          {/* <div className="w-1/3 flex flex-row space-x-5 border-2 rounded-3xl p-2 ">
            {category.map((category) => (
              <div className="w-20 text-sm text-center">{category.label}</div>
            ))}
          </div> */}
        </div>

        <div className="rounded-3xl border-solid border-slate-300 border-2 m-5 px-5 pb-5 h-3/5">
          <div className="flex flex-row w-full justify-between mt-5 p-5">
            <div className="rounded-xl p-3.5 text-center font-bold text-xl text-white bg-gpt-green px-14">
              프롬프트
            </div>
            <Select
              options={order}
              onChange={handleSortChange}
              onClick={() => {
                if (selectedSort === "like") {
                  changeLikeOrder();
                } else if (selectedSort === "view") {
                  changeViewOrder();
                } else {
                  changeDateOrder();
                }
              }}
              // onClick={() => {
              //   selectedSort === "like"
              //     ? changeLikeOrder()
              //     : selectedSort === "view"
              //     ? changeViewOrder()
              //     : changeDateOrder();
              // }}
            />
          </div>
          <div className="h-4/5 grid grid-cols-3 overflow-y-scroll">
            {sortPromptList
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

// .sort((a, b) => {
//   if (a.like > b.like) {
//     return 1;
//   } else if (a.like < b.like) {
//     return -1;
//   } else {
//     return 0;
//   }
// })
// .sort((a, b) => {
//   if (a.view > b.view) {
//     return 1;
//   } else if (a.view < b.view) {
//     return -1;
//   } else {
//     return 0;
//   }
// })
// .sort((a, b) => new Date(a.created_at) - new Date(b.created_at))

export default HomePage;
