import { ContainerWrapper, FormTitle, Title, Wrapper } from "./RegionEventCreatestyle";
import { useEffect, useState } from "react";
import { Button, IconButton } from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL, review } from "../../config";

import './ReviewDetail.css';
import axios from 'axios';
import styled from "styled-components";
import React from 'react';
import { textAlign } from "@mui/system";
import { SettingsCellOutlined } from "@mui/icons-material";
import { useForm } from "react-hook-form";


function ReviewDetail(){

  const [data, setData] = useState([])
  const [reply, setReply] = useState([])
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([])

  const {id} = useParams()


  const navi = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    mode: "onChange",
  });

    // 시작시 호출되는 함수

    const getDetail=()=>{
      axios
      .get(API_BASE_URL+"/review/selectone",{params : {reviewId : id }})
      .then(res=>{
        setData(res.data);
        console.log(res.data);
      })
    }
    // const onSubmit= async (replyData)=>{
    //   console.log("reviewReplyInsert console.log before", replyData);
    //   // replyData.preventDefault();

      
    //   const formData = new FormData();
    //   const reviewReplyDTO = JSON.stringify(replyData);
    //   formData.append(
    //     "reviewReplyDTO",
    //     new Blob([reviewReplyDTO], { type: "application/json" })
    //   );
    //   console.log("after", formData);
    //   axios.defaults.headers = {
    //     "Content-Type": "application/json; charset = utf-8",
    //     Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
    //   };
    //   {/*reviewReplyDTO (comment만), reviewDTO(boardid{reviewid}), userId*/}
    //   // data.preventDefault();
      
    //   await axios.post(API_BASE_URL+"/review/reply/write", formData
    //   )
    //   .then(res=>{
    //     console.log(res.data);
    //     alert("댓글 작성이 완료되었습니다.");
    //     // navi(`/review/detail/${id}`);
    //   })
    // }

    const onSubmit = async(replyData)=>{

      console.log("rep", replyData);
      const reviewReplyDTO= {comment:replyData.content, boardId:id}
      axios.defaults.headers = {
        "Content-Type": "application/json; charset = utf-8",
        Authorization: "Bearer " + localStorage.getItem("ACCESS_TOKEN"),
      };
      const sendreply = axios
      .post(review+"/reply/write", reviewReplyDTO)
      .then((res)=>{
        console.log(res)
        navi(`/review/detail/${id}`);
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

      const getReply=()=>{
        axios
        .get(API_BASE_URL+"/review/reply/selectbyreview",{params : {reviewId : id }})
        .then(response=>{
          setReply(response.data);
          console.log(response.data);
        })
      }
      const [subject, setSubject] = useState('');
      const [comment, setComment] = useState('');
  
    useEffect(()=>{
      getDetail();
      getReply();

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
            <label>프로필 사진</label>
            <label><img src={data.profileImageUrl} style={{width : "100px", height : "100px"}} /></label>
        </div>
        <div className="voc-view-row">
            <label>지역</label>
            <label>{ data.region }</label>
        </div>
        <div className="voc-view-row">
            <label>조회수</label>
            <label>{ data.view }</label>
        </div>
        <div className="voc-view-row">
            <label>작성일</label>
            <label>{ data?.createTime?.split('T')[0] }</label>
        </div>
        <div className="voc-view-row">
            <label>수정일</label>
            <label>{ data?.updateTime?.split('T')[0] }</label>
        </div>
        <div className="voc-view-row">
            <label>내용</label>
            <div>
                {
                data.content
                }
            </div>
        </div>
        <div className="voc-view-row">
            <label>첨부사진</label>
            <label><img src={data.reviewImgUrl} style={{width : "300px", height : "300px"}} /></label>
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
                onDelete();
              }}>삭제</button>

              <button type='button' className='btn btn-success'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi(`/review/1`);
              }}>목록</button>

              {/* <button type='button' className='btn btn-info'
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
              }}>싫어요 : {data.dislikeCount}</button> */}

              

        </div>

        <Wrapper>
      <ContainerWrapper>
        <form
          
          id="reg_form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="register_form">


            <div className="reg_table" style={{ margin: 0, display: "block" }}>
              <table className="register_table">
                <colgroup style={{ display: "table-column-group" }}>
                  <col style={{ width: 130, display: "table-column" }} />
                  <col style={{ width: "*", display: "table-column" }} />
                </colgroup>
                <tbody>
                  <tr>
                    <th scope="row">
                      <label htmlFor="content" className="req">
                        🔸댓글 작성
                      </label>
                    </th>
                    <td>
                      <div className="content_wrap">
                        <input
                          type="content"
                          className="reg_input"
                          name="content"
                          required
                          
                          {...register("content", {
                            maxLength: {
                              value: 500,
                              message: "최대 500글자까지 입력 가능합니다.",
                            },
                            
                          })}
                        />
                      </div>
                    </td>
                  </tr>

                </tbody>
              </table>
            </div>

            <BtnConfirm >
              <a href="/review/1" className="btn_cancel">
                취소
              </a>
              <input
                type="submit"
                disabled={isSubmitting}
                value="댓글 작성"
                id="btn_submit"
                className="btn_submit"
                accessKey="s"
                
              />
            </BtnConfirm>
          </div>
        </form>
      </ContainerWrapper>
    </Wrapper>
        {/* <div> */}
      {/* <img alt='' src={photoUrl+photo} className='imgphoto'/> */}
      {/* 원조 댓글 삭제 */}
      {/* <form onSubmit={handleSubmit(reviewReplyInsert)}>
        <table className='table table-bordered' style={{width:'400px'}}>
          <caption><h3>댓글쓰기</h3></caption>
          <tbody>
            <tr>
              <th style={{backgroundColor:'#ddd'}} width='100'>댓글쓰기</th>
              <td>{id}</td>
            </tr>


            <tr>
              <td colSpan={2}>
                <textarea className='form-control' required
                style={{width:'400px', height:'120px'}}
                onChange={(e)=>{
                  setComment(e.target.value);
                }}></textarea>
              </td>
            </tr>
            <tr>
              <td colSpan={2} align='center'>
                <button type="submit" className='btn btn-info'>댓글 작성</button>
                <button type="button" className='btn btn-success'
                style={{marginLeft:'10px'}}
                onClick={()=>{
                  navi("/review/1");
                }}>돌아가기</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div> */}



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

        </div>


      </div>
    </div>
    
  )

}


export default ReviewDetail;

const BtnConfirm = styled.div`
  text-align: "center";
  margin: 55px auto 0 !important;
  display: block;
`;

// 게시글 상세정보 1
// 리플라이 상세정보 2
// 좋아요 싫어요 3
// 이미지 4
// 4개를 멀티 액시오스로 겟

// 셀렉트 원 좋아요 싫어요나 할때마다 새로 받아오게
// 셀렉트 올페이지에서 접속할때랑 상세보기에서 새로고침으로 접속할때 경우 생각해두기
// 글이 삭제된다거나(근데 그건 리스트에서 들어갈때도 동일함)