import React, { useEffect, useRef, useState } from "react";
import apis from "../../shared/api/main";
import { PopularBoardMap } from "../board/A-boardindex";

//css
import styled from "styled-components";
import { left, right } from "../../shared/svg/A-index";

import { getCookie } from "../../shared/Cookie";
import axios from "axios";
import { editorchoice } from "../../config";
import ThumbUpSharpIcon from "@mui/icons-material/ThumbUpSharp";

//에러로그
// import * as Sentry from "@sentry/react";

const PopularEditorChoice = () => {
  const [loading, setLoading] = useState(false);
  const [hotEditorArr, setHotEditorArr] = useState([]);
  const [curruntIdx, setCurrentIdx] = useState(0);
  const [count, setCount] = useState(0);
  // const token = getCookie("token")

  const TOTAL_SLIDES = 2;
  const slideRef = useRef(null);

  //슬라이드 넘기기
  const nextSlide = () => {
    if (curruntIdx >= TOTAL_SLIDES) {
      setCurrentIdx(TOTAL_SLIDES);
    } else {
      setCurrentIdx((prev) => prev + 1);
    }
  };

  //슬라이드 넘기기
  const prevSlide = () => {
    if (curruntIdx === 0) {
      setCurrentIdx(0);
    } else {
      setCurrentIdx((prev) => prev - 1);
    }
  };

  //넘기는 모션
  useEffect(() => {
    console.log("currentIdx", curruntIdx);
    slideRef.current.style.transition = `all 0.5s ease-in-out`;
    slideRef.current.style.transform = `translateX(-${290 * curruntIdx}px)`;
  }, [curruntIdx]);

  useEffect(() => {
    const getHotEditor = axios
      .get(editorchoice + "/selectallnew6")
      .then((resList) => {
        console.log("editorArr", resList.data);
        setHotEditorArr(resList.data);
        setCount(resList.data.length);
      })
      .catch((error) => {
        if (error.res) {
          console.log(error.res);
          console.log("server responded");
          alert("axios 에러");
        } else if (error.request) {
          console.log("network error");
          alert("server 에러");
        } else {
          console.log(error);
        }
      });
  }, []);

  return (
    <>
      <ScWrap>
        <ScTop>
          <div style={{ fontFamily: "SUIT ExtraBold", fontSize: "1.5em" }}>
            에디터 추천 New 6
          </div>
          <ScMoveButton style={{ display: "flex", marginBottom: "10px" }}>
            <div onClick={prevSlide}>
              <img src={left} alt="" />
            </div>
            <div onClick={nextSlide}>
              <img src={right} alt="" />
            </div>
          </ScMoveButton>
        </ScTop>

        <Container>
          <ImageBox ref={slideRef} count={count}>
            {hotEditorArr?.map((item, index) => (
              <div
                key={index}
                style={{
                  marginLeft: "15px",
                  marginRight: "15px",
                  border: "solid 1px lightgrey",
                  borderRadius: "5%",
                }}
              >
                <img
                  style={{ borderRadius: "5% 5% 0 0" }}
                  width="255px"
                  height="220px"
                  src={item.editorImgUrl2}
                />
                <div style={{ margin: "15px" }}>
                  <h3>
                    {item?.title?.length > 16
                      ? item.title.slice(0, 16) + "..."
                      : item.title}
                  </h3>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginTop: "10px",
                      fontSize: "14px",
                    }}
                  >
                    <h3
                      style={{
                        color: "grey",
                      }}
                    >
                      {item.nickname}
                    </h3>
                    <h3
                      style={{
                        backgroundColor: "#2F9D27",
                        color: "white",
                        padding: "3px",
                        borderRadius: "20%",
                      }}
                    >
                      {item.region}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </ImageBox>
        </Container>
      </ScWrap>
    </>
  );
};

const ScWrap = styled.div`
  /* border: 1px solid black; */
  margin: 10px auto 40px;
  max-width: 1300px;
  width: 85%;
  height: 450px;
  background-color: #e0ffdb;
  border-radius: 20px;
  padding: 20px;
`;

const ScTop = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0 10px 30px;
  color: #005000;
`;
const ScMoveButton = styled.div`
  display: flex;
  margin: 3% 5% 0 0;
  gap: 24px;
  color: #005000;
`;
const Container = styled.div`
  max-width: 1150px;
  width: 100%;
  height: 500px;
  margin: 0 auto;
  overflow: hidden;
  /* position: relative; */
`;

const ImageBox = styled.ul`
  margin: 0 0 0 0;
  padding: 0;
  width: 100%;
  display: flex;
  transition: ${(props) => (!props.count ? "" : "all 1s ease-in-out")};
  transform: ${(props) => "translateX(-" + props.count * 1100 + "px)"};
`;
const ImageList = styled.li`
  list-style: none;
`;

export default PopularEditorChoice;
