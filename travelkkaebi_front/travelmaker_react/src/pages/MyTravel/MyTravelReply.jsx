import "./MyTravelReply.css";

const MyTravelReply = (props) => {
  const reply = props.reply;

  return (
    <>
      {reply.nickname === localStorage.getItem("nickname") ? (
        <div className="myReply">
          <div className="myMessageBox">{reply.content}</div>
          <div>
            <img
              className="replyProfileImg"
              src={reply.profileImageUrl}
              alt=""
            />
            <div className="replyNickname">{reply.nickname}</div>
          </div>
        </div>
      ) : (
        <div className="reply">
          <div>
            <img
              className="replyProfileImg"
              src={reply.profileImageUrl}
              alt=""
            />
            <div className="replyNickname">{reply.nickname}</div>
          </div>
          <div className="messageBox">{reply.content}</div>
        </div>
      )}
    </>
  );
};

export default MyTravelReply;
