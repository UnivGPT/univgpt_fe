import { HomeSideBar } from "../components/SideBar";
import users from "../data/users";
// import prompts from "../data/prompts";
import { useState, useEffect } from "react";
import { category, order } from "../data/category";
import Select from "react-select";
import { MidPrompt } from "../components/Prompts";
import { getCategoryList, getPromptList, getUserProfile } from "../api/api";

const HomePage = () => {
  const [profile, setProfile] = useState({
    email: "",
    username: "",
  });

  const [categoryList, setCategoryList] = useState([]);
  const [searchCategory, setSearchCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [promptList, setPromptList] = useState([]);
  //const [promptList, setPromptList] = useState(prompts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [sortPromptList, setSortPromptList] = useState([]);

  
  // useEffect(() => {
  //   const getPromptListAPI = async () => {
  //     const prompts = await getPromptList();
  //     setPromptList(prompts);
  //     setSortPromptList(prompts);
  //   };
  //   getPromptListAPI();
  // }, []);

  useEffect(() => {
    const getPromptListAPI = async () => {
      const prompts = await getPromptList();
      setPromptList(prompts);
      setSortPromptList(prompts);
    };
    getPromptListAPI();

    const getCategoryListAPI = async () => {
      const categories = await getCategoryList();
      // console.log(categories);
      const categoryName = categories.data.map((category) => {
        return category.name;
      });
      setCategoryList(categoryName);
      setSearchCategory(categoryName);
    };
    getCategoryListAPI();

    const getUserProfileAPI = async () => {
      const profile = await getUserProfile();
      setProfile({
        email: profile.email,
        username: profile.username,
        id: profile.id,
      });
    };
    getUserProfileAPI();
    console.log(profile);
  }, []);

  // const handleCategoryFilter = (e) => {
  //   const { innerText } = e.target;
  //   if (searchValue === innerText.substring(1)) {
  //     setSearchValue("");
  //   } else {
  //     const activeCategory = innerText.substring(1);
  //     setSearchValue(activeCategory);
  //   }
  // };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    // console.log(searchValue);
  };

  const handleSortChange = (e) => {
    setSelectedSort(e.value);
    // console.log(selectedSort);
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.label);
    console.log(selectedCategory);
  };

  const changeLikeOrder = () => {
    const sortedList = [...sortPromptList].sort((a, b) => {
      if (a.like > b.like) {
        return -1;
      } else if (a.like < b.like) {
        return 1;
      } else {
        return 0;
      }
    });
    setSortPromptList(sortedList);
  };

  const changeViewOrder = () => {
    const sortedList = [...sortPromptList].sort((a, b) => {
      if (a.view > b.view) {
        return -1;
      } else if (a.view < b.view) {
        return 1;
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
    <div className="w-screen h-screen flex flex-row space-x-1">
      <div className="m-5 w-60">
        <HomeSideBar key={profile.id} user={profile} prompt={promptList} />
      </div>

      <div className="w-full bg-white text-black p-11 ">
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
            className="w-7/12 h-11 rounded-full border bg-slate-200 pl-5"
            value={searchValue}
          />

          {/* <div className="w-1/3 flex flex-row space-x-5 border-2 rounded-3xl p-2 ">
            {category.map((category) => (
              <div className="w-20 text-sm text-center">{category.label}</div>
            ))}
          </div> */}
        </div>

        <div className="rounded-3xl border-solid border-slate-300 border-2 m-5 px-5 pb-5 w-11/12 h-3/4 justify-self-center">
          <div className="flex flex-row w-full justify-between mt-5 p-5">
            <div className="rounded-xl p-3.5 text-center font-bold text-xl text-white bg-gpt-green px-14">
              프롬프트
            </div>
            <Select options={order} onChange={handleSortChange} />
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
              .filter((prompt) =>
                selectedCategory === "전체"
                  ? prompt
                  : selectedCategory === ""
                  ? prompt
                  : prompt.category.find((category) =>
                      category.name.includes(selectedCategory)
                    )
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
