import { useEffect, useState } from "react";
import CommentElement from "./commentElement";
import comments from "../../data/comments";
import { LuSend } from "react-icons/lu";
// import { createComment, deleteComment, getComments } from "../../apis/api";

const Comment = ({ postId }) => {
  const [commentList, setCommentList] = useState(comments); // state for comments
  const [newContent, setNewContent] = useState(""); // state for new comment

  // useEffect(() => {
  //   const getCommentsAPI = async () => {
  //     const comments = await getComments(postId);
  //     setCommentList(comments);
  //   };
  //   getCommentsAPI();
  // }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    setNewContent("");
    //createComment({ post: postId, content: newContent });
  };

  const handleCommentDelete = (targetId) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      //deleteComment(targetId);
    }
  };

  return (
    <div className="flex flex-col w-full mt-5 self-start h-72">
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
        className="flex items-center justify-center mt-10"
        onSubmit={handleCommentSubmit}
      >
        <input
          type="text"
          value={newContent}
          placeholder="댓글을 입력해주세요"
          className="input h-14 text-sm"
          onChange={(e) => setNewContent(e.target.value)}
        />
        <LuSend type="submit" className="button w-30" />
      </form>
    </div>
  );
};

export default Comment;
