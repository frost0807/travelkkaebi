import { Container } from "@mui/system";
import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DatePicker from "../../components/DatePick/DatePicker";
import { addDays } from "date-fns";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL, joinmeurl } from "../../config";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { quill } from "quill";
import QuillEditor from "../../components/QuillEditor/QuillEditor";
import { bearerToken, headerConfig, headerImg_tk } from "../../util";
import { useEffect } from "react";

function JoinMeEditForm(props) {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log("내가 받아온 조인아이디 : ", state.joinMeId);
  console.log("내다 받아온 post ?! : ", state);

  const [htmlContent, setHtmlContent] = useState(state.content);
  const quillRef = useRef();

  // date
  const [selectDate, setSelectDate] = useState([
    {
      startDate: new Date(state.startDate),
      endDate: addDays(new Date(state.endDate), 1),
      key: "selection",
    },
  ]);
  const dateOnChange = (item) => setSelectDate([item.selection]);
  //////////////////////////// timestamp로 변환
  let start_Date = Date.parse(selectDate[0].startDate) / 1000;
  let end_Date = Date.parse(selectDate[0].endDate) / 1000;

  const [capacity, setCapacity] = useState(state.capacity);
  const [selectRegion, setSelectRegion] = useState(state.region);

  const capacityCount = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
  ];
  const options = capacityCount.map((selectcapacity, idx) => {
    return <option value={selectcapacity}>{selectcapacity}</option>;
  });
  const handleCapacity = (event) => {
    setCapacity(event.target.value);
  };

  const regionKey = [
    "강원",
    "경기",
    "인천",
    "서울",
    "충북",
    "충남",
    "전남",
    "전북",
    "제주",
    "괌",
    "하와이",
  ];
  const regionOptions = regionKey.map((selectregion) => {
    return <option value={selectregion}>{selectregion}</option>;
  });
  const handleRegion = (event) => {
    setSelectRegion(event.target.value);
  };

  // // 게시글 추가하기
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(e.tartget);
    //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
    const description = quillRef.current.getEditor().getText();

    const formData = new FormData(e.target);
    console.log("formData: ", formData);
    const title = e.target.title.value;
    console.log("바뀐 제목 ? ", title);

    res({
      title: title,
      capacity: capacity,
      region: selectRegion,
      startDate: start_Date,
      endDate: end_Date,
      content: description,
      joinMeId: state.joinMeId,
    });
  };
  // joinme mapper에 start/end date 추가
  // http 200 성공 -> DB 생성 X title null
  const res = async (joinmeDTO) => {
    console.log(joinmeDTO.title, joinmeDTO.content);
    console.log(htmlContent);
    if (joinmeDTO.content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    } else {
      //새로운 게시글 생성s
      // http://localhost:8080/travelkkaebi/pickme/write
      axios.defaults.headers = {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      await axios
        .put(joinmeurl + "/update", joinmeDTO) //joinmeurl + "/insert", joinmeDTO
        .then((res) => {
          console.log("업데이트 결관", res);
          alert("수정 완료");
          navigate("/joinme/1");
        })
        .catch((error) => {
          if (error.res) {
            console.log(error.res);
            console.log("server responded");
            alert("server 에러");
          } else if (error.request) {
            console.log("network error");
            alert("axios 에러");
          } else {
            console.log(error);
          }
        });
    }
  };

  return (
    <Container>
      <form className="join-form-container" onSubmit={handleSubmit}>
        <label>🔸제목</label>
        <JoinTitle>
          <input id="title" name="title" required defaultValue={state.title} />
        </JoinTitle>

        <div style={{ display: "flex" }}>
          <div className="select-charge">
            <h3>🔸모집인원 : {capacity} 명</h3>
            <select id="capacity" name="capacity" onChange={handleCapacity}>
              {options}
            </select>
          </div>
          <div className="select-charge">
            <h3>🔸지역 : {selectRegion}</h3>
            <select id="region" name="region" onChange={handleRegion}>
              {regionOptions}
            </select>
          </div>
        </div>
        <div>
          <label>🔸기간</label>
          <DatePicker
            selectDate={selectDate}
            setSelectDate={setSelectDate}
            dateOnChange={dateOnChange}
          />
        </div>
        <div>
          <QuillEditor
            quillRef={quillRef}
            htmlContent={htmlContent}
            setHtmlContent={setHtmlContent}
          />
        </div>
        <div className="join-btn">
          <Button onClick={() => navigate(-1)}>취소하기</Button>
          <Button type="submit">수정완료</Button>
        </div>
      </form>
    </Container>
  );
}

export default JoinMeEditForm;

// style
const JoinTitle = styled.div`
  max-height: 3rem;
  height: 3rem;
  margin-top: 4px;
  justify-content: center;
`;
