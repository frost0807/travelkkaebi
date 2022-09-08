import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";
import Carousel from 'react-bootstrap/Carousel';

import axios from 'axios';
import React from 'react';
import { textAlign } from "@mui/system";
import banner from './/regionevent_banner.jpg';

import CardImg from "../../components/CardImg/CardImg";
import CardImgGet from "../../components/CardImg/CardImgGet";
import CarouselHome from "../../components/Carousel/CarouselHome";

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
      axios.get(API_BASE_URL+"/travelkkaebi/region/event/main")
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
      <div>
        {/* <div style={{backgroundImage:{banner}}}></div> */}
      {
        
        data && data.map((row, idx)=>(
        <tr>
          <td key={row.regionId}>{row.title}</td>
          <td onClick={()=>{
            navi(`/regionevent`)
            }} style={{ cursor:'pointer' }}>
            {row.content}
            {row.nickname}
          </td>
          <td>{row.posterImageUrl}</td>
          
        </tr>
      ))
      }
      ////////////
      {
        
        data2 && data2.map((row, idx)=>(
        <tr>
          <td key={row.regionId}>{row.title}</td>
          <td onClick={()=>{
            navi(`/regionevent`)
            }} style={{ cursor:'pointer' }}>
            {row.content}
            {row.nickname}
          </td>
          <td>{row.posterImageUrl}</td>
          
        </tr>
      ))
      }
      </div>




    <div style={{ height:"30%", width:"50%", margin:"auto" }}>
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
            <h3>{row.title}</h3>
            <p>{row.nickname}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))
      }
      </Carousel>
    </div>

    <div style={{marginTop: '100px', marginLeft:'100px', marginBottom: '20px', fontSize:'25px'}}>🚀 Hot</div>
    <CardImg topImage1="topImage1" topImage2="topImage2" topImage3="topImage3"  topImage4="topImage4" />
    <button type='button' className='btn btn-info'
          style={{ width:'110px', marginTop:'10px' }}
          onClick={()=>{
            navi("/regionevent/createform");
          }}>글쓰기</button>
    </>
  )
}

export default RegionEvent;

