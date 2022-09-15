
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
      .delete(API_BASE_URL + "/editorchoice/delete?editorChoiceId="+id)
      .then((res) => {
        console.log("삭제 콘솔로그", res);
        alert("👹삭-제.");
        navi('/editor/1');
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
    <div style={{marginTop:"50px"}}>
      <div className="voc-view-wrapper">
        <a href="/editor/1" align="left" style={{fontFamily:"'NanumBarunGothic', 'Malgun Gothic', dotum, sans-serif", fontSize:"30px", color:"#548235" , marginBottom:'10px', textDecorationLine : 'none'}}>에디터 추천 게시판</a>
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
          {localStorage.getItem('userId')== data.userId ? 
              <div>              
                <button  type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px', border: '1px solid', backgroundColor: 'rgba(0,0,0,0)', color:'skyblue'}}
              onClick={()=>{
                navi("/review/updateform");
              }}>수정</button>

              <button type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px', border: '1px solid', backgroundColor: 'rgba(0,0,0,0)', color:'red'}}
              onClick={()=>{
                onDelete();
              }}>삭제</button>
              </div> : null }

              <button  type='button' className='btn btn-success'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi(`/editor/1`);
              }}>목록</button>
          </div>
        </div>


        <div>
            <label><img src={data.profileImageUrl} style={{width : "80px", height : "80px", borderRadius:"50%" }} /></label>
        </div>

        <div style={{marginTop:"50px"}}>
            <label align="center"><img src={data.editorImgUrl1} style={{width : "100%"}} /></label>
            <label align="center"><img src={data.editorImgUrl2} style={{width : "100%"}} /></label>
            <label align="center"><img src={data.editorImgUrl3} style={{width : "100%"}} /></label>
        </div>
        
        <div style={{marginTop:"50px", marginBottom:"150px"}}>
          {
          data.content
          }
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

