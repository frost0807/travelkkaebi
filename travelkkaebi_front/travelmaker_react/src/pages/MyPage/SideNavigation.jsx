import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`;
const Profile = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;
const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

function SideNavigation() {
  const profile_img = localStorage.getItem("profileImageUrl");
  const menus = [
    { name: "내가 쓴 JoinMe 게시글", path: "/mypage/apply/list" },
    { name: "나의 Join Me신청 리스트", path: "/mypage/myapply/list" },
    { name: "내가 쓴 PickMe 게시글", path: "/mypage/pickmeapply/list" },
    { name: "나의 Pick Me신청 리스트", path: "/mypage/pickmemyapply/list" },
    { name: "설정", path: "/setting" },
  ];
  return (
    <Side>
      <Profile src={profile_img}></Profile>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{ color: "gray", textDecoration: "none" }}
              to={menu.path}
              key={index}
              activeStyle={{ color: "black" }}
            >
              <SidebarItem menu={menu} />
            </NavLink>
          );
        })}
      </Menu>
    </Side>
  );
}

export default SideNavigation;
