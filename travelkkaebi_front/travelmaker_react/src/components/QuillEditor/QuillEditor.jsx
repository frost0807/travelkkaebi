import axios from "axios";
import React, { useMemo, useCallback, memo } from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // react-quill과 css파일 import 하기
import styled from "styled-components";
import { API_BASE_URL } from "../../config";
import { headerImg_tk } from "../../util";

const QuillEditor = memo(({ quillRef, htmlContent, setHtmlContent }) => {
  const [currentImage, setCurrentImage] = useState({
    image_file: "",
    preview_URL: null,
  });

  // const imageHandler = () => {
  //   this.quillEditor = this.quillRef.getEditor();
  //   const input = document.createElement("input");
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();
  //   input.onchange = async () => {
  //     const file = input.files[0];
  //     const formData = new FormData();
  //     formData.append("quill-image", file);
  //     const res = await uploadFile(formData);
  //     const range = this.quillEditor.getSelection();
  //     const link = res.data[0].url;

  //     // this part the image is inserted
  //     // by 'image' option below, you just have to put src(link) of img here.
  //     this.quillEditor.insertEmbed(range.index, "image", link);
  //   };
  // };

  /*
  useEffect(() => {
    const handleImage = () => {
      // 이미지 핸들 로직
    };

    if (quillRef.current) {
      const { getEditor } = quillRef.current;
      const toolbar = quillRef.current.getEditor().getModule("toolbar");
      toolbar.addHandler("image", handleImage);
    }
  }, []);
*/

  // 툴바의 사진 아이콘 클릭시 기존에 작동하던 방식 대신에 실행시킬 핸들러를 만들어주자.
  // const imageHandler = (e) => {
  //   const formData = new FormData(); // 이미지를 url로 바꾸기위해 서버로 전달할 폼데이터 만들기

  //   const input = document.createElement("input"); // input 태그를 동적으로 생성하기
  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*"); // 이미지 파일만 선택가능하도록 제한
  //   input.setAttribute("name", "image");
  //   input.click();

  //   input.onChange = () => {
  //     if (e.target.files[0]) {
  //       // 새로운 이미지를 올리면 createObjectURL()을 통해 생성한 기존 URL을 폐기
  //       URL.revokeObjectURL(currentImage.preview_URL);
  //       const preview_URL = URL.createObjectURL(e.target.files[0]);
  //       setCurrentImage(() => ({
  //         image_file: e.target.files[0],
  //         preview_URL: preview_URL,
  //       }));
  //     }
  //   };
  // };

  // useEffect(() => {
  //   // 컴포넌트가 언마운트되면 createObjectURL()을 통해 생성한 기존 URL을 폐기
  //   return () => {
  //     URL.revokeObjectURL(currentImage.preview_URL);
  //   };
  // }, []);

  /*
    // 파일 선택창에서 이미지를 선택하면 실행될 콜백 함수 등록
    input.addEventListener("change", async () => {
      console.log("onChange");
      const file = input.files[0];

      formData.append("file", file);
      formData.append("imageDTO", file);

      const result = (axios.defaults.headers = {
        "content-type": "multipart/form-data",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      });
      await axios.post(API_BASE_URL + "/image/insert", formData);
      console.log(result);
      console.log("성공시 백엔드가 보내주는 데이터", result.data.url);
      const IMG_URL = result.data.url;
      // 이 URL을 img 태그의 src에 넣은 요소를 현재 에디터의 커서에 넣어주면 에디터 내에서 이미지가 나타난다
      // src가 base64가 아닌 짧은 URL이기 때문에 데이터베이스에 에디터의 전체 글 내용을 저장할 수있게된다
      // 이미지는 꼭 로컬 백엔드 uploads 폴더가 아닌 다른 곳에 저장해 URL로 사용하면된다.

      const editor = quillRef.current.getEditor(); //에디터 객체 가져오기
      // 1. 에디터 root의 innerHTML을 수정해주기
      // editor의 root는 에디터 컨텐츠들이 담겨있다. 거기에 img태그를 추가해준다.
      // 이미지를 업로드하면 -> 멀터에서 이미지 경로 URL을 받아와 -> 이미지 요소로 만들어 에디터 안에 넣어준다.
      // editor.root.innerHTML =
      //   editor.root.innerHTML + `<img src=${IMG_URL} /><br/>`; // 현재 있는 내용들 뒤에 써줘야한다.

      // 2. 현재 에디터 커서 위치값을 가져온다
      const range = editor.getSelection();
      // 가져온 위치에 이미지 삽입
      editor.insertEmbed(range.index, "image", IMG_URL);
    });
  };

  */

  //     const url = res.payload.url;
  //     const quill = quillRef.current.getEditor();
  //     /* ReactQuill 노드에 대한 Ref가 있어야 메서드들을 호출할 수 있으므로
  //           useRef()로 ReactQuill에 ref를 걸어주자.
  //           getEditor() : 편집기를 지원하는 Quill 인스턴스를 반환함
  //           여기서 만든 인스턴스로 getText()와 같은 메서드를 사용할 수 있다.*/

  //     const range = quill.getSelection()?.index;
  //     //getSelection()은 현재 선택된 범위를 리턴한다. 에디터가 포커싱되지 않았다면 null을 반환한다.

  //     if (typeof range !== "number") return;
  //     /*range는 0이 될 수도 있으므로 null만 생각하고 !range로 체크하면 잘못 작동할 수 있다.
  //           따라서 타입이 숫자이지 않을 경우를 체크해 리턴해주었다.*/

  //     quill.setSelection(range, 1);
  //     /* 사용자 선택을 지정된 범위로 설정하여 에디터에 포커싱할 수 있다.
  //              위치 인덱스와 길이를 넣어주면 된다.*/

  //     quill.clipboard.dangerouslyPasteHTML(
  //       range,
  //       `<img src=${url} alt="image" />`
  //     );
  //   }; //주어진 인덱스에 HTML로 작성된 내용물을 에디터에 삽입한다.
  // };

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
      },
    }),
    []
  );

  /*        handlers: {
          // 위에서 만든 이미지 핸들러 사용하도록 설정
          image: imageHandler,
        },
  */

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
});

export default QuillEditor;

const CustomReactQuill = styled(ReactQuill)`
  max-height: 30rem;
  height: 30rem;
  max-width: 52rem;
  border-redius: 10px;
`;
