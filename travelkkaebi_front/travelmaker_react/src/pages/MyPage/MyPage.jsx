import { compose } from "@mui/system";
import React from "react";
import { Route, Router, Routes } from "react-router";
import styled from "styled-components";
import JoinApplyList from "./JoinApply/JoinApplyList";
import JoinApplyUserList from "./JoinApply/JoinApplyUserList";
import JoinMyApplyList from "./JoinApply/JoinMyApplyList";
import PickApplyList from "./PickApply/PickApplyList";
import PickApplyUserList from "./PickApply/PickApplyUserList";
import PickMyApplyList from "./PickApply/PickMyApplyList";
import SideNavigation from "./SideNavigation";

const Center = styled.div`
  height: 92vh;
  display: flex;
  flex-direction: row;
`;

export const MyPage = () => {
  return (
    <Center>
      <SideNavigation />
    </Center>
  );
};
