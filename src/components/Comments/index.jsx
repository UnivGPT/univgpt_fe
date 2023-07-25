import { useEffect, useState } from "react";
import CommentElement from "./commentElement";
import { getCommentList, createComment } from "../../api/api";
import { LuSend } from "react-icons/lu";

const Comment = ({ promptId }) => {
  const [commentList, setCommentList] = useState([]); // state for comments
  const [newContent, setNewContent] = useState(""); // state for new comment

  useEffect(() => {
    const getCommentsAPI = async () => {
      const response = await getCommentList(promptId);
      const comments = response.data;
      setCommentList(comments);
    };
    getCommentsAPI();
  }, [promptId]);

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
      //deleteComment(targetId);
    }
  };

  return (
    <div className="flex flex-col w-full self-start h-72">
      <h1 className="text-base font-semibold mt-5 mb-3">
        {commentList.length}개의 댓글
      </h1>
      <div className="overflow-y-auto overflow-x-hidden">
        {commentList.map((comment) => {
          return (
            <div className="w-full flex flex-row" key={comment.id}>
              <CommentElement
                comment={comment}
                handleCommentDelete={handleCommentDelete}
              />
            </div>
          );
        })}
      </div>
      {/* comment form component */}
      <form
        className="flex items-center justify-center mt-1"
        onSubmit={handleCommentSubmit}
      >
        <input
          type="text"
          value={newContent}
          placeholder="댓글을 입력해주세요"
          className="input h-14 text-sm !text-black"
          onChange={(e) => setNewContent(e.target.value)}
        />
        <LuSend type="submit" className="button w-30" />
      </form>
    </div>
  );
};

export default Comment;
