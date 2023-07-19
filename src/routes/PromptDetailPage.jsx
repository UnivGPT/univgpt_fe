import { useState } from "react";
import prompts from "../data/prompts";
import { PromptSideBar } from "../components/SideBar";
import comments from "../data/comments";
import users from "../data/users";

const PromptDetailPage = () => {
  const [isUser, setIsUser] = useState(users);
  // 	const [newPrompt, setNewPrompt] = useState({
  //     title: "",
  //     content: "",
  //     category: [],
  //     description: "",
  //   });
  // 	const handlechange = (e) => {
  //     setNewPrompt
  //   };
  return (
    <div className="w-60 m-5">
      <PromptSideBar
        key={isUser.id}
        user={isUser}
        prompt={prompts}
        comment={comments[0]}
      />
    </div>
    
  );
};

export default PromptDetailPage;
