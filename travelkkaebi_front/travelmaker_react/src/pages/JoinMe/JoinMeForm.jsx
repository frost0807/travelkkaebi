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

  // image url
  const [reqImageUrl, setReqImageUrl] = useState([]);

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

  console.log("부모컴포넌트의 url : ", reqImageUrl);
  // 게시글 추가하기
  const handleSubmit = (e) => {
    e.preventDefault();

    //태그를 제외한 순수 text만을 받아온다. 검색기능을 구현하지 않을 거라면 굳이 text만 따로 저장할 필요는 없다.
    const description = quillRef.current.getEditor().getText();
    const title = e.target.title.value;
    console.log("?? ", capacity);

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
    if (joinmeDTO.content.trim() === "") {
      alert("내용을 입력해주세요.");
      return;
    } else {
      //새로운 게시글 생성s
      // http://localhost:8080/travelkkaebi/pickme/write
      // const sendDTO = new FormData();
      // sendDTO.append("joinMeDTO", JSON.stringify(joinmeDTO));
      axios.defaults.headers = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      axios
        .post(joinmeurl + "/insert", joinmeDTO) //joinmeurl + "/insert", joinmeDTO
        .then((res) => {
          console.log("작성완료 후 결과 ", res);
          console.log("imageUrl:", reqImageUrl);

          const joinMeId = res.data.joinMeId;
          const imageDTO = [];
          for (let i = 0; i < reqImageUrl.length; i++) {
            imageDTO.push({
              categoryId: 1,
              boardId: joinMeId,
              imageUrl: reqImageUrl[i],
            });
          }
          console.log("글쓰기 후 id ", joinMeId);
          console.log("imageDTO", imageDTO);
          axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
          };
          axios.post(imgurl + "/insert", imageDTO).then((resImg) => {
            console.log("resimg : ", resImg);
          });

          alert("글 작성 완료");
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

  const backList = () => {
    navigate(-1);
  };

  return (
    <>
      <div style={{ color: "black" }} className="containors">
        <form className="ccform" onSubmit={handleSubmit}>
          <header className="ccheader">
            <div className="select-capacity">
              <h3>🔸 모집인원</h3>
              <select
                className="selectbox"
                id="capacity"
                name="capacity"
                onChange={handleCapacity}
              >
                {options}
              </select>
              <h3> 명 </h3>
            </div>

            <div className="select-region">
              <h3>🔸지역 </h3>
              <select
                className="selectbox"
                id="region"
                name="region"
                onChange={handleRegion}
              >
                {regionOptions}
              </select>
            </div>
          </header>

          <div className="ccfield-prepend">
            <input
              className="ccformfield"
              type="text"
              placeholder="제목을 입력해주세요"
              required
              it="title"
              name="title"
            />
          </div>
          <div>
            <div
              className="ccfield-prepend"
              style={{ display: "block", position: "relative" }}
            ></div>
            <div>
              <QuillEditor
                quillRef={quillRef}
                htmlContent={htmlContent}
                setHtmlContent={setHtmlContent}
                reqImageUrl={reqImageUrl}
                setReqImageUrl={setReqImageUrl}
              />
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "41px",
              }}
            >
              <div>
                <div className="ccfield-prependbtn">
                  <input
                    className="ccbtn1"
                    onClick={backList}
                    value="목록으로"
                  />
                </div>
              </div>
              <DatePicker
                selectDate={selectDate}
                setSelectDate={setSelectDate}
                dateOnChange={dateOnChange}
              />
              <div>
                <div className="ccfield-prependbtn">
                  <input className="ccbtn" type="submit" value="작성완료" />
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}
