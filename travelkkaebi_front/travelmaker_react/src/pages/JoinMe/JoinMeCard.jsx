import React, { useEffect, useState } from "react";
import styled from "styled-components";
import HeartImg from "../../images/heart.png";
import Logo from "../../images/basicLogo.png";
import "./JoinMe.css";
import { useParams } from "react-router";
import Modal from "../../components/Modal/Modal";
import JoinMeDetail from "./JoinMeDetail";
import { useRecoilState } from "recoil";
import { isLoginModalState, showJoinMeDetailState } from "../../recoil/atom";
import Login from "../../components/Login/Login";

function JoinMeCard(props) {
  const [post, setPosts] = useState(props.post);
  const { id } = useParams();

  return (
    <CardSection>
      <CardTop>
        <CardTitle>
          {post.title.length < 20
            ? post.title
            : post.title.slice(0, 20) + "..."}
        </CardTitle>
        <CardsubTitle>
          <CardsubList>
            <div className="joinme-subtitle">
              <dt className="joinme-sublabel">지역</dt>
              <dt className="joinme-subdata">지역data</dt>
            </div>
            <div className="joinme-subtitle2">
              <dt className="joinme-sublabel"> 날짜</dt>
              <dt className="joinme-subdata">22.8.12</dt>
            </div>
            <div className="joinme-subtitle3">
              <dt className="joinme-sublabel">인원</dt>
              <dt className="joinme-subdata">5명</dt>
            </div>
          </CardsubList>
          <figure className="card_profileimg">
            <img src={Logo} alt="유저프로필" loading="lazy"></img>
          </figure>
        </CardsubTitle>
      </CardTop>
      <CardBottom>
        <div className="card_username">
          <span>{post.userId}</span>
          <div className="like-btn">
            <Heart src={HeartImg} />
            <span>300</span>
          </div>
        </div>
      </CardBottom>
    </CardSection>
  );
}

export default JoinMeCard;

const CardSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  min-height: 280px;
  height: 100%;
  padding: 24px;
  border-radius: 8px;s
  cursor: pointer;
  box-sizing: inherit;
  border: 1px solid #e9ebee;
  background-color: #fff;
  transition: transform 0.2s ease-in-out;
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  }
`;
const CardTop = styled.div`
  position: relative;
  height: 100%;
  box-sizing: inherit;
  display: block;
`;
const CardTitle = styled.h3`
  margin: 0;
  padding: 0;
  font-weight: 400;
  letter-spacing: -0.3px;
  font-size: 16px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  text-align: left;
  word-break: break-all;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  color: #1b1c1d;
  margin-bottom: 8px;
  line-height: 24px;
  box-sizing: inherit;
  margin-block-start: 0.3em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
`;
const CardsubTitle = styled.div`
  box-sizing: inherit;
  display: block;
`;
const CardsubList = styled.dl`
  margin: 0;
  padding: 0;
  padding-top: 8px;
  display: block;
  margin-block-start: 1.2em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  border-top: 1px solid #f1f3f5;
  box-sizing: inherit;
`;
const CardBottom = styled.div`
  flex-shrink: 0;
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #f1f3f5;
  box-sizing: inherit;
  display: block;
`;
const Heart = styled.img`
  margin-right: 3px;
  font-size: 12px;
  font-weight: inherit;
  font-style: inherit;
  line-height: 1;
  width: 13px;
  height: 13px;
`;
