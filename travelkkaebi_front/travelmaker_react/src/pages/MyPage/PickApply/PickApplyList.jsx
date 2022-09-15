import { Button } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import Pagination from "../../../components/Pagenation/Pagination";
import { joinmeurl, pickmeapply } from "../../../config";
import { bearerToken } from "../../../util";
import "../JoinApply/joinapply.css";
import queryString from "query-string";
import PickApplyCard from "./PickApplyCard";
import PickUpMeCard from "../../PickUpMe/PickUpMeCard";

/** 내가 신청한 게시글 보기 */

const PickApplyList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = window.location.pathname;
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page) || 1;

  const [posts, setPosts] = useState([]);
  const [limits] = useState(9);
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [totalCount, setTotalCount] = useState();

  const URL = pickmeapply + "/my/applylist";
  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(URL, { params: { pageNo: currentPage } }, bearerToken)
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.list);
          console.log("list : ", res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    fetchPost();
    navigate(`${path}?page=${currentPage}`);
  }, [currentPage, navigate, path]);

  // 채택 된 게시글 보기
  const notselect = pickmeapply + "/picked/status";
  const onAlreadySelected = async (e) => {
    const res = await axios
      .get(
        notselect,
        { params: { page: 1, picked: true, boardId: posts.boardId } },
        bearerToken
      )
      .then((res) => {
        console.log("채택된 게시글 눌렀을 때 , ", res);
        if (res.data.list.length > 0) {
          setPosts(res.data.list);
          setTotalCount(res.data.totalBoardCount);
        } else if (res.data.list.length === 0) {
          alert("게시물이 존재하지 않습니다 !");
          return;
        }
      });
  };

  // 채택 대기 중 게시글 보기
  const onNotSelected = async () => {
    const res = await axios
      .get(notselect, { params: { page: 1, picked: false } }, bearerToken)
      .then((res) => {
        console.log("채택 대기 중 게시글 보기 ,", res);
        setPosts(null);
        if (res.data.list.length > 0) {
          setPosts(res.data.list);
          setTotalCount(res.data.totalBoardCount);
        } else if (res.data.list.length === 0) {
          alert("게시물이 존재하지 않습니다 !");
          return;
        }
      });
  };

  return (
    <MainContent>
      <header className="appinstructor_banner">
        <div className="appheader-bncontainer">
          <div className="appins-banner-cover">
            <h1 className="appbannername">MY PAGE</h1>
            <p> 내가 신청한 게시글 </p>
          </div>
        </div>
      </header>
      <Content>
        <ContentBody>
          <div className="appKeyButton" style={{ margin: "2rem" }}>
            <button
              id="myappuser_btn-submit"
              className="myappuser_btn-submit"
              onClick={onNotSelected}
              style={{ marginLeft: "30px" }}
            >
              {" "}
              채택대기
            </button>
            <button
              id="myappuser_btn-submit"
              className="myappuser_btn-submit"
              value="채택완료"
              onClick={onAlreadySelected}
            >
              채택완료
            </button>
          </div>

          <div className="myappuser-btn">
            <a className="myapp_btn_cancel" onClick={() => navigate(-1)}>
              뒤로가기
            </a>
          </div>

          <View>
            {posts &&
              posts.map((post) => (
                <PickUpMeCard key={post.boardId} post={post} />
              ))}
          </View>
          <footer>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              limits={limits}
              totalCount={totalCount}
            />
          </footer>
        </ContentBody>
      </Content>
    </MainContent>
  );
};

export default PickApplyList;

const MainContent = styled.main`
  min-height: 800px;
  box-sizing: inherit;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Content = styled.div`
  max-width: 1300px;
  margin: auto;
  padding: 0 05rem;
  flex-grow: 1;
  position: relative;
  width: auto;
  display: block;
  box-sizing: inherit;
  color: #000a12;
`;
const ContentBody = styled.div`
  width: 100%;
  margin-top: 3rem;
  box-sizing: inherit;
`;
const View = styled.div`
  width: 100%;
  margin-top: 2rem;
  padding: 2rem;
  grid-template-columns: repeat(3, 1fr);
  gap: 80px;
  display: grid;
  box-sizing: inherit;
`;
