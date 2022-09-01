import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { TextField } from "@mui/material";
import { Box } from "@mui/system";
import {
  DetailHeader,
  FooterButton,
  IntroBodys,
  IntroHeaders,
  JContainerWrapper,
  JDFooter,
  JoinContainerWrapper,
  JoinDetailwrapper,
  JoinIntroWrapper,
} from "./joinme.style";
import Logo from "../../images/basicLogo.png";
import LikeBtn from "../../components/Like/LikeBtn";

function JoinMeDetail(props) {
  // useEffect(() => {
  //   axios.get(API_BASE_URL + joinid).then((res) => setPosts(res.data));
  // }, []);
  const joinid = useParams();

  return (
    <div className="jd-container">
      <DetailHeader>
        <header>JOIN ME</header>
        <p style={{ fontSize: "0.75rem" }}>
          <i className="fa-solid fa-eye">&nbsp;300</i>
        </p>
      </DetailHeader>
      <JoinContainerWrapper>
        <JoinIntroWrapper>
          <IntroHeaders>
            <div className="joinme-userinfo">
              <img src={Logo} alt="" />
              {/** get user_profile_img / onclick event*/}
              <span className="joinme-usernickname">NICKNAME</span>
              <div style={{ marginLeft: "30px" }}>🔅 37</div>
            </div>
            <h2 className="joinme-dtitle">TITLE</h2>
            <h3 className="joinme-ereion">제주도</h3>
            <div>출발일 : 09-17 </div>
            <div>도착일 : 09-23 </div>
          </IntroHeaders>
          <IntroBodys>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <div>content</div>
            <p className="joinme-nbspspace">&nbsp;</p>
          </IntroBodys>
        </JoinIntroWrapper>
        <div className="joinme-charge">
          <p className="pcharge"> 현재 신청인원 : 3 / 6 명</p>
        </div>
      </JoinContainerWrapper>
      <div className="jd-likebtn">
        <LikeBtn /> <span> 215 </span>
      </div>
      <JDFooter>
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 2, width: "35ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <div>
            <TextField
              label="코멘트"
              id="outlined-size-normal"
              defaultValue="Normal"
            />
            <FooterButton>신청하기</FooterButton>
          </div>
        </Box>
      </JDFooter>
    </div>
  );
}

export default JoinMeDetail;
