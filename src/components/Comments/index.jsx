import { useEffect, useState } from "react";
import CommentElement from "./commentElement";
import {
  getCommentList,
  createComment,
  getSecureUser,
  deleteComment,
} from "../../api/api";
import { LuSend } from "react-icons/lu";
import { getCookie } from "../../utils/cookie";

const Comment = ({ promptId }) => {
  const [commentList, setCommentList] = useState([]); // state for comments
  const [newContent, setNewContent] = useState(""); // state for new comment
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getCommentsAPI = async () => {
      const response = await getCommentList(promptId);
      const comments = response.data;
      setCommentList(comments);
    };
    getCommentsAPI();
  }, [promptId]);

  useEffect(() => {
    // access_token이 있으면 유저 정보 가져옴
    if (getCookie("access_token")) {
      const getSecureUserAPI = async () => {
        const user = await getSecureUser();
        setUser(user);
      };
      getSecureUserAPI();
    }
  }, []);

  useEffect(() => {
    console.log("COMMENTLIST", commentList);
  }, [commentList]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    setNewContent("");
    const response = await createComment({
      prompt: promptId,
      content: newContent,
    });
    const newComment = response.data;
    setCommentList((prevCommentList) => [...prevCommentList, newComment]);
  };

  const handleCommentDelete = (targetId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      deleteComment(targetId);
    }
  };

  return (
    <div className="flex flex-col w-full self-center h-84 pl-3">
      <h1 className="text-lg font-extrabold text-gpt-indigo mt-5 ml-4 mb-1">
        {commentList.length}개의 댓글
      </h1>
      <form
        className="flex items-center justify-center mt-1"
        onSubmit={handleCommentSubmit}
      >
        <input
          type="text"
          value={newContent}
          placeholder="댓글을 입력해주세요"
          className="input !border-gpt-blue text-sm !text-black mx-1 mb-3 h-10/12"
          onChange={(e) => setNewContent(e.target.value)}
        />
        {/*<LuSend type="submit" className="button w-30" />*/}
      </form>
      <div className="overflow-y-auto overflow-x-hidden flex-grow">
        {commentList.map((comment) => {
          return (
            <div className="w-full flex flex-row" key={comment.id}>
              <CommentElement
                comment={comment}
                handleCommentDelete={handleCommentDelete}
                user={user}
              />
            </div>
          );
        })}
      </div>
      {/* comment form component */}
    </div>
  );
};

export default Comment;
