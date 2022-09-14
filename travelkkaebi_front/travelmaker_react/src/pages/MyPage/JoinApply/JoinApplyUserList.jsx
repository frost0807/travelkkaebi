import * as React from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import axios from "axios";
import { joinapply } from "../../../config";
import { useState } from "react";
import { bearerToken } from "../../../util";
import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router";
import styled from "styled-components";
import { DataGrid } from "@mui/x-data-grid";
import UserList from "./UserList";
import Pagination from "../../../components/Pagenation/Pagination";
import SideNavigation from "../SideNavigation";

/** 나의 글에 신청한 user list  mui 시발
 * /mypage/myapply/list/appliction
 */

// 내가 쓴 글에 신청한 목록 받기 (상세보기)

function JoinApplyUserList(props) {
  const navigate = useNavigate();

  const [appList, setAppList] = useState([]);
  const [limits] = useState(9);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState();
  const [joinMeApplyId] = useState();

  const { state } = useLocation();
  let joinMeId = state.joinMeId;

  // 신청자 목록 가져오기
  const appURL = joinapply + "/selectall/byjoinmeid";
  useEffect(() => {
    const fetchApi = async () => {
      const resApi = await axios
        .get(
          appURL + "?pageNo=" + currentPage + "&joinMeId=" + joinMeId,
          bearerToken
        )
        .then((res) => {
          console.log("신청List get ", res);
          setAppList(res.data.list);
          setTotalCount(res.data.totalBoardCount);
        });
    };
    return () => fetchApi();
  }, []);

  return (
    <MainContent>
      <Content>
        <header className="appinstructor_banner">
          <div className="appheader-bncontainer">
            <div className="appins-banner-cover">
              <h1 className="appbannername">MY PAGE</h1>
              <p> 채택하기 </p>
            </div>
          </div>
        </header>
        <SideNavigation />
        <div className="myappuser-btn">
          <a href="/mypage/myapply/list" className="myapp_btn_cancel">
            뒤로가기
          </a>
        </div>
        <div style={{ width: "1200px" }}>
          {appList.length > 0 &&
            appList.map((data) => {
              return <UserList key={data.joinMeApplyId} data={data} />;
            })}
          {appList.length === 0 && (
            <div style={{ height: "200px", marginTop: "100px" }}>
              <p style={{ fontSize: "2rem", textAlign: "center" }}>
                해당 게시글에 신청한 친구가 없습니다.. 🥲{" "}
              </p>
            </div>
          )}
        </div>
        <footer>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            limits={limits}
            totalCount={totalCount}
          />
        </footer>
      </Content>
    </MainContent>
  );
}

export default JoinApplyUserList;

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

const ProfileImg = styled.img`
  width: 50px,
  height: 50px,
  border-raduis: 50%
`;
