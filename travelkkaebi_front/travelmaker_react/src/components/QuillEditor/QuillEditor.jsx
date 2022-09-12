import axios from "axios";
import React, { useMemo, useCallback, memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css"; // react-quill과 css파일 import 하기
import styled from "styled-components";
import { API_BASE_URL, imgurl } from "../../config";
import { headerConfig, headerImg_tk } from "../../util";
import ImageUploader from "quill-image-uploader";

Quill.register("modules/imageUploader", ImageUploader);

const QuillEditor = ({
  quillRef,
  htmlContent,
  setHtmlContent,
  reqImageUrl,
  setReqImageUrl,
}) => {
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
  const ImageUploader = () => {
    //input file tag 생성
    const inputFile = document.createElement("input");
    inputFile.setAttribute("type", "file");
    inputFile.setAttribute("accept", "image/*");
    inputFile.click();

    // input change
    inputFile.onchange = (e) => {
      const files = e.target.files;
      const formData = new FormData();
      formData.append("file", files[0]);

      // img file 서버 저장
      const tempFile = axios
        .post(imgurl + "/temporaryinsert", formData, headerConfig)
        .then((res) => {
          console.log("이미지 핸들러 : ", res);

          const url = res.data[0];
          setReqImageUrl((prev) => [...prev, url]);
          const quill = quillRef.current.getEditor();
          /* ReactQuill 노드에 대한 Ref가 있어야 메서드들을 호출할 수 있으므로
          useRef()로 ReactQuill에 ref를 걸어주자.
          getEditor() : 편집기를 지원하는 Quill 인스턴스를 반환함
          여기서 만든 인스턴스로 getText()와 같은 메서드를 사용할 수 있다.*/
          const range = quill.getSelection()?.index;
          //getSelection()은 현재 선택된 범위를 리턴한다. 에디터가 포커싱되지 않았다면 null을 반환한다.
          if (typeof range !== "number") return;
          /*range는 0이 될 수도 있으므로 null만 생각하고 !range로 체크하면 잘못 작동할 수 있다.
            따라서 타입이 숫자이지 않을 경우를 체크해 리턴해주었다.*/

          quill.setSelection(range, 1);
          /* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다. 
               위치 인덱스와 길이를 넣어주면 된다.*/

          quill.clipboard.dangerouslyPasteHTML(
            range,
            `<img src=${url} alt="image" />`
          );
        });
      console.log("req출력 - 밖", reqImageUrl);
    };
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        // 툴바에 넣을 기능들을 순서대로 나열하면 된다.
        container: [
          ["image", "video"],
          ["bold", "italic", "underline", "strike"],
          [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
            { align: [] },
          ],
          [{ size: ["small", false, "large", "huge"] }, { color: [] }],
        ],
        // custom 핸들러 설정
        handlers: {
          imageUrl: imageUrlHandler, // 이미지 url핸들러
          image: ImageUploader, // 이미지 tool 사용에 대한 핸들러 설정
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
    "align",
    "color",
    "background",
  ];

  return (
    <>
      <CustomReactQuill
        ref={quillRef}
        value={htmlContent}
        onChange={setHtmlContent}
        modules={modules}
        formats={formats}
        theme="snow"
      />
    </>
  );
};

export default QuillEditor;

const CustomReactQuill = styled(ReactQuill)`
  max-height: 50rem;
  height: 30rem;
  max-width: 52rem;
  border-redius: 10px;
`;
