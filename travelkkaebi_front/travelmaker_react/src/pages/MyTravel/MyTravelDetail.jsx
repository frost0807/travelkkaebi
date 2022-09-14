import { Table } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { mytravel } from "../../config";
import { bearerToken } from "../../util";
import "./MyTravelDetail.css";

const MyTravelDetail = () => {
  const location = useLocation();
  const myTravelId = location?.state?.myTravelId;
  const [post, setPost] = useState();
  console.log("location", location);

  useEffect(() => {
    const selectOne = axios
      .get(mytravel + "/selectone?myTravelId=7", bearerToken)
      .then((res) => {
        console.log("res", res);
        setPost(res.data);
      });
  }, []);

  return (
    <div>
      <MainContent>
        <Header></Header>
        <Content>
          {/* <Table style={{ fontSize: "18px" }}>
            <tr>
              <td style={{ backgroundColor: "#DBFFD5" }}>여행 번호</td>
              <td style={{ columnSpan: "3" }}>{post?.myTravelId}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#DBFFD5" }}>지역</td>
              <td>{post?.region}</td>
              <td style={{ backgroundColor: "#DBFFD5" }}>인원 수</td>
              <td>{post?.memberCount}</td>
            </tr>
            <tr>
              <td style={{ backgroundColor: "#DBFFD5" }}>출발일</td>
              <td>{post?.startDate?.split("T")[0]}</td>
              <td style={{ backgroundColor: "#DBFFD5" }}>도착일</td>
              <td>{post?.endDate?.split("T")[0]}</td>
            </tr>
            <tr>
              <td>{post?.title}</td>
            </tr>
            <tr>
              <td>{post?.content}</td>
            </tr>
          </Table> */}
          <div className="row">
            <div className="nameCell">여행 번호</div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.myTravelId}
            </div>
          </div>
          <div className="row">
            <div className="nameCell">지역</div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.region}
            </div>
            <div className="nameCell">인원수</div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.memberCount}
            </div>
          </div>
          <div className="row">
            <div className="nameCell">출발일</div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.startDate?.split("T")[0]}
            </div>
            <div className="nameCell">도착일</div>
            <div className="cell" style={{ width: "25%" }}>
              {post?.endDate?.split("T")[0]}
            </div>
          </div>
          <div className="cell">{post?.title}</div>
          <div className="cell">{post?.content}</div>
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
