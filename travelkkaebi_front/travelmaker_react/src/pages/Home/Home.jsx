import React from "react";
import CardImg from "../../components/CardImg/CardImg";
import CarouselHome from "../../components/Carousel/CarouselHome";
import PopularEditorChoice from "../../components/PopularBoard/PopularEditorChoice";
import PopularReview from "../../components/PopularBoard/PopularReview";

import "./Home.css";

// 백엔드에서 메인 홈화면의 상단 정보/후기 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (위의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 백엔드에서 메인 홈화면의 하단 Party 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (아래의의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 하단 CardImg에서 props로 컴포넌트에 보내서 처리

function Home() {
  return (
    <>
      <div style={{ height: "40%", width: "35%", margin: "auto" }}>
        <CarouselHome />
      </div>

      <div
        style={{
          marginTop: "100px",
          marginLeft: "100px",
          marginBottom: "20px",
          fontSize: "25px",
        }}
      ></div>
      <CardImg
        topImage1="topImage1"
        topImage2="topImage2"
        topImage3="topImage3"
        topImage4="topImage4"
      />
      <div style={{ height: "100px" }}></div>
      <PopularEditorChoice />
    </>
  );
}

export default Home;
