import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SidebarItem from "./SidebarItem";

const Side = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
  background: #fff;
`;
const Profile = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 100%;
`;
const Menu = styled.div`
  margin-top: 80px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;

function SideNavigation() {
  const profile_img = localStorage.getItem("profileImageUrl");
  const menus = [
    {
      name: "MY JOIN ME",
      path: "/joinme/selectallbypage/myboardlist",
    },
    {
      name: "JOIN ME APPLY",
      path: "/joinme/selectallbypage/myappliedboardlist",
    },
    { name: "MY PICK ME", path: "/pickme/mylist" },
    { name: "PICK ME APPLY", path: "/pickme/my/applylist" },
    { name: "설정", path: "/setting" },
  ];

  return (
    <Side>
      <Profile src={profile_img} style={{ marginTop: "-20px" }}></Profile>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={{
                color: "gray",
                textDecoration: "none",
                padding: "24px",
                fontSize: "1.2rem",
                marginTop: "30px",
              }}
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
