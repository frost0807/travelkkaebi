import React, { useEffect } from "react";
import { Navigate, Route, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { API_BASE_URL, joinmeurl, likedislike, pickurl } from "../../config";
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
} from "./pickupme.style";
import PickUpMeEditForm from "./PickUpMeEditForm";
import LikeBtn from "../../components/Like/LikeBtn";
import Login from "../../components/Login/Login";
import { useState } from "react";
import { isLoginState } from "../../recoil/atom";
import {
  bearerToken,
  getNickname,
  getToken,
  getUsername,
  getUserNickname,
  is_logged,
} from "../../util";

const CATEGORY_ID = 2;

function PickUpMeDetail(props) {
  const [post, setPost] = useState([]);
  const { showPickMeDetail, close, boardId, profile_img, startDate, endDate } =
    props;

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      axios.get(pickurl + "/show/" + boardId).then((reslist) => {
        console.log("resList : ", reslist);
        setPost(reslist.data);
      });
    };

    return () => fetchAPI();
  }, []);

  // 신청하기
  // http 200 뜸 -> DB엔 안 들어감
  function sendServerApply(data) {
    if (data.comment === "") {
      alert("코멘트를 입력해주세요.");
    } else if (!is_logged) {
      alert("로그인이 필요합니다.");
    } else {
      axios.defaults.headers = {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      axios
        .post(API_BASE_URL + "/pickme/apply", data)
        .then((res) => {
          console.log("ㅁㅎㄷㅁㄷㅎㅁㄷㅎ", res);
          if (res.status === 200) {
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
            console.log(error.request);
            console.log(error.request.message);
            alert("이미 신청했거나 알 수 없음.");
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

    sendServerApply({ comment: comment, boardId: boardId });
  };

  // 수정
  const upDateHandler = () => {
    if (post.nickname != getUserNickname) {
      // 애초에 수정버튼이 안 보이겠지만
      alert("수정할 수 없습니다.");
    } else {
      navigate("/pickmeedit", { state: post });
    }
  };

  // 삭제
  const deleteHandler = () => {
    console.log(boardId);
    if (post.nickname != getUserNickname) {
      alert("작성자가 아닙니다.");
      return;
    } else if (post.nickname === getUserNickname) {
      alert("정말 삭제하시겠습니까 ? ");
      axios
        .delete(joinmeurl + "/delete?pickmeId=" + boardId, bearerToken)
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
      {showPickMeDetail && (
        <Background>
          <DImmedd> </DImmedd>
          <ModalContainer>
            <Closebtn onClick={close} />
            <div className="jd-container">
              <DetailHeader>
                <header>PICK ME</header>
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
                    <h3 className="joinme-ereion">{post.preferredRegion}</h3>
                    <div>출발일 : {startDate}</div>
                    <div>도착일 : {endDate}</div>
                  </IntroHeaders>
                  <IntroBodys>
                    <div>{post.content}</div>
                    <p className="joinme-nbspspace">&nbsp;</p>
                  </IntroBodys>
                </JoinIntroWrapper>
              </JoinContainerWrapper>
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
                    <FooterButton type="submit">신청하기</FooterButton>
                    {post.nickname === getUserNickname ? (
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <Button onClick={upDateHandler}>수정하기</Button>
                        <Button onClick={deleteHandler}>삭제하기</Button>
                      </div>
                    ) : null}
                  </div>
                </Box>
              </JDFooter>
            </div>
          </ModalContainer>
        </Background>
      )}
    </>
  );
}

export default PickUpMeDetail;

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
