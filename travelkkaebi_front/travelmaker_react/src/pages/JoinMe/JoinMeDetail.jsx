import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { API_BASE_URL } from "../../config";
import axios from "axios";
import { TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Box } from "@mui/system";
import {
  DetailHeader,
  FooterButton,
  IntroBodys,
  IntroHeaders,
  JDFooter,
  JoinContainerWrapper,
  JoinIntroWrapper,
} from "./joinme.style";
import Logo from "../../images/basicLogo.png";
import LikeBtn from "../../components/Like/LikeBtn";
import Login from "../../components/Login/Login";
import Modal from "../../components/Modal/Modal";
import { useRecoilState } from "recoil";
import { isLoginModalState, showJoinMeDetailState } from "../../recoil/atom";
import { getUsername } from "../../util";

function JoinMeDetail(props) {
  /*  useEffect(()=>{
    const joinmeapi = () =>{
      axios.get(API_BASE_URL+"/joinme/selectone" {params:{joinMeId : props.post.id}})
      .then(res=>{
        setPost(res.data);
        console.log("res",res.data)
      }
      )
    }
    return
  },[])
  */
  const { id } = useParams();

  const [showJoinMeDetail, setShowJoinMeDetail] = useRecoilState(
    showJoinMeDetailState
  );
  const close = () => {
    setShowJoinMeDetail(false);
  };

  // 신청하기
  // textfield\ 값 상태로 저장해서 보내기
  const joinMeApply = () => {
    /*if(post.curruntMember >=  post.charge) {
        alert("인원이 꽉 찼습니다.");
        return;
    } else {
      axios.post(API_BASE_URL+"신청하기", value)
      .then(res => {
        alert("신청완료하였습니다.")
        window.location.reload(); ( 신청인원 상태 리랜더 )
      }
    }
    */
    // 좋아요의 상태 전역
  };

  return (
    <Background>
      <DImmedd> </DImmedd>
      <ModalContainer showJoinMeDetail={showJoinMeDetail}>
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
                <FooterButton onClick={joinMeApply}>신청하기</FooterButton>
              </div>
            </Box>
          </JDFooter>
        </div>
        <Closebtn onClick={close} />
      </ModalContainer>
    </Background>
  );
}

export default JoinMeDetail;

const Background = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 80;
  box-sizing: inherit;
`;
const DImmedd = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background: rgba(11, 19, 30, 0.37);
`;
const ModalContainer = styled.div`
display: flex;
flex-direction: column;
position: relative;
bottom: 0;
overflow: hidden;
padding: 32px;
min-width: 500px;
width: 500px;
height: 700px;
max-height: 700px;
border-radius: 8px;
background-color: #fff;
box-sizing: inherit;
z-index: 9;
animation: modal-show 0.3s;
@media 480px {
  width: 90%
`;

const Closebtn = styled(CloseIcon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  color: rgb(94, 94, 94);
  cursor: pointer;
`;
