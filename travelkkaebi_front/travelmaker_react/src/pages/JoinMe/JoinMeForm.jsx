import { Container } from "@mui/system";
import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DatePicker from "../../components/DatePick/DatePicker";
import { addDays } from "date-fns";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL, imgurl, joinmeurl } from "../../config";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate } from "react-router";
import { quill } from "quill";
import "./joinmeform.css";
import QuillEditor from "../../components/QuillEditor/QuillEditor";

// style
const JoinTitle = styled.div`
  max-height: 3rem;
  height: 3rem;
  margin-top: 4px;
  justify-content: center;
`;

export default function JoinMeForm() {
  const navigate = useNavigate();

  const [htmlContent, setHtmlContent] = useState("");
  const quillRef = useRef();

  // date
  const [selectDate, setSelectDate] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 1),
      key: "selection",
    },
  ]);
  const dateOnChange = (item) => setSelectDate([item.selection]);
  //////////////////////////// timestamp로 변환
  let start_Date = Date.parse(selectDate[0].startDate) / 1000;
  let end_Date = Date.parse(selectDate[0].endDate) / 1000;

  const [capacity, setCapacity] = useState("0");
  const [selectRegion, setSelectRegion] = useState("");

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
    return (
      <option value={selectcapacity} key={idx}>
        {selectcapacity}
      </option>
    );
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
    return (
      <option value={selectregion} key={selectregion}>
        {selectregion}
      </option>
    );
  });
  const handleRegion = (event) => {
    setSelectRegion(event.target.value);
  };

  // 게시글 추가하기
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.tartget);
    //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
    const description = quillRef.current.getEditor().getText();
    const formData = new FormData(e.target.value);
    console.log("formData: ", formData);
    const title = e.target.title.value;

    res({
      title: title,
      capacity: capacity,
      region: selectRegion,
      startDate: start_Date,
      endDate: end_Date,
      content: description,
      categoryId: 1,
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
        .post(joinmeurl + "/insert", joinmeDTO) //joinmeurl + "/insert", joinmeDTO
        .then((res) => {
          console.log("작성완료 후 결과 ", res);

          // const headerConfig = {
          //   Headers: {
          //     "content-type": "multipart/form-data",
          //     Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
          //   },
          // };

          // // 수정 전
          // axios
          //   .post(imgurl + "/insert", joinmeDTO, headerConfig)
          //   .then((resImg) => {
          //     console.log("resimg : ", resImg);
          //   });

          // alert("글 작성 완료");
          // navigate("/joinme/1");
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

  const backList = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="containors">
        <form className="ccform" onSubmit={handleSubmit}>
          <header className="ccheader">
            <h1>같이가요 글쓰기 수정해보자</h1>
          </header>

          <div>
            <label>🔸기간</label>
            <DatePicker
              selectDate={selectDate}
              setSelectDate={setSelectDate}
              dateOnChange={dateOnChange}
            />
          </div>

          <div>
            <div className="ccfield-prepend">
              <span className="ccform-addon">
                <i className="fa fa-info fa-2x"></i>
              </span>
              <input
                className="ccformfield"
                type="text"
                placeholder="제목을 입력해주세요"
                required
              />
            </div>

            <div
              className="ccfield-prepend"
              style={{ display: "flex", textAlign: "center" }}
            >
              <span className="ccform-addon">
                <i className="fa-solid fa-people-line fa-2x"></i>
              </span>
              <div className="select-charge">
                <h3>🔸 모집인원 : {capacity} 명 </h3>
                <select
                  className="selectbox"
                  id="capacity"
                  name="capacity"
                  onChange={handleCapacity}
                >
                  {options}
                </select>
              </div>
            </div>

            <div className="ccfield-prepend" style={{ display: "flex" }}>
              <span className="ccform-addon">
                <i className="fa-solid fa-people-line fa-2x"></i>
              </span>
              <div className="select-charge">
                <h3>🔸지역 : {selectRegion} </h3>
                <select
                  className="selectbox"
                  id="region"
                  name="region"
                  onChange={handleRegion}
                >
                  {regionOptions}
                </select>
              </div>
            </div>

            <div className="ccfield-prepend">
              <span className="ccform-addon">
                <i className="fa fa-comment fa-2x"></i>
              </span>
              <textarea
                className="ccformfield-content"
                name="comments"
                rows="8"
                placeholder="Message"
                required
              />
            </div>
            <div
              className="ccfield-prepend"
              style={{ display: "block", position: "relative" }}
            >
              <span
                className="ccform-addon-img"
                style={{ transform: "translate(0px, -330px)" }}
              >
                <i className="fa-regular fa-image fa-2x"></i>
              </span>
            </div>

            <QuillEditor
              quillRef={quillRef}
              htmlContent={htmlContent}
              setHtmlContent={setHtmlContent}
            />

            <div className="ccfield-prependbtn">
              <input className="ccbtn1" onClick={backList} value="목록으로" />
              <input className="ccbtn" type="submit" value="작성완료" />
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
