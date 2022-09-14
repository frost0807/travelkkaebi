import "./MyTravelReply.css";

const MyTravelReply = (props) => {
  const reply = props.reply;

  return (
    <>
      {reply.nickname === localStorage.getItem("nickname") ? (
        <div className="myReply">
          <div className="myMessageBox">{reply.content}</div>
          <img className="replyProfileImg" src={reply.profileImageUrl} alt="" />
        </div>
      ) : (
        <div className="reply">
          <img className="replyProfileImg" src={reply.profileImageUrl} alt="" />
          <div className="messageBox">{reply.content}</div>
        </div>
      )}
    </>
  );
};

export default MyTravelReply;
