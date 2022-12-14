import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import "./PickUpMe.css";
import { Button } from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { API_BASE_URL, joinmeurl, pickurl } from "../../config";
import { useRecoilState } from "recoil";
import { isLoginModalState, isLoginState } from "../../recoil/atom";
import Login from "../../components/Login/Login";
import Logo from "../../images/basicLogo.png";
import PickUpMeCard from "./PickUpMeCard";
import Pagination from "../../components/Pagenation/Pagination";
import queryString from "query-string";
import { buttons, getToken, isLoginFc, is_logged } from "../../util";
import styled from "styled-components";
import { CheckBox } from "@mui/icons-material";
import { Checkbox } from "antd";

function PickUpMe() {
  const location = useLocation();
  const path = window.location.pathname;
  const initialQueryString = queryString.parse(location.search);
  const initialPageNumber = Number(initialQueryString.page) || 1;
  const navigate = useNavigate();

  const { page } = useParams();
  const [posts, setPosts] = useState([]);
  const [limits] = useState(20);
  const [currentPage, setCurrentPage] = useState(initialPageNumber);
  const [totalCount, setTotalCount] = useState();

  // search
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectKeyword, setSelectKeyword] = useState("");
  const [buttonKeyword, setButtonKeyword] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(pickurl + "/list", { params: { page: currentPage } })
        .then((res) => {
          console.log(res.data);
          console.log(res.data.list);
          setPosts(res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    fetchPost();
    navigate(`${path}?page=${currentPage}`);
  }, [currentPage, navigate, path]);

  // ?????? service, DTO??? ?????? ????????? mapper??? ??????
  // onChange ????????? ????????? ????????? ????????? ?????? ????????? totalcount ????????? ??????
  const searchHandler = (e) => {
    e.preventDefault();
    setSearchKeyword(e.target.value);
  };

  const selectChange = (e) => {
    e.preventDefault();
    setSelectKeyword(e.target.value);
  };

  const onSearch = (e) => {
    if (
      searchKeyword === null ||
      searchKeyword === "" ||
      selectKeyword === "????????????????"
    ) {
      return () => {
        const fetchPost = async () => {
          setCurrentPage();
          const fetchAxios = await axios
            .get(pickurl + "/list", { params: { page: currentPage } }) //,{params:{pageNo:currentPage}}
            .then((res) => {
              console.log(res.data);
              setPosts(res.data.list);
              console.log("list : ", res.data.list);
              setTotalCount(res.data.totalBoardCount);
              console.log("totalBoardCount", res.data.totalBoardCount);
              navigate(`${path}?page=${currentPage}`);
            });
        };
      };
    } else if (selectKeyword === "??????") {
      searchTitle();
    } else if (selectKeyword === "?????????") {
      searchName();
    } else {
      alert("?????? ????????????~?");
      return;
    }
  };

  const searchTitle = () => {
    axios
      .get(pickurl + "/search/title", {
        params: { pageNo: currentPage, title: searchKeyword },
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

    navigate(`${path}?page=${currentPage}&title=${searchKeyword}`);
  };

  const searchName = () => {
    axios
      .get(pickurl + "/search/nickname", {
        params: { pageNo: currentPage, nickname: searchKeyword },
      })
      .then((res) => {
        console.log(res);
        setPosts(res.data.list);
        setTotalCount(res.data.totalBoardCount);
        console.log("totalBoardCount", res.data.totalBoardCount);
      });

    navigate(`${path}?page=${currentPage}&nickname=${searchKeyword}`);
  };

  // Keyword
  function handleKeywordButton(e) {
    let typepost = e.target.value;
    typepost !== "??????"
      ? axios
          .get(pickurl + "/search/keyword", {
            params: {
              page: currentPage,
              keyword: typepost,
            },
          })
          .then((res) => {
            console.log("????????? ????????? ", res);
            console.log("?????? ?????? ", res.data.list);
            setPosts(res.data.list);
            navigate(`${path}?page=${currentPage}&keyword=${typepost}`);
          })
      : axios
          .get(pickurl + "/list", { params: { page: currentPage } })
          .then((res) => {
            console.log(res.data);
            console.log(res.data.list);
            setPosts(res.data.list);
            setTotalCount(res.data.totalBoardCount);
            console.log("totalBoardCount", res.data.totalBoardCount);
          });
  }

  const keyButton = buttons.map((keyValue, idx) => {
    return (
      <button key={idx} value={keyValue.value} onClick={handleKeywordButton}>
        {keyValue.name}
      </button>
    );
  });

  // modal
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);
  const loginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <MainContent>
      <header className="instructor_banner_pick">
        <div className="header-bncontainer">
          <div className="pick-banner-cover">
            <h1 className="bannername"> ???????????? !</h1>
            <p> ????????? ?????? ????????? ?????? ??? ?????? ??????.</p>
            <br />
            <p>??? ????????? ????????? ??? ????????? !</p>
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
                navigate("/pickmeform");
              }
            }}
          >
            ?????????
          </Button>
          {isLoginModalOpen && <Login />}
          <div>
            <select id="searchKey" name="searchKey" onChange={selectChange}>
              <option value="????????????????">--</option>
              <option value="??????">??????</option>
              <option value="?????????">?????????</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              name="SearchKeyword"
              value={searchKeyword || ""}
              onChange={searchHandler}
            />
            <button onClick={onSearch}>??????</button>
          </div>
          <div className="keywordButton">{keyButton}</div>

          <View>
            {posts &&
              posts.map((post) => (
                <PickUpMeCard
                  key={post.boardId}
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

export default PickUpMe;

const MainContent = styled.main`
  min-height: 900px;
  box-sizing: inherit;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Content = styled.div`
  max-width: 1200px;
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
