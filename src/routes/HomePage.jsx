import { HomeSideBar } from "../components/SideBar";
import { useState, useEffect } from "react";
// import { order } from "../data/category";
import Select from "react-select";
import { MidPrompt } from "../components/Prompts";
import { getCategoryList, getPromptList, getSecureUser } from "../api/api";
import { getCookie } from "../utils/cookie";

const HomePage = () => {
  const [profile, setProfile] = useState({
    profile: { id: "", socials_username: "" },
    username: "",
    id: "",
  });

  const [categoryList, setCategoryList] = useState([]);
  const [searchCategory, setSearchCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [promptList, setPromptList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSort, setSelectedSort] = useState("");
  const [sortPromptList, setSortPromptList] = useState([]);
  const [smallPromptList, setSmallPromptList] = useState([]);
  const [defaultValue, setdefaultValue] = useState({
    label: "전체",
    value: "전체",
  });
  const [defaultValue2, setdefaultValue2] = useState({
    label: "최신순",
    value: "latest",
  });
  const [order, setOrder] = useState([
    { value: "view", label: "뷰순" },
    { value: "like", label: "좋아요순" },
    { value: "latest", label: "최신순" },
  ]);

  useEffect(() => {
    setSelectedSort(defaultValue2);
  }, []);

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
      setSmallPromptList(
        prompts.sort((a, b) => {
          if (a.view > b.view) {
            return -1;
          } else if (a.view < b.view) {
            return 1;
          } else {
            return 0;
          }
        })
      );
    };
    getPromptListAPI();

    const getCategoryListAPI = async () => {
      const categories = await getCategoryList();
      // console.log(categories);
      const categoryName = categories.data.map((category) => {
        return { value: category.name, label: category.name };
      });
      setCategoryList(categoryName);
      setSearchCategory(categoryName);
    };
    getCategoryListAPI();
  }, []);
  // console.log(smallPromptList);

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

  useEffect(() => {
    if (categoryList.length > 0) {
      setdefaultValue(categoryList[0]);
    }
  }, [categoryList]);

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
    // console.log(selectedCategory);
  };

  const changeLikeOrder = () => {
    const sortedList = [...sortPromptList].sort((a, b) => {
      if (a.like_users.length > b.like_users.length) {
        return -1;
      } else if (a.like_users.length < b.like_users.length) {
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
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
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

  // useEffect(() => {
  //   const sortedList = [...smallPromptList].sort((a, b) => {
  //     if (a.view > b.view) {
  //       return -1;
  //     } else if (a.view < b.view) {
  //       return 1;
  //     } else {
  //       return 0;
  //     }
  //   });

  //   setSmallPromptList(sortedList);
  // }, []);

  // console.log(smallPromptList);

  // console.log(prompts);
  // console.log(promptList);

  return (
    <div className="w-screen h-screen flex flex-row">
      <div className="w-60">
        <HomeSideBar key={profile.id} user={profile} prompt={smallPromptList} />
      </div>

      <div className="w-full bg-white text-black py-16 px-2 rounded-lg min-h-[700px] ">
        <div className="flex flex-row justify-evenly space-x-8 pt-5 pb-7">
          <Select
            options={categoryList}
            className="w-5/12"
            onChange={handleCategoryChange}
            defaultValue={defaultValue}
          />
          <input
            type="text"
            placeholder="검색어를 입력해주세요"
            onChange={handleChange}
            className="w-4/12 h-11 rounded-full border bg-slate-200 pl-5 mr-4"
            value={searchValue}
          />

          {/* <div className="w-1/3 flex flex-row space-x-5 border-2 rounded-3xl p-2 ">
            {category.map((category) => (
              <div className="w-20 text-sm text-center">{category.label}</div>
            ))}
          </div> */}
        </div>
        <div className="flex flex-col items-center w-full h-3/4">
          <div className="rounded-3xl border-solid border-gpt-blue border-2 m-5 px-5 pb-12 min-h-[500px] self-center">
            <div className="flex flex-row min-w-full justify-between mt-5 p-5">
              <div className="rounded-xl p-3.5 text-center font-bold text-xl text-white bg-gpt-blue px-14">
                프롬프트 목록
              </div>
              <Select
                options={order}
                defaultValue={defaultValue2}
                onChange={handleSortChange}
              />
            </div>
            <div className="h-5/6 min-h-[350px] flex justify-center overflow-y-auto overflow-x-hidden section-b">
              <div className="grid grid-cols-3 ">
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
