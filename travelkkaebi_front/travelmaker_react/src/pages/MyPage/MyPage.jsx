import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { joinmeurl, pickmeapply } from "../../config";
import { bearerToken } from "../../util";
import SideNavigation from "./SideNavigation";
import "./CarouselContent.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import JoinMeCard from "../JoinMe/JoinMeCard";
import PickUpMeCard from "../PickUpMe/PickUpMeCard";

const Centers = styled.div`
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const MainRow = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 200px;
  margin-top: 20px;
`;

export const MyPage = () => {
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1018,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [post, setPosts] = useState([]);
  const [pickPost, setPickPost] = useState([]);

  const URL = joinmeurl + "/selectallbypage/myboardlist";
  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(URL, { params: { pageNo: 1 } }, bearerToken)
        .then((res) => {
          console.log("게시글리스트 받기 ", res);
          setPosts(res.data.list);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    fetchPost();
  }, []);

  const pickURL = pickmeapply + "/my/applylist";
  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(pickURL, { params: { page: 1 } }, bearerToken)
        .then((res) => {
          console.log(res.data);
          setPickPost(res.data.list);
          console.log("list : ", res.data.list);
        });
    };
    return () => fetchPost();
  }, []);

  return (
    <>
      <Centers>
        <SideNavigation />

        <MainRow>
          <div style={{ flexDirection: "row", marginTop: "80px" }}>
            <h4> JOIN ME</h4>
            <p> 내가 최근에 작성한 게시글 </p>
            <div className="mypage-Carousel">
              <Slider {...settings}>
                {post &&
                  post.map((post, idx) => (
                    <JoinMeCard key={post.joinMeId} post={post} />
                  ))}
              </Slider>
            </div>
          </div>
          <div style={{ flexDirection: "row", marginTop: "80px" }}>
            <h4>PICK ME</h4>
            <p> 내가 최근에 작성한 게시글 </p>
            <div className="mypage-Carousel">
              <Slider {...settings}>
                {pickPost &&
                  pickPost.map((post, idx) => (
                    <PickUpMeCard key={post.joinMeId} post={post} />
                  ))}
              </Slider>
            </div>
          </div>
        </MainRow>
      </Centers>
    </>
  );
};
