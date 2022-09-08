// import React, { useEffect, useState, useCallback } from "react";
// import axios from "axios";
// import "./JoinMe.css";
// import { Button } from "@mui/material";
// import { useLocation, useNavigate, useParams } from "react-router";
// import { API_BASE_URL, joinmeurl } from "../../config";
// import { useRecoilState } from "recoil";
// import { isLoginModalState, isLoginState } from "../../recoil/atom";
// import Login from "../../components/Login/Login";
// import Logo from "../../images/basicLogo.png";
// import JoinMeCard from "./JoinMeCard";
// import Pagination from "../../components/Pagenation/Pagination";
// import queryString from "query-string";
// import { getToken, isLoginFc, is_logged } from "../../util";
// import styled from "styled-components";

function JoinMe() {
  const navigate = useNavigate();

  const { pageNo } = useParams();

  const [posts, setPosts] = useState([]);
  const [limits] = useState(20);
  const [currentPage, setCurrentPage] = useState(1); //query.page ||
  const [totalCount, setTotalCount] = useState();

  // search
  const [searchKeyword, setSearchKeyword] = useState();

  // 이슈 service, DTO의 변수 이름이 mapper랑 다름
  // onChange 렌더링 한글자 때문에 리스트 오는 갯수랑 totalcount 갯수가 다름
  const searchHandler = (e) => {
    setSearchKeyword(e.target.value);
    console.log("onChange", searchKeyword);
    let searchword = searchKeyword;
    console.log("searchword", searchword);
    const changeAPI =
      // url 주소를 나중에 상태로 왔다리 갔다리
      axios
        .get(selectAllUrl + "/searchbytitle", {
          params: { pageNo: pageNo, searchword: searchword },
        })
        .then((res) => {
          console.log(res);
          setPosts(res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
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
  };

  let selectAllUrl = joinmeurl + "/selectallbypage";

  useEffect(() => {
    const fetchPost = async () => {
      setCurrentPage();
      const fetchAxios = await axios
        .get(selectAllUrl + "?pageNo=" + pageNo) //,{params:{pageNo:currentPage}}
        .then((res) => {
          console.log(res.data);
          setPosts(res.data.list);
          console.log("list : ", res.data.list);
          setTotalCount(res.data.totalBoardCount);
          console.log("totalBoardCount", res.data.totalBoardCount);
        });
    };
    return () => fetchPost();
  }, [pageNo]);

  //pagenation
  const pageNate = (pageNum) => pageNo(pageNum);

  // modal
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);
  const loginModal = () => {
    setIsLoginModalOpen(true);
  };
