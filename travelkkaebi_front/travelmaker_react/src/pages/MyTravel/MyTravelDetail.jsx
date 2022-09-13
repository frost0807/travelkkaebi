import { Table } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import { mytravel } from "../../config";
import { bearerToken } from "../../util";

const MyTravelDetail = () => {
  const location = useLocation;
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
          <Table style={{ fontSize: "18px" }}>
            <tr>
              <td style={{ backgroundColor: "#DBFFD5" }}>여행 번호</td>
              <td>{post?.myTravelId}</td>
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
          </Table>
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
