import React, { useEffect } from "react";
import { Navigate, Route, useNavigate, useParams } from "react-router";
import styled from "styled-components";
import {
  API_BASE_URL,
  imgurl,
  joinmeurl,
  likedislike,
  mytravel,
} from "../../config";
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
import JoinMeEditForm from "./JoinMeEditForm";
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

const CATEGORY_ID = 1;

function JoinMeDetail(props) {
  const [post, setPost] = useState([]);
  const { showJoinMeDetail, closeModal, joinMeId, profile_img } = props;
  const [likeState, setLikeState] = useState();
  const [like, setLike] = useState(false);
  const [likeordislikeid, setLikeordislikeid] = useState(0);
  const [imageArr, setImageArr] = useState([]);
  const [render, setRender] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAPI = async () => {
      axios
        .get(joinmeurl + "/selectone", { params: { joinMeId: joinMeId } })
        .then((reslist) => {
          console.log("resList : ", reslist);
          setPost(reslist.data);

          console.log("Like axios req boardId : ", joinMeId);
          console.log("Like axios req categoryId : ", CATEGORY_ID);

          //{likeOrDislikeDTO : {
          //categoryId:CATEGORY_ID
          //boardId:boardId
          const reslikefc = axios
            .get(
              likedislike +
                "/selectone?boardId=" +
                joinMeId +
                "&categoryId=" +
                CATEGORY_ID,
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
                },
              }
            )
            .then((reslike) => {
              console.log("reslike : ", reslike);
              setLikeordislikeid(reslike.data.likeOrDislikeId);
              setLikeState(reslike.data.likeCount);
              if (reslike.data.liked === true) {
                setLike(true);
                console.log("like? : ", like);
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

          const getimage = axios
            .get(
              imgurl +
                "/selectall?categoryId=" +
                CATEGORY_ID +
                "&boardId=" +
                joinMeId,
              {
                headers: {
                  Authorization:
                    "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
                },
              }
            )
            .then((resImage) => {
              console.log("resImage", resImage.data);
              setImageArr(resImage.data);
            });
        });
    };

    return () => fetchAPI();
  }, [setLike]);

  // 신청하기
  // http 200 뜸 -> DB엔 안 들어감
  function sendServerApply(data) {
    if (post.currentMemberCount >= post.capacity) {
      alert("인원이 꽉 찼습니다.");
      return;
    } else if (data.comment === "") {
      alert("코멘트를 입력해주세요.");
    } else if (!is_logged) {
      alert("로그인이 필요합니다.");
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

  // 수정
  const upDateHandler = () => {
    if (post.nickname != getUserNickname) {
      // 애초에 수정버튼이 안 보이겠지만
      alert("수정할 수 없습니다.");
    } else {
      navigate("/joinmeedit", { state: post });
    }
  };

  // 삭제
  const deleteHandler = () => {
    console.log(joinMeId);
    if (post.nickname != getUserNickname) {
      alert("작성자가 아닙니다.");
      return;
    } else if (post.nickname === getUserNickname) {
      alert("정말 삭제하시겠습니까 ? ");
      axios
        .delete(joinmeurl + "/delete?joinMeId=" + joinMeId, bearerToken)
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
  //글 마감
  const closedHandler = () => {
    if (post.nickname != getUserNickname) {
      alert("작성자가 아닙니다.");
      return;
    } else {
      axios
        .get(joinmeurl + "/setclosed?joinMeId=" + joinMeId, bearerToken)
        .then((res) => {
          if (res.data === true) {
            alert("마감 되었습니다!");
            axios
              .post(mytravel + "/insert", { joinMeid: joinMeId })
              .then((res) => {
                console.log("mytravel아이디", res.data);
                res.data === true
                  ? alert("내 여행 게시물을 생성했습니다.")
                  : alert("내 여행 게시물 생성에 실패했습니다.");
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
          } else {
            alert("마감에 실패했습니다!");
          }
        });
    }
  };

  console.log("likeordislikeid second : ", likeordislikeid);
  // 좋아요
  const LikeToggleBtn = async (e) => {
    console.log("likeordislikeid active : ", likeordislikeid);
    const res = (axios.defaults.headers = {
      "Content-Type": "application/json; charset = utf-8",
      Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
    });
    await axios
      .put(likedislike + "/clicklike?likeOrDislikeId=" + likeordislikeid)
      .then((res) => {
        console.log("resdata", res);
        setLike(!like);
        setLikeState(res.data.likeCount);
      });
  };

  return (
    <>
      <Background>
        <DImmedd> </DImmedd>
        <ModalContainer>
          {console.log("show view on detail", post.view)}
          <Closebtn onClick={closeModal} />
          <div className="jd-container">
            <DetailHeader>
              <header>같이가요</header>
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
                    <span className="joinme-usernickname">{post.nickname}</span>
                    <div style={{ marginLeft: "30px" }}>
                      🔅 {post.mannerDegree}
                    </div>
                  </div>
                  <h2 className="joinme-dtitle">{post.title}</h2>
                  <h3 className="joinme-ereion">{post.region}</h3>
                  <div>출발일 : {post?.startDate?.split("T")[0]} </div>
                  <div>도착일 : {post?.endDate?.split("T")[0]} </div>
                </IntroHeaders>
                <IntroBodys>
                  <div>{post.content}</div>
                  <div>
                    {imageArr.map((imgelement, index) => (
                      <img
                        key={index}
                        src={imgelement.imageUrl}
                        width="400px"
                        alt=""
                      />
                    ))}
                  </div>
                  <p className="joinme-nbspspace">&nbsp;</p>
                </IntroBodys>
              </JoinIntroWrapper>
              <div className="joinme-charge">
                <p className="pcharge">
                  {" "}
                  현재 채택된 신청인원 : {post.currentMemberCount} /{" "}
                  {post.capacity} 명
                </p>
              </div>
            </JoinContainerWrapper>
            <div className="jd-likebtn">
              <LikeBtn like={like} onClick={LikeToggleBtn} />{" "}
              <span> {likeState} </span>
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
                
                {post.nickname !== getUserNickname ? (
                <div>
                  <TextField label="코멘트" id="comment" name="comment" />
                  <FooterButton type="submit">신청하기</FooterButton>
                  </div>
                  ) : (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>
                        <Button
                          color="warning"
                          variant="contained"
                          onClick={closedHandler}
                        >
                          마감하기
                        </Button>
                      </span>
                      <span>
                        <Button onClick={upDateHandler}>수정하기</Button>
                        <Button onClick={deleteHandler}>삭제하기</Button>
                      </span>
                    </div>
                   )}
              </Box>
            </JDFooter>
          </div>
        </ModalContainer>
      </Background>
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
