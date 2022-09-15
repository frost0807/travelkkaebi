import { compose } from "@mui/system";
import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Slider from "react-slick";
import { Route, Router, Routes } from "react-router";
import styled from "styled-components";
import { joinmeurl } from "../../config";
import { bearerToken } from "../../util";
import JoinMeCard from "../JoinMe/JoinMeCard";
import JoinApplyCard from "./JoinApply/JoinApplyCard";
import SideNavigation from "./SideNavigation";
import "./CarouselContent.css";

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
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

  return (
    <Center>
      <SideNavigation />

      <div className="Carousel">
        <h4> JOIN ME</h4>
        <p> 내가 최근에 작성한 게시글 </p>
        <Slider {...settings}>
          <div className="mypage-card">
            {post &&
              post.map((post, idx) => (
                <JoinApplyCard key={post.joinMeId} post={post} />
              ))}
          </div>
        </Slider>
      </div>
    </Center>
  );
};
