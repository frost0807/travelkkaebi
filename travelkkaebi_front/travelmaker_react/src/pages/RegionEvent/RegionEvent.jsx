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

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

// 백엔드에서 메인 홈화면의 상단 정보/후기 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (위의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 백엔드에서 메인 홈화면의 하단 Party 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (아래의의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 하단 CardImg에서 props로 컴포넌트에 보내서 처리

function RegionEvent() {

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const navi = useNavigate();

  const {page} = useParams()

    // 시작시 호출되는 함수
    const getDetail=()=>{
      axios.get(API_BASE_URL+"/region/event/main")
      .then(response=>{
        setData(response.data[1]);
        setData2(response.data[2]);
        console.log(response.data);

      })
    }
  
    useEffect(()=>{
      getDetail();
    },[]);// currentPage가 변경될 때마다 다시 호출


  return(
    <>
      <ScTopCard style={{marginBottom:"50px"}}>
            <ScLogo1 alt='' src={banner} style={{ width: "100%" }} />
            <ScLogo2 alt='' src={b1b} style={{ width: "100%" }} />
              <ScMainTitle>전국팔도 방방곡곡 지역축제!</ScMainTitle>
              <Scwrite
                onClick={() => {
                  localStorage.getItem('role')== 'ADMIN' ? 
                  navi("/regionevent/createform") : alert("관리자 기능입니다.")
                }}
              >
                {/* <img src={b2b} alt='' /> */}
                <span>글 작성하기</span>
              </Scwrite>
        </ScTopCard>  

    
        <div style={{
      marginTop: '100px', marginLeft:'300px', marginBottom: '50px', fontSize:'25px',
      fontWeight:'900'
      }}>
      🎊 지금 핫한 축제 !</div>
    <div style={{ height:"20%", width:"40%", marginTop:"50px", margin:"auto" }}>
      <Carousel>
      {
        data && data.map((row, idx)=>(
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={row.posterImageUrl}
            alt="First slide"
          />
          <Carousel.Caption>
            {/* <h3>{row.title}</h3>
            <p>{row.nickname}</p> */}
          </Carousel.Caption>
        </Carousel.Item>
      ))
      }
      </Carousel>
    </div>

    <div style={{marginTop: '100px', marginLeft:'100px', marginBottom: '20px', fontSize:'25px'}}>🌾 지난 축제</div>

    <div>
      
    <CardGroup style={{marginLeft:'100px', marginRight:'100px'}}>
      {
        data2 && data2.map((row, idx)=>(

      <Card >
        <Card.Img variant="top"  src={row.posterImageUrl} />
        {/* <Card.Body>
          <Card.Title as="a" onClick={()=>{
                  navi(`/regionevent/detail/${row.regionId}`)
                }} >{row.title}</Card.Title>
          <Card.Text>
            {row.nickname}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{row.view}</small>
        </Card.Footer> */}
      </Card>
      ))
      }
    </CardGroup>


    </div>


    </>
  )
}

export default RegionEvent;

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