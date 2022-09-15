import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";
import Carousel from 'react-bootstrap/Carousel';
import styled from 'styled-components';

import axios from 'axios';
import React from 'react';
import { textAlign } from "@mui/system";
import banner from './/banner.jpg';
import b1b from './/smallBanner.jpg';
import b2b from './/2.png';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

// 백엔드에서 메인 홈화면의 상단 정보/후기 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (위의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 백엔드에서 메인 홈화면의 하단 Party 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (아래의의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 하단 CardImg에서 props로 컴포넌트에 보내서 처리

function Editor() {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const navi = useNavigate();

  const {currentPage} = useParams()

    // 시작시 호출되는 함수
    const getDetail=()=>{
      axios.get(API_BASE_URL+"/editorchoice/selectallgood",
      {params : {
        pageNo : currentPage }
      })
      .then(res=>{
        setData(res.data);
        console.log(res.data);
      })
    }

    const getNewDetail=()=>{
      axios.get(API_BASE_URL+"/editorchoice/selectallnew")
      .then(response=>{
        setData2(response.data);
        console.log(response.data[0]);
      })
    }
  
    useEffect(()=>{
      getDetail();
      getNewDetail();
    },[]);// currentPage가 변경될 때마다 다시 호출


    const pageCount=()=>{
      axios.get(API_BASE_URL+"/editorchoice/count",
      )
      .then(response=>{
        setCount(response.data);
      })
    }
  return(
    <>
        <ScTopCard style={{marginBottom:"50px"}}>
            <ScLogo1 alt='' src={banner} style={{ width: "100%" }} />
            <ScLogo2 alt='' src={b1b} style={{ width: "100%" }} />
              <ScMainTitle>전문 에디터와 떠나요!</ScMainTitle>
              <Scwrite
                onClick={() => {
                  localStorage.getItem('role')== 'EDITOR' ? 
                  navi("/editor/createform") : alert("에디터만 글 작성이 가능합니다.")
                }}
              >
                {/* <img src={b2b} alt='' /> */}
                <span>글 작성하기</span>
              </Scwrite>
        </ScTopCard>  
    {/* <div>
      <img
        style={{width:"100%", marginBottom:"50px"}}
        src={banner}
      />

    </div> */}
    

    <div style={{
      marginTop: '100px', marginLeft:'300px', marginBottom: '50px', fontSize:'25px',
      fontWeight:'900'
      }}>
      👁 지금 가장 많이 찾는 글</div>
    <div style={{ height:"30%", width:"50%", marginTop:"100px", margin:"auto" }}>
      <Carousel>
      {
        data && data.map((row, idx)=>(
        <Carousel.Item>
          <img
          onClick={()=>{
            navi(`/editor/detail/${row.editorChoiceId}`)
          } } style={{cursor:"pointer"}}
            className="d-block w-100"
            src={row.editorImgUrl1}
            alt="이미지 미첨부된 게시글"
          />
          <Carousel.Caption>
            {/* <h3>{row.title}</h3> */}
            <p onClick={()=>{
                  navi(`/editor/detail/${row.editorChoiceId}`)
                } } style={{cursor:"pointer"}}>{row.title}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))
      }
      </Carousel>
    </div>

    <div style={{marginTop: '100px', marginLeft:'100px', marginBottom: '20px', fontSize:'25px'}}>🚀 주요 게시물</div>

    <div>
      
    <CardGroup style={{marginLeft:'100px', marginRight:'100px'}}>
      {
        data2 && data2.map((row, idx)=>(

      <Card >
        <Card.Img
        onClick={()=>{
          navi(`/editor/detail/${row.editorChoiceId}`)
        } }
        variant="top" style={{width:"100%", height:"60%", cursor:'pointer'}}  src={row.editorImgUrl1} />
        <Card.Body>
          <Card.Title onClick={()=>{
                  
                  navi(`/editor/detail/${row.editorChoiceId}`)
                } } style={{cursor:"pointer"}}>{row.title}</Card.Title>
          <Card.Text>
            {row.content}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">조회수 : {row.view}</small>
        </Card.Footer>
      </Card>
      ))
      }
    </CardGroup>

    </div>
    </>
  )
}

export default Editor;

const ScTopCard = styled.div`
  width: 100%;
  display: flex;
  background-color:#F5EABB;
  width: 100%;
  position: relative;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0px;
    margin: 30px auto;
  }
`;

const ScLogo1 = styled.img`
@media screen and (max-width: 768px) {
  display: none;
}
`
const ScLogo2 = styled.img`
display: none;
@media screen and (max-width: 768px) {
  display: block;
  }
`

const ScTopCard2 = styled.div`
  width: 100%;
  display: flex;
  font-size: 1.5em;
  margin-bottom: 30px;  
  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    padding: 0px;
    margin: auto;
    div{
      display: none;
    }
  }
`;

const ScMainTitle = styled.div`
  font-weight: 900;
  font-size: 2.125em;
  /* line-height: 43px; */
  margin-bottom: 20px;
  /* font-family: "SUIT ExtraBold"; */
  position: absolute;
  top:50%;
  right: 20%;
  @media screen and (max-width: 1200px) {
  font-size: 28px;
  right: 20%;
   /* display: none; */
  }
  @media screen and (max-width: 768px) {
  font-size: 16px;
  right: 20%;
  display: none;
  }
`;
const Scwrite = styled.div`
  position: absolute;
  top:64%;
  right: 20%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: black;
  font-weight: 500;
  text-align: center;
  color: white;
  width: 166px;
  height: 49px;
  font-size: 1.25em;
  border-radius: 10px;
  gap:7px;
  &:hover {
    cursor: pointer;
  }
  @media screen and (max-width: 768px) {
  position: absolute;
  font-size: 12px;
  width: 86px;
  height: 30px;
  right: 10%;
  top:30%;
    img{
      display: none;
    }
  }
  
`;