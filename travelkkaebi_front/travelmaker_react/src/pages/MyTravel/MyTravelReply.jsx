import "./MyTravelReply.css";

const MyTravelReply = (props) => {
  const reply = props.reply;

  return (
    <div className="reply">
        <img className="profileImg" src={reply.profileImageUrl} alt="" />
        <div className="messageBox"></div>
    </div>
  );
};

export default MyTravelReply;
