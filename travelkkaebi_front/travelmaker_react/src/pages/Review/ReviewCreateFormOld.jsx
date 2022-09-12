import React from 'react';

import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import { API_BASE_URL } from '../../config';


const ReviewCreateFormOld = () => {
  const [photo, setPhoto] = useState('');
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');

  // loginStatus 추후에 맞춰서 변경
  const navi = useNavigate();
  let loginStatus = localStorage.loginStatus;
  loginStatus = 1; // 로그인 상태 임시로 켜둔거
  let id = "temporaryId" //localStorage.myid;

  const logInStatus=()=>{
    if(loginStatus==null){
      alert("먼저 로그인한 후 글을 작성해주세요");
      navi("/login");
    }
  }

  
  let reviewId =1;
  let categoryId =1;
  let userId="userIdT";
  let title="titleT";
  let region ="서울";
  let view =0;
  let createTime="2022.06.06";
  let updateTime="2022.06.06";


  const onBoardInsert=(e)=>{
    e.preventDefault();

    axios.post(API_BASE_URL+"/review/write", {reviewId, categoryId, userId, title, content, region, view, createTime, updateTime, userId})
    .then(res=>{
      navi("/review/1");
    })
  }

  useEffect(()=>{
      // 로그인 체크 함수
      logInStatus();
    },[]);

  return (
    <div>
      {/* <img alt='' src={photoUrl+photo} className='imgphoto'/> */}
      <form onSubmit={onBoardInsert}>
        <table className='table table-bordered' style={{width:'400px'}}>
          <caption><h3>리뷰게시판 글쓰기</h3></caption>
          <tbody>
            <tr>
              <th style={{backgroundColor:'#ddd'}} width='100'>아이디</th>
              <td>{id}</td>
            </tr>
            {/* <tr>
              <th style={{backgroundColor:'#ddd'}} width='100'>대표 이미지</th>
              <td>
                <input type='file' className='form-control'll
                style={{width:'250px'}} 
                onChange={imageUpload} required/>
              </td>
            </tr> */}
            <tr>
              <th style={{backgroundColor:'#ddd'}} width='100'>제목</th>
              <td>
                <input type={'text'} className="form-control"
                style={{width:'300px'}} required
                onChange={(e)=>{
                  setSubject(e.target.value);
                }}/>
              </td>
            </tr>
            <tr>
              <td colSpan={2}>
                <textarea className='form-control' required
                style={{width:'400px', height:'120px'}}
                onChange={(e)=>{
                  setContent(e.target.value);
                }}></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={2} align='center'>
                <button type="submit" className='btn btn-info'>게시글 저장</button>
                <button type="button" className='btn btn-success'
                style={{marginLeft:'10px'}}
                onClick={()=>{
                  navi("/review/1");
                }}>게시판 메인</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default ReviewCreateFormOld;