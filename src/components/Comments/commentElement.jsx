import { useEffect, useState } from "react";
import { HiUserCircle } from "react-icons/hi";
import { TiDelete } from "react-icons/ti";
import Avatar from "react-avatar";
//import { getCookie } from "../../utils/cookie";

const CommentElement = (props) => {
  const { comment, handleCommentDelete, user } = props;
  const [content, setContent] = useState(comment.content);

  const date = new Date(comment.created_at);
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  month = month < 10 ? `0${month}` : month;
  let day = date.getDate();
  day = day < 10 ? `0${day}` : day;

  // const [user, setUser] = useState(null);

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
  console.log(comment);

  const colors = [
    "#BACDFF",
    "#EFB4ED",
    "#E1BAFF",
    "#FFBEBA",
    "#FED4AD",
    "#9EDF8E",
  ];

  return (
    <div className="w-40 flex justify-between gap-1 mb-2 ">
      <div className="flex flex-row w-full space-x-4 items-center pl-2">
        <Avatar
          color={colors[comment.author.username.length % colors.length]}
          name={comment.author.socials_username || comment.author.username}
          className="userCircle rounded-full mb-7 mt-3 font-bold text-lg"
          size="30"
        />
        <div className="commentbubble">
          <p className="text-xs mr-3 pt-1 pl-3 align-middle font-semibold">
            {comment.content}
          </p>
          {/* <span className="text-base mr-1 text-gray-300">
          {year}.{month}.{day}
        </span> */}
        </div>
      </div>
      {user?.id === comment.author.id ? (
        <div className="w-1/4 flex items-center">
          <>
            <button onClick={() => handleCommentDelete(comment.id)}>
              <TiDelete className="w-5 h-5 comment-x" />
            </button>
          </>
        </div>
      ) : null}
    </div>
  );
};
export default CommentElement;
