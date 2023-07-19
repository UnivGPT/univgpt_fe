import { useEffect, useState } from "react";
//import { getCookie } from "../../utils/cookie";

const CommentElement = (props) => {
  const { comment, handleCommentDelete } = props;
  const [content, setContent] = useState(comment.content);

  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;


  const [user, setUser] = useState(null);


  // useEffect(() => {
  //   // access_token이 있으면 유저 정보 가져옴
  //   if (getCookie("access_token")) {
  //     const getUserAPI = async () => {
  //       const user = await getUser();
  //       setUser(user);
  //     };
  //     getUserAPI();
  //   }
  // }, []);

  return (
    <div className="w-full flex justify-between gap-1 mb-2">
      <div className="w-3/4">
        <p className="text-lg mr-4">{comment.content}</p>
        <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span>
      </div>
      {user?.id === comment.author ? (
        <div className="w-1/4 flex flex-row-reverse items-center">
          <>
            <button onClick={() => handleCommentDelete(comment.id)}>
              Del
            </button>
          </>
        </div>
      ) : null}
    </div>
  );
};
export default CommentElement;