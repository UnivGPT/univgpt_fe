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

const Comment = ({ promptId, resultPage }) => {
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
      content: newContent ? newContent : "",
    });
    try {
      const newComment = response.data;
      setCommentList((prevCommentList) => [...prevCommentList, newComment]);
    } catch (error) {}
  };

  const handleCommentDelete = (targetId) => {
    if (resultPage) {
      alert("응답을 받는 중에는 댓글을 삭제하실 수 없습니다.");
    } else {
      if (window.confirm("정말 삭제하시겠습니까?")) {
        deleteComment(targetId);
      }
    }
  };

  return (
    <div className="flex flex-col w-52 self-center h-84 pl-3">
      <h1 className="text-lg font-extrabold text-gpt-blue font-notosanskr mt-2 ml-3 mb-1">
        {commentList.length}개의 댓글
      </h1>
      <form
        className="flex items-center justify-center mt-1"
        onSubmit={handleCommentSubmit}
      >
        <input
          type="text"
          value={newContent}
          placeholder="입력 시 엔터를 눌러주세요"
          className="input !w-11/12 !border-gpt-blue text-sm !text-black !px-3 !mx-2 mb-3 h-10/12"
          onChange={(e) => setNewContent(e.target.value)}
        />
        {/*<LuSend type="submit" className="button w-30" />*/}
      </form>
      {/*댓글 목록*/}
      <div className="h-56 overflow-y-auto overflow-x-hidden section-c">
        {commentList
          .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
          .map((comment) => {
            return (
              <div className="flex flex-row ml-0.5" key={comment.id}>
                <CommentElement
                  comment={comment}
                  handleCommentDelete={handleCommentDelete}
                  user={user}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Comment;
