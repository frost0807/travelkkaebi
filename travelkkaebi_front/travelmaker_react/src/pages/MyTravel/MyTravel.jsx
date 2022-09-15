import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { mytravel } from "../../config";
import styled from "styled-components";
import MyTravelListElement from "./MyTravelListElement";
import { bearerToken } from "../../util";
import MyTravelDetail from "./MyTravelDetail";

const MyTravel = () => {
  const { pageNo } = useParams();
  const [myTravelArr, setMyTravelArr] = useState([]);
  const [limits] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    const getMyTravel = axios
      .get(mytravel + "/selectallbypage?pageNo=1", bearerToken)
      .then((reslist) => {
        console.log("mytravellist", reslist.data);
        setMyTravelArr(reslist.data.list);
      });
  }, []);

  return (
    <>
      <MainContent>
        <Header>
          <img
            width="100%"
            src="https://whdcksbucket.s3.ap-northeast-2.amazonaws.com/static/MyTravel.png"
            alt=""
          />
        </Header>
        <Content>
          <div
            style={{
              marginTop: "50px",
              display: "flex",
              justifyContent: "space-around",
              padding: "10px",
              fontSize: "18px",
              backgroundColor: "#FFFFB3",
            }}
          >
            <div style={{ width: "50px", textAlign: "center" }}>번호</div>
            <div style={{ width: "450px", textAlign: "center" }}>제목</div>
            <div style={{ width: "70px", textAlign: "center" }}>지역</div>
            <div style={{ width: "70px", textAlign: "center" }}>인원</div>
            <div style={{ width: "120px", textAlign: "center" }}>출발일</div>
            <div style={{ width: "120px", textAlign: "center" }}>도착일</div>
          </div>
          {myTravelArr &&
            myTravelArr.map((item, index) => (
              <MyTravelListElement key={index} myTravelPost={item} />
            ))}
        </Content>
      </MainContent>
    </>
  );
};

export default MyTravel;

const MainContent = styled.main``;
const Header = styled.div``;
const Content = styled.div`
  width: 60%;
  margin: auto;
`;
