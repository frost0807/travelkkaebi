import { Checkbox } from "@mui/material";
import axios from "axios";
import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { joinapply, pickmeapply } from "../../../config";
import { bearerToken } from "../../../util";
import "../JoinApply/joinapply.css";

/** 나의 게시글 보기에서 게시글의 신청한  리스트/채택 */

function PickUserList({ data, currentPage }) {
  //  const [checkedList, setCheckedList] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();

    const pickMeApplyId = e.target.pickmeapplyid.value;
    console.log("pickMeApplyId? ? ", pickMeApplyId);

    res(pickMeApplyId);
  };

  const res = async (pickMeApplyId) => {
    console.log("? 이건 뭔 데이터인데 ", pickMeApplyId);
    const api = (axios.defaults.headers = {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
    });
    await axios
      .put(pickmeapply + "/selected", {
        params: { page: currentPage, pickMeApplyId: pickMeApplyId },
      })
      .then((res) => {
        console.log("채택버튼 이벤트 ", res);
        if (res.data === true) {
          console.log("채택버튼 이벤트 ", res);
          alert("채택 완료되었습니다.");
          window.location.reload();
        } else {
          alert("채택할 수 없습니다.");
        }
      });
  };

  return (
    <form onSubmit={onSubmit} className="user-list">
      <div className="user-info containerd" key={data.pickMeApplyId}>
        <input
          hidden
          id="pickmeapplyid"
          name="pickmeapplyid"
          readOnly
          value={data.pickMeApplyId}
        />
        <Avatar src={data.profileImageUrl} />
        <div className="user-info-name containerd">{data.nickname}</div>
      </div>

      <div
        className="comment-txt containerd"
        style={{ marginTop: "-20px", width: "500px" }}
      >
        <p>{data.content}</p>
        <div className="comment-time">{data.createTime}</div>
      </div>
      <div style={{ justifyContent: "flex-end" }}>
        {!data.selected ? (
          <input
            id="myappuser_btn-submit"
            className="myappuser_btn-submit"
            value="채택하기"
            type="submit"
          />
        ) : (
          <input
            id="myappuser_btn-submitsuc"
            className="myappuser_btn-submitsuc"
            value="채택완료"
            disabled
          />
        )}
      </div>
    </form>
  );
}

export default PickUserList;

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
`;
