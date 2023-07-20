import { useState } from "react";
import prompts from "../data/prompts";
import users from "../data/users";

const PromptMakePage = () => {

  return (
    <div className="w-screen h-screen flex justify-evenly">
    {/*왼쪽 절반*/}
    <div className="bg-gpt-indigo w-1/2 h-full p-10">
    <h1></h1>
    </div>

 {/*오른쪽 절반*/}
    <div className="bg-white text-black w-1/2 h-full p-10">
    ㄹㅇ
    </div>
    </div>
  );
};

export default PromptMakePage;