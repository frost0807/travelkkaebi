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
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [limits] = useState(20);
  const [currentPage, setCurrentPage] = useState(0); //query.page ||
  const [totalCount, setTotalCount] = useState();

  // search
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectKeyword, setSelectKeyword] = useState("");
  const [buttonKeyword, setButtonKeyword] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get(pickurl + "/list?page=" + currentPage) //,{params:{pageNo:currentPage}}
        .then((res) => {
          console.log(res.data);
          console.log(res.data.list);
          setPosts(res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    return () => fetchPost();
  }, [currentPage]);

  // 이슈 service, DTO의 변수 이름이 mapper랑 다름
  // onChange 렌더링 한글자 때문에 리스트 오는 갯수랑 totalcount 갯수가 다름
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
      selectKeyword === "선택하기🎇"
    ) {
      return () => {
        const fetchPost = async () => {
          setCurrentPage();
          const fetchAxios = await axios
            .get(pickurl + "/list?page=" + currentPage) //,{params:{pageNo:currentPage}}
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
  };

  // Keyword
  function handleKeywordButton(e) {
    let typepost = e.target.value;
    typepost !== "전체"
      ? axios
          .get(
            pickurl +
              "/search/keyword?page=" +
              currentPage +
              "&keyword=" +
              typepost
          )
          .then((res) => {
            console.log("키워드 이벤트 ", res);
            console.log("이건 뭔데 ", res.data.list);
            setPosts(res.data.list);
          })
      : axios
          .get(pickurl + "/list?page=" + currentPage) //,{params:{pageNo:currentPage}}
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
            <h1 className="bannername"> 데려가요 !</h1>
            <p> 친구와 같은 추억을 쌓을 수 있는 시간.</p>
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
                navigate("/pickmeform");
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
