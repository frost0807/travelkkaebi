import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import Pagination from "../../../components/Pagenation/Pagination";
import { joinmeurl } from "../../../config";
import { bearerToken } from "../../../util";
import JoinMeCard from "../../JoinMe/JoinMeCard";
import "./joinapply.css";
import JoinApplyCard from "./JoinApplyCard";
import queryString from "query-string";

/** 나의 게시글 보기 */

const JoinMyApplyList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const path = window.location.pathname;
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page) || 1;

  const [posts, setPosts] = useState([]);
  const [limits] = useState(9);
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [totalCount, setTotalCount] = useState();

  const URL = joinmeurl + "/selectallbypage/myboardlist";
  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(URL, { params: { pageNo: currentPage } }, bearerToken)
        .then((res) => {
          console.log("게시글리스트 받기 ", res);
          setPosts(res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    fetchPost();
    navigate(`${path}?pageNo=${currentPage}`);
  }, [currentPage, navigate, path]);

  return (
    <MainContent>
      <header className="appinstructor_banner">
        <div className="appheader-bncontainer">
          <div className="appins-banner-cover">
            <h1 className="appbannername">MY PAGE</h1>
            <p> 나의 게시글 보기 </p>
          </div>
        </div>
      </header>
      <Content>
        <div className="myappuser-btn">
          <a onClick={() => navigate(-1)} className="myapp_btn_cancel">
            뒤로가기
          </a>
        </div>
        <ContentBody>
          <View>
            {posts &&
              posts.map((post, idx) => (
                <JoinApplyCard key={post.joinMeId} post={post} />
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

export default JoinMyApplyList;

const MainContent = styled.main`
  min-height: 800px;
  box-sizing: inherit;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: auto;
  padding: 0 5rem;
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
  grid-template-columns: repeat(3, 9fr);
  gap: 50px;
  display: grid;
  box-sizing: inherit;
`;
