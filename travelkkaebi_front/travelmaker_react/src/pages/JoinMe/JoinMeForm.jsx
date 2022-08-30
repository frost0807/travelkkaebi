import { Container } from "@mui/system";
import React, { useMemo, useRef, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { API_BASE_URL } from "../../config";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Button } from "@mui/material";
import { useNavigate } from "react-router";

function JoinMeForm() {
  const navigate = useNavigate();
  const quillRef = useRef(null);

  // imgUrl
  function imageUrlHandler() {
    const range = this.quill.getSelection();
    const url = prompt("please copy paste the image url here");

    if (url) {
      // 커서위치 imgUrl 삽입
      this.quill.insertEmbed(range.index, "image", url);
    }
  }

  // 이미지 업로드 핸들러, modules 설정보다 위에 있어야 정상 적용
  const imageHandler = () => {
    //input file tag 생성
    const inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("accept", "image/*");
    inputFile.click();

    // input change
    inputFile.onchange = (e) => {
      const files = e.target.files;
      const formData = new FormData();
      formData.append("files", files[0]);

      // img file 서버 저장
      const tempFile = axios.post(API_BASE_URL, formData).then((res) => {
        const fileSrno = res.fileSrno;
        const range = this.quill.getSelection();

        this.quill.insertEmbed(range.index, "image", API_BASE_URL + fileSrno);
      });
    };
  };

  // useMemo를 사용하지 않고 handler를 등록할 경우 타이핑 할때마다 focus가 벗어남 (imageHandler)
  const modules = useMemo(
    () => ({
      toolbar: {
        // container에 등록되는 순서대로 tool 배치
        container: [
          [{ font: [] }], // font 설정
          [{ header: [1, 2, 3, 4, 5, 6, false] }], // header 설정
          [
            "bold",
            "italic",
            "underline",
            "strike",
            "blockquote",
            "code-block",
            "formula",
          ], // 굵기, 기울기, 밑줄 등 부가 tool 설정
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
          ], // 리스트, 인덴트 설정
          ["link", "image", "video"], // 링크, 이미지, 비디오 업로드 설정
          [{ align: [] }, { color: [] }, { background: [] }], // 정렬, 글씨 색깔, 글씨 배경색 설정
          ["clean"], // toolbar 설정 초기화 설정
        ],
        // custom 핸들러 설정
        handlers: {
          imageUrl: imageUrlHandler, // 이미지 url핸들러
          image: imageHandler, // 이미지 tool 사용에 대한 핸들러 설정
        },
      },
    }),
    []
  );

  // toolbar에 사용되는 tool format
  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "code-block",
    "formula",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
    "align",
    "color",
    "background",
  ];

  const [value, setValue] = useState();
  const [selectDates, setSelectDates] = useState([null, null]);
  console.log(selectDates, setSelectDates);

  const joinFormSubmit = () => {
    console.log("value : ", selectDates);
  };

  return (
    <Container>
      <div className="join-form-container">
        <label>제목🔸</label>
        <JoinTitle>
          <input required />
        </JoinTitle>

        <div>
          <label>기간🔸</label>
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            localeText={{ start: "출발일", end: "귀가일" }}
          >
            <DateRangePicker
              value={selectDates}
              onChange={(newValue) => {
                setSelectDates(newValue);
              }}
              renderInput={(startProps, endProps) => (
                <React.Fragment>
                  <TextField style={{ height: "3rem" }} {...startProps} />
                  <Box sx={{ mx: 3, height: "3rem" }}> to </Box>
                  <TextField style={{ height: "3rem" }} {...endProps} />
                </React.Fragment>
              )}
            />
          </LocalizationProvider>
        </div>

        <CustomReactQuill
          ref={quillRef}
          theme="snow"
          modules={modules}
          formats={formats}
          value={value || ""}
          placeholder="내용을 입력하세요."
          onChange={setValue}
        />

        <div className="join-btn">
          <Button onClick={() => navigate(-1)}>목록으로</Button>
          <Button onClick={joinFormSubmit}>작성완료</Button>
        </div>
      </div>
    </Container>
  );
}

export default JoinMeForm;

// style
const CustomReactQuill = styled(ReactQuill)`
  max-height: 30rem;
  height: 30rem;
  max-width: 52rem;
`;
const JoinTitle = styled.div`
  max-height: 3rem;
  height: 3rem;
  margin-top: 4px;
  justify-content: center;
`;
