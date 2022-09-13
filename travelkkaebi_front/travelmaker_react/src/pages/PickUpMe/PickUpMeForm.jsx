import { Container } from "@mui/system";
import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import DatePicker from "../../components/DatePick/DatePicker";
import { addDays } from "date-fns";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL, imgurl, joinmeurl, pickurl } from "../../config";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Navigate, useNavigate } from "react-router";
import { quill } from "quill";
import "./pickupmeform.css";
import QuillEditor from "../../components/QuillEditor/QuillEditor";

// style
const JoinTitle = styled.div`
  max-height: 3rem;
  height: 3rem;
  margin-top: 4px;
  justify-content: center;
`;

function PickUpMeForm() {
  const navigate = useNavigate();

  const [htmlContent, setHtmlContent] = useState("");
  const quillRef = useRef();

  // image url
  const [reqImageUrl, setReqImageUrl] = useState();

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
  let start_Date = Date.parse(selectDate[0].startDate);
  let end_Date = Date.parse(selectDate[0].endDate);

  // 지역 설정
  const [selectRegion, setSelectRegion] = useState("");
  const regionKey = [
    "강원",
    "경기",
    "제주",
    "서울",
    "인천",
    "충남",
    "충북",
    "전북",
    "전남",
    "경북",
    "경남",
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

    //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
    const description = quillRef.current.getEditor().getText();
    const title = e.target.title.value;

    res({
      title: title,
      preferredRegion: selectRegion,
      dateInfo: { startDate: start_Date, endDate: end_Date },
      content: description,
      categoryId: 2,
    });
  };

  // joinme mapper에 start/end date 추가
  // http 200 성공 -> DB 생성 X title null
  const res = async (pickmeDTO) => {
    console.log("글 입력하기 전 data : ", pickmeDTO);
    if (pickmeDTO.content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    } else {
      //새로운 게시글 생성s
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      axios
        .post(pickurl + "/write", pickmeDTO) //joinmeurl + "/insert", joinmeDTO
        .then((res) => {
          console.log("작성완료 후 결과 ", res);
          alert("글 작성 완료");
          navigate("/pickme/0");
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
                it="title"
                name="title"
              />
            </div>

            <div
              className="ccfield-prepend"
              style={{ display: "flex", textAlign: "center" }}
            >
              <span className="ccform-addon">
                <i className="fa-solid fa-people-line fa-2x"></i>
              </span>
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
              reqImageUrl={reqImageUrl}
              setReqImageUrl={setReqImageUrl}
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

export default PickUpMeForm;
