import React, { useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import { API_BASE_URL, joinmeurl } from "../../config";
import axios from "axios";
import { Button, TextField } from "@mui/material";
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
import LikeBtn from "../../components/Like/LikeBtn";
import Login from "../../components/Login/Login";
import { useState } from "react";
import { isLoginState } from "../../recoil/atom";
import {
  bearerToken,
  getNickname,
  getToken,
  getUsername,
  headerConfig,
  headerImg_tk,
} from "../../util";

function JoinMeDetail(props) {
  const [post, setPost] = useState([]);
  const {
    showJoinMeDetail,
    close,
    joinMeId,
    profile_img,
    likeCount,
    setShowJoinMeDetail,
  } = props;
  const [likeState, setLikeState] = useState(likeCount);
  const [comentValue, setComentValue] = useState("");

  const { id } = useParams();

  useEffect(() => {
    const joinmeapi = () => {
      axios
        .get(joinmeurl + "/selectone", { params: { joinMeId: joinMeId } })
        .then((res) => {
          console.log("res : ", res.data);
          setPost(res.data);
        });
    };
    return () => joinmeapi();
  }, []);

  const onClose = () => {
    setShowJoinMeDetail(false);
  };
  // 신청하기
  // http 200 뜸 -> DB엔 안 들어감
  function sendServerApply(data) {
    if (post.currentMemberCount >= post.capacity) {
      alert("인원이 꽉 찼습니다.");
      return;
    } else if (data.comment === "") {
      alert("코멘트를 입력해주세요.");
    } else {
      axios.defaults.headers = {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      axios
        .post(API_BASE_URL + "/joinmeapply/insert", data)
        .then((res) => {
          console.log(res);
          if (res.data === true) {
            alert("신청이 완료되었습니다.");
          }
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
    }
  }
  //    window.location.reload();
  //    navigator('/joime/1');

  // textfield\ 값 상태로 저장해서 보내기
  const joinMeApply = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const comment = formData.get("comment");
    console.log("comment ", comment);

    sendServerApply({ comment: comment, joinMeId: joinMeId });
  };

  // 좋아요

  // 삭제
  const deleteHandler = () => {
    console.log(joinMeId);
    if (post.nickname === getNickname) {
      axios.defaults.headers = {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      axios
        .delete(joinmeurl + "/delete", joinMeId)
        .then((res) => {
          console.log(res);
          window.location.reload();
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
    }
  };

  return (
    <>
      {showJoinMeDetail ? (
        <Background>
          <DImmedd> </DImmedd>
          <ModalContainer>
            <Closebtn onClick={onClose} />
            <div className="jd-container">
              <DetailHeader>
                <header>JOIN ME</header>
                <p style={{ fontSize: "0.75rem" }}>
                  <i className="fa-solid fa-eye">&nbsp;{post.view}</i>
                </p>
              </DetailHeader>
              <JoinContainerWrapper>
                <JoinIntroWrapper>
                  <IntroHeaders>
                    <div className="joinme-userinfo">
                      <img src={profile_img} alt="" />
                      {/** get user_profile_img / onclick event*/}
                      <span className="joinme-usernickname">
                        {post.nickname}
                      </span>
                      <div style={{ marginLeft: "30px" }}>
                        🔅 {post.mannerDegree}
                      </div>
                    </div>
                    <h2 className="joinme-dtitle">{post.title}</h2>
                    <h3 className="joinme-ereion">{post.region}</h3>
                    <div>출발일 : 09-17 </div>
                    <div>도착일 : 09-23 </div>
                  </IntroHeaders>
                  <IntroBodys>
                    <div>{post.content}</div>
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
                  <p className="pcharge">
                    {" "}
                    현재 신청인원 : {post.currentMemberCount} / {post.capacity}{" "}
                    명
                  </p>
                </div>
              </JoinContainerWrapper>
              <div className="jd-likebtn">
                <LikeBtn /> <span> {likeState} </span>
              </div>
              <JDFooter>
                <Box
                  component="form"
                  onSubmit={joinMeApply}
                  sx={{
                    "& .MuiTextField-root": { m: 2, width: "35ch" },
                  }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField label="코멘트" id="comment" name="comment" />
                    <FooterButton
                      type="submit"
                      onClick={console.log("Apply event")}
                    >
                      신청하기
                    </FooterButton>
                    <div>
                      <Button>수정하기</Button>
                      <Button onClick={deleteHandler}>삭제하기</Button>
                    </div>
                  </div>
                </Box>
              </JDFooter>
            </div>
          </ModalContainer>
        </Background>
      ) : null}
    </>
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
  display: block;
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
