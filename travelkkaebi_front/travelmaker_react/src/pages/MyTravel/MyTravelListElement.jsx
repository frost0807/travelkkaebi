import { Navigate, useNavigate } from "react-router";
import MyTravelDetail from "./MyTravelDetail";

const MyTravelListElement = (props) => {
  const item = props.myTravelPost;
  const navigate = useNavigate();
  {
    console.log("item", item);
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        padding: "10px",
        fontSize: "18px",
      }}
    >
      <div style={{ width: "50px", textAlign: "center" }}>
        {item?.myTravelId}
      </div>
      <div
        style={{ width: "450px", textAlign: "center" }}
        onClick={<MyTravelDetail />}
      >
        {item?.title}
      </div>
      <div style={{ width: "150px", textAlign: "center" }}>
        {item?.nickname}
      </div>
      <div style={{ width: "70px", textAlign: "center" }}>{item?.region}</div>
      <div style={{ width: "70px", textAlign: "center" }}>
        {item?.memberCount}
      </div>
      <div style={{ width: "120px", textAlign: "center" }}>
        {item?.startDate?.split("T")[0]}
      </div>
      <div style={{ width: "120px", textAlign: "center" }}>
        {item?.endDate?.split("T")[0]}
      </div>
    </div>
  );
};

export default MyTravelListElement;
