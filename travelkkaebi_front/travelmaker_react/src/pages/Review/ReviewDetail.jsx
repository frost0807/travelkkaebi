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


function ReviewDetail() {

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
    <div style={{marginTop:"50px"}}>
      <div className="voc-view-wrapper">
        <a href="/review/1" align="left" style={{fontFamily:"'NanumBarunGothic', 'Malgun Gothic', dotum, sans-serif", fontSize:"30px", color:"#548235" , marginBottom:'10px', textDecorationLine : 'none'}}>유저 리뷰 게시판</a>
        <hr style={{backgroundColor : '#548235', height:'3px'}}/>
        <h2 align="left" style={{fontFamily:"'NanumBarunGothic', 'Malgun Gothic', dotum, sans-serif", fontSize:"20px", marginBottom:'10px'}}>{ data.title }</h2>
      

        <div style={{float:"left"}}>
            {/* <label style={{marginRight:"10px"}}>No. { data.reviewId } </label> */}
            
            <label style={{marginRight:"10px"}}>{ data.nickname }</label>
            <label style={{marginRight:"10px"}}>|</label>
            <label style={{marginRight:"10px"}}>{ data.region }</label>
            <label style={{marginRight:"10px"}}>|</label>
            <label style={{marginRight:"10px"}}>{ data?.createTime?.split('T')[0] }</label>
        </div>
        <div style={{float:"right"}}>
          <label align="right" style={{marginRight:"10px"}}>조회수 : { data.view }</label>
        </div>

        <br></br>
        <hr/>
        <div style={{float:"right"}}>
          <div  style={{margin: "10px 0", display: "flex"}}>
              <button  type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi("/review/form");
              }}>수정</button>

              <button type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                onDelete();
              }}>삭제</button>

              <button  type='button' className='btn btn-success'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi(`/review/1`);
              }}>목록</button>
          </div>
        </div>


        <div>
            <label><img src={data.profileImageUrl} style={{width : "80px", height : "80px", borderRadius:"50%" }} /></label>
        </div>

        <div style={{marginTop:"50px"}}>
            <label align="center"><img src={data.reviewImgUrl} style={{width : "100%"}} /></label>
        </div>
        
        <div style={{marginTop:"50px", marginBottom:"150px"}}>
          {
          data.content
          }
        </div>


      
    <div>전체 댓글</div>
    <hr style={{height:"3px"}}/>

        <div  style={{marginTop:"30px"}}>

            <div>
                {
                reply && reply.map((row, idx)=>(
                  <div>
                  <div>
                    <div style={{float:"left", paddingTop:"5px", width:'20%'}} key={row.reviewReplyId}>{row.nickname}</div>
                    <div style={{float:"right", paddingTop:"5px", width:'80%'}} key={row.reviewReplyId}>{row.comment}</div>
                  </div>
                    {/* <div style={{width:'100%', height:'5px', backgroundColor:"red", display:"block"}}></div> */}
                    <hr/>
                  </div>

                ))
                }
            </div>
        </div>
      <hr/>
      
      <hr style={{height:"3px"}}/>

        <div  style={{marginTop:"30px"}}>

            <div>
                  <div>
                  <form
          id="reg_form"
          onSubmit={handleSubmit(onSubmit)}
        >
                  <div>
                    <div style={{float:"left", width:'20%'}}>댓글 작성</div>
                    <div style={{float:"right", width:'80%'}}>

                    <input
                          type="content"
                          // className="reg_input"
                          name="content"
                          style={{border:0, width:'70%'}}
                          required
                          
                          {...register("content", {
                            maxLength: {
                              value: 500,
                              message: "최대 500글자까지 입력 가능합니다.",
                            },
                          })}
                        />
                    <input
                      type="submit"
                      disabled={isSubmitting}
                      style={{width:'20%'}}
                      value="댓글 작성"
                      id="btn_submit"
                      className="btn_submit"
                      accessKey="s" 
                    />

                    </div>

                  </div>

                    </form>
                  </div>

                
            </div>
        </div>


    {/* <Wrapper>
      <ContainerWrapper>
        <form
          id="reg_form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="register_form">


            <div style={{ margin: 0, display: "block" }}>
              <table >
              
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
    
    </Wrapper> */}


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