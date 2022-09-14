import { Table } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { mytravel } from "../../config";
import { bearerToken } from "../../util";
import "./MyTravelDetail.css";
import Plus from "@mui/icons-material/Add";
import Minus from "@mui/icons-material/Remove";
import Degree from "@mui/icons-material/Thermostat";
import Region from "@mui/icons-material/Room";
import People from "@mui/icons-material/People";
import TakeOff from "@mui/icons-material/FlightTakeoff";
import Land from "@mui/icons-material/FlightLand";
import Person from "@mui/icons-material/Person";
import MyTravelReply from "./MyTravelReply";

const MyTravelDetail = () => {
  const location = useLocation();
  const myTravelId = location?.state?.myTravelId;
  const [post, setPost] = useState();
  const [replyArr, setReplyArr] = useState([]);
  const [userArr, setUserArr] = useState([]);

  useEffect(() => {
    const selectOne = axios
      .get(mytravel + "/selectone?myTravelId=" + myTravelId, bearerToken)
      .then((res) => {
        console.log("res", res);
        setPost(res.data);

        const selectUserList = axios
          .get(
            mytravel + "/user/selectall?myTravelId=" + myTravelId,
            bearerToken
          )
          .then((reslist) => {
            console.log("user", reslist.data);
            setUserArr(reslist.data);
          });

        const selectReply = axios
          .get(
            mytravel +
              "/reply/selectall?myTravelId=" +
              myTravelId +
              "&pageNo=1",
            bearerToken
          )
          .then((reslist) => {
            console.log("reply", reslist.data.list);
            setReplyArr(reslist.data.list);
          });
      });
  }, []);

  return (
    <div>
      <MainContent>
        <Header></Header>
        <Content>
          <div className="row">
            <div className="nameCell">여행 번호</div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.myTravelId}
            </div>
          </div>
          <div className="row">
            <div className="nameCell">
              <Region />
              &nbsp;&nbsp;지역
            </div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.region}
            </div>
            <div className="nameCell">
              <People />
              &nbsp;&nbsp;인원수
            </div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.memberCount}
            </div>
          </div>
          <div className="row">
            <div className="nameCell">
              <TakeOff />
              &nbsp;&nbsp;출발일
            </div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.startDate?.split("T")[0]}
            </div>
            <div className="nameCell">
              <Land />
              &nbsp;&nbsp;도착일
            </div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.endDate?.split("T")[0]}
            </div>
          </div>
          {userArr.map((item, index) => (
            <div className="row" key={index}>
              <div className="memberCell">
                <Person />
                &nbsp;&nbsp;Member{index + 1}
              </div>
              <div className="imgCell">
                <img className="profileImg" src={item.profileImageUrl} alt="" />
              </div>
              <div className="nicknameCell">{item?.nickname}</div>
              <div className="mannerCell">
                <Degree /> {item.mannerDegree}
              </div>
              <div className="mannerCell2">
                <Plus fontSize="small" />
                <br />
                <Minus fontSize="small" />
              </div>
            </div>
          ))}
          <div className="titleCell">{post?.title}</div>
          <div className="cell">{post?.content}</div>
          <div>
            {replyArr &&
              replyArr.map((item, index) => (
                <MyTravelReply key={index} reply={item} />
              ))}
          </div>
        </Content>
      </MainContent>
    </div>
  );
};

export default MyTravelDetail;

const MainContent = styled.main``;
const Header = styled.div``;
const Content = styled.div`
  width: 50%;
  margin: auto;
`;
