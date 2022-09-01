import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

import './ReviewDetail.css';
import axios from 'axios';
import React from 'react';
import { textAlign } from "@mui/system";

function ReviewDetail(){

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([])
  const navi = useNavigate();

  const {id} = useParams()

    // 시작시 호출되는 함수
    const getDetail=()=>{
      axios.get(API_BASE_URL+"/review/selectone",
      {params : {
        reviewId : id }
      })
      .then(response=>{
        console.log(response.data);
        setData(response.data);
        console.log(response);
        console.log(response.data);
      })
    }
  
    useEffect(()=>{
      getDetail();
    },[]);// currentPage가 변경될 때마다 다시 호출


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
            <label>작성자 ID</label>
            <label>{ data.userId }</label>
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

              <button type='button' className='btn btn-success'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi(`/review/1`);
              }}>목록</button>

              <button type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                axios.get(API_BASE_URL+"/review/likeup",
                {params : {
                  reviewId : id }
                })
                .then(response=>{
                  console.log(response);
                })
              }}>좋아요 : {data.likeCount}</button>

              <button type='button' className='btn btn-success'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                axios.get(API_BASE_URL+"/review/dislikeup",
                {params : {
                  reviewId : id }
                })
                .then(response=>{
                  console.log(response);
                })
              }}>싫어요 : {data.dislikeCount}</button>

              

        </div>


      </div>
    </div>
    
  )

}


export default ReviewDetail;

// 게시글 상세정보 1
// 리플라이 상세정보 2
// 좋아요 싫어요 3
// 이미지 4
// 4개를 멀티 액시오스로 겟

// 셀렉트 원 좋아요 싫어요나 할때마다 새로 받아오게
// 셀렉트 올페이지에서 접속할때랑 상세보기에서 새로고침으로 접속할때 경우 생각해두기
// 글이 삭제된다거나(근데 그건 리스트에서 들어갈때도 동일함)