import React from "react";
import CardImg from "../../components/CardImg/CardImg";
import CarouselHome from "../../components/Carousel/CarouselHome";
import PopularBoard from "../../components/PopularBoard/PopularBoard";

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
      <PopularBoard />
      {/* <div
        style={{
          padding: "20px",
          margin: "33px auto 62px",
          maxWidth: "1200px",
          width: "85%",
          height: "410px",
          borderRadius: "20px",
          backgroundColor: "#F4F1FF",
        }}
      >
        <div style={{ height: "20%", margin: "30px 0 10px 30px" }}>
          <div style={{ fontFamily: "SUIT ExtraBold", fontSize: "1.875em" }}>
            에디터 추천 Top 6
          </div>
          <div style={{ marginTop: "10px" }}>
            깨비들이 가장 많이 추천한 게시물!
          </div>
        </div>
        <div className="container" style={{ height: "60%", width: "100%" }}>
          <div
            className="1slide"
            style={{
              backgroundColor: "red",
              height: "100%",
              width: "22.5%",
              borderRadius: "10%",
            }}
          >
            <div className="1img"></div>
            <div className="1content"></div>
          </div>
          <div
            className="2slide"
            style={{
              backgroundColor: "red",
              height: "100%",
              width: "22.5%",
              borderRadius: "10%",
            }}
          >
            b
          </div>
          <div
            className="3slide"
            style={{
              backgroundColor: "red",
              height: "100%",
              width: "22.5%",
              borderRadius: "10%",
            }}
          >
            c
          </div>
          <div
            className="4slide"
            style={{
              backgroundColor: "red",
              height: "100%",
              width: "22.5%",
              borderRadius: "10%",
            }}
          >
            d
          </div>
        </div>
      </div> */}

      <div
        style={{
          marginTop: "100px",
          marginLeft: "100px",
          marginBottom: "20px",
          fontSize: "25px",
        }}
      >
        🚀 Hot
      </div>
      <CardImg
        topImage1="topImage1"
        topImage2="topImage2"
        topImage3="topImage3"
        topImage4="topImage4"
      />
      {/* <div style={{height:'100px'}}></div> */}
      {/* <CardImg bottomImage1="bottomImage1" bottomImage2="bottomImage2" bottomImage3="bottomImage3"  bottomImage4="bottomImage4" /> */}
    </>
  );
}

export default Home;
