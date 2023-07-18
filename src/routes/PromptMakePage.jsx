import { useState } from "react";
import prompts from "../data/prompts";
import { PromptSideBar } from "../components/SideBar";
import comments from "../data/comments";
import users from "../data/users";

const PromptMakePage = () => {
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
  // 		<div>
  // 			<div>
  // 				<div>제목</div>
  // 				<input
  // 					type="text"
  // 					placeholder="제목을 입력하세요            (0/20)"
  // 					// 글자수 카운트 필요
  // 					onChange={handlechange}
  // 					value={newPrompt.title}
  // 					className="w-6/12 rounded-full border bg-slate-200"/>
  // 			</div>
  // 			<div>
  // 				<div>설명</div>
  // 				<input
  // 					type="text"
  // 					placeholder="프롬프트에 대한 간단한 설명을 작성하세요            (0/30)"
  // 					// 글자수 카운트 필요
  // 					onChange={handlechange}
  // 					value={promptTitle}
  // 					className="w-6/12 rounded-full border bg-slate-200"/>
  // 			</div>
  // 		</div>
   	);
};

export default PromptMakePage;
