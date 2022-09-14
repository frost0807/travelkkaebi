import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./JoinMe.css";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { API_BASE_URL, joinmeurl } from "../../config";
import { useRecoilState } from "recoil";
import { isLoginModalState, isLoginState } from "../../recoil/atom";
import Login from "../../components/Login/Login";
import Logo from "../../images/basicLogo.png";
import JoinMeCard from "./JoinMeCard";
import Pagination from "../../components/Pagenation/Pagination";
import queryString from "query-string";
import { getToken, isLoginFc, is_logged } from "../../util";
import styled from "styled-components";

function JoinMe() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [limits] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();

  // search
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectKeyword, setSelectKeyword] = useState("");

  const searchHandler = (e) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  };

  const selectChange = (e) => {
    e.preventDefault();
    setSelectKeyword(e.target.value);
  };

  console.log("지금 셀렉트 value ", selectKeyword);
  const onSearch = (e) => {
    if (
      searchKeyword === null ||
      searchKeyword === "" ||
      selectKeyword === "선택하기🎇"
    ) {
      return () => {
        const fetchPost = async () => {
          setCurrentPage();
          const fetchAxios = await axios
            .get(selectAllUrl + "?pageNo=" + currentPage) //,{params:{pageNo:currentPage}}
            .then((res) => {
              console.log(res.data);
              setPosts(res.data.list);
              console.log("list : ", res.data.list);
              setTotalCount(res.data.totalBoardCount);
              console.log("totalBoardCount", res.data.totalBoardCount);
            });
        };
      };
    } else if (selectKeyword === "제목") {
      searchTitle();
    } else if (selectKeyword === "닉네임") {
      searchName();
    } else {
      alert("무슨 오류일까~?");
      return;
    }
  };

  const searchTitle = async () => {
    await axios
      .get(selectAllUrl + "/searchbytitle", {
        params: { pageNo: currentPage, searchword: searchKeyword },
      })
      .then((res) => {
        if (searchKeyword == null) {
          return res;
        }
        console.log(res);
        setPosts(res.data.list);
        setTotalCount(res.data.totalBoardCount);
        console.log("totalBoardCount", res.data.totalBoardCount);
      });
  };

  const searchName = async () => {
    await axios
      .get(selectAllUrl + "/searchbynickname", {
        params: { pageNo: currentPage, searchword: searchKeyword },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data.list);
        setTotalCount(res.data.totalBoardCount);
        console.log("totalBoardCount", res.data.totalBoardCount);
      });
  };

  //    setSearchKeyword("");
  let selectAllUrl = joinmeurl + "/selectallbypage";
  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(selectAllUrl + "?pageNo=" + currentPage) //,{params:{pageNo:currentPage}}
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.list);
          console.log("list : ", res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    return () => fetchPost();
  }, [currentPage]);

  // modal
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);
  const loginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <MainContent>
      <header className="instructor_banner">
        <div className="header-bncontainer">
          <div className="ins-banner-cover">
            <h1 className="bannername"> 같이 가요 !</h1>
            <p> 꿈같은 여행에 같이 떠날 친구들을 만나보세요.</p>
            <br />
            <p>더 행복한 여행이 될 거예요 !</p>
          </div>
        </div>
      </header>
      <Content>
        <ContentBody>
          <Button
            onClick={() => {
              if (!is_logged) {
                loginModal();
              } else if (is_logged) {
                navigate("/joinmeform");
              }
            }}
          >
            글쓰기
          </Button>
          {isLoginModalOpen && <Login />}

          <div>
            <select id="searchKey" name="searchKey" onChange={selectChange}>
              <option value="선택하기🎇">--</option>
              <option value="제목">제목</option>
              <option value="닉네임">닉네임</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              name="SearchKeyword"
              value={searchKeyword || ""}
              onChange={searchHandler}
            />
            <button onClick={onSearch}>검색</button>
          </div>

          <View>
            {posts &&
              posts.map((post) => (
                <JoinMeCard
                  key={post.joinMeId}
                  post={post}
                  isLoginState={isLoginState}
                />
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
}

export default JoinMe;

const MainContent = styled.main`
  min-height: 800px;
  box-sizing: inherit;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Content = styled.div`
  max-width: 1250px;
  margin: auto;
  padding: 0 1.5rem;
  flex-grow: 1;
  position: relative;
  width: auto;
  display: block;
  box-sizing: inherit;
  color: #000a12;
`;
const ContentBody = styled.div`
  width: 100%;
  margin-top: 2rem;
  box-sizing: inherit;
`;
const View = styled.div`
  width: 100%;
  grid-template-columns: repeat(4, 1fr);
  margin-top: 28px;
  gap: 18px;
  display: grid;
  box-sizing: inherit;
`;
