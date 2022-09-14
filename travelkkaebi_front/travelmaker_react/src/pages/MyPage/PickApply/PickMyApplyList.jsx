import { Button } from "antd";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Pagination from "../../../components/Pagenation/Pagination";
import { joinmeurl, pickmeapply } from "../../../config";
import { bearerToken } from "../../../util";
import "../JoinApply/joinapply.css";
import PickApplyCard from "./PickApplyCard";
import JoinApplyCard from "./PickApplyCard";

/** 나의 게시글 보기 */

const PickMyApplyList = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [limits] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();

  const URL = pickmeapply + "/my/takemelist";
  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(URL + "?pageNo=", bearerToken)
        .then((res) => {
          console.log("게시글리스트 받기 ", res);
          setPosts(res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    return () => fetchPost();
  }, [currentPage]);

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
        <ContentBody>
          <View>
            {posts &&
              posts.map((post, idx) => (
                <PickApplyCard key={post.boardId} post={post} />
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

export default PickMyApplyList;

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
