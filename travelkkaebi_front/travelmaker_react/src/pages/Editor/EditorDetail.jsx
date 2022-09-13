
import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

import './EditorDetail.css';
import axios from 'axios';
import React from 'react';
import { textAlign } from "@mui/system";
import { SettingsCellOutlined } from "@mui/icons-material";

function EditorDetail(){

  const [data, setData] = useState([])
  const [reply, setReply] = useState([])
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([])
  const navi = useNavigate();

  const {id} = useParams()

    // 시작시 호출되는 함수

    const getDetail=()=>{
      axios
      .get(API_BASE_URL+"/editorchoice/selectone",{params : {editorChoiceId : id }})
      .then(res=>{
        setData(res.data);
        console.log("detail"+res.data);
      })
    }

    const onDelete= async ()=>{
      // const headerConfig = {
      //   Headers: {
      //     "content-type": "multipart/form-data",
      //   },
      // };
      // data.preventDefault();
      // regionEventDTO.id =1;
  
      axios.defaults.headers = {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      await axios
      .delete(API_BASE_URL + "/review/delete?reviewId="+id)
      .then((res) => {
        console.log("삭제 콘솔로그", res);
        alert("👹삭-제.");
        navi('/review/1');
      });
    }





      const [subject, setSubject] = useState('');
      const [content, setContent] = useState('');
  
    useEffect(()=>{
      getDetail();

    },[]);// currentPage가 변경될 때마다 다시 호출
    // let [cymd, chms] = data.creatTime.split('T');
    // let [uymd, uhms] = data.updateTime.split('T');
    // console.log(cymd)
  return (
    <div>

      <h2 align="center">게시글 상세정보</h2>
      <div className="voc-view-wrapper">
        <div className="voc-view-row">
            <label>게시글 번호</label>
            <label>{ data.reviewId }</label>
        </div>
        <div className="voc-view-row">
            <label>제목</label>
            <label>{ data.title }</label>
        </div>
        <div className="voc-view-row">
            <label>작성자</label>
            <label>{ data.nickname }</label>
        </div>
        <div className="voc-view-row">
            <label>이미지1</label>
            <label><img src={data.editorImgUrl1} style={{width : "100px", height : "100px"}} /></label>
        </div>
        <div className="voc-view-row">
            <label>이미지2</label>
            <label><img src={data.editorImgUrl2} style={{width : "100px", height : "100px"}} /></label>
        </div>
        <div className="voc-view-row">
            <label>이미지3</label>
            <label><img src={data.editorImgUrl3} style={{width : "100px", height : "100px"}} /></label>
        </div>

        <div className="voc-view-row">
            <label>조회수</label>
            <label>{ data.view }</label>
        </div>
        <div className="voc-view-row">
            <label>작성일</label>
            <label>{ data.createTime }</label>
        </div>
        <div className="voc-view-row">
            <label>수정일</label>
            <label>{ data.updateTime }</label>
        </div>
        <div className="voc-view-row">
            <label>내용</label>
            <div>
                {
                data.content
                }
            </div>
        </div>
        <div style={{margin: "10px 0", display: "flex"}}>
              <button type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi("/review/form");
              }}>수정</button>

              <button type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi("/review/form");
              }}>삭제</button>

              <button type='button' className='btn btn-success'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi(`/review/1`);
              }}>목록</button>
        </div>
        <div>
    </div>
        <div className="voc-view-reply" style={{marginTop:"100px"}}>
            <label style={{height:"100%", margin:"auto"}}>댓글</label>
            <label>
            <div>
                {
                reply && reply.map((row, idx)=>(
                  <tr>
                    <td key={row.reviewReplyId}>{row.nickname}</td>
                  
                  </tr>
                ))
                }
            </div>
            </label>
            <label>
            {
                reply && reply.map((row, idx)=>(
                  <tr>
                    <td key={row.reviewReplyId}>{row.comment}</td>
                  </tr>
                ))
            }
            </label>
            <label>
            {
                reply && reply.map((row, idx)=>(
                  <tr>
                    <td key={row.reviewReplyId}>{row.comment}</td>
                  </tr>
                ))
            }
            </label>
        </div>


      </div>
    </div>
    
  )

}


export default EditorDetail;

// 게시글 상세정보 1
// 리플라이 상세정보 2
// 좋아요 싫어요 3
// 이미지 4
// 4개를 멀티 액시오스로 겟

// 셀렉트 원 좋아요 싫어요나 할때마다 새로 받아오게
// 셀렉트 올페이지에서 접속할때랑 상세보기에서 새로고침으로 접속할때 경우 생각해두기
// 글이 삭제된다거나(근데 그건 리스트에서 들어갈때도 동일함)

