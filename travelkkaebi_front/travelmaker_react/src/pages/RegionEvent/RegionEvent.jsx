import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

import axios from 'axios';
import React from 'react';
import { textAlign } from "@mui/system";


import CardImg from "../../components/CardImg/CardImg";
import CardImgGet from "../../components/CardImg/CardImgGet";
import CarouselHome from "../../components/Carousel/CarouselHome";

// 백엔드에서 메인 홈화면의 상단 정보/후기 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (위의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 백엔드에서 메인 홈화면의 하단 Party 부분 핫 게시물 사진과 작성자
// 게시물 번호등 보내줌 (아래의의 CardImg에서 props로 보내서 컴포넌트에서 처리)

// 하단 CardImg에서 props로 컴포넌트에 보내서 처리

function RegionEvent() {

  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([])
  const navi = useNavigate();

  const {id} = useParams()

    // 시작시 호출되는 함수
    const getDetail=()=>{
      axios.get(API_BASE_URL+"/travelkkaebi/region/event/main")
      .then(response=>{
        setData(response.data);
        console.log(response);
        console.log(response.data);
      })
    }
  
    useEffect(()=>{
      getDetail();
    },[]);// currentPage가 변경될 때마다 다시 호출



  return(
    <>
    <div style={{}}>
    <CarouselHome/>
    </div>
    <div style={{marginTop: '100px', marginLeft:'100px', marginBottom: '20px', fontSize:'25px'}}>🚀 Hot</div>
    <CardImg topImage1="topImage1" topImage2="topImage2" topImage3="topImage3"  topImage4="topImage4" />
    <CardImg topImage1="topImage1" topImage2="topImage2" topImage3="topImage3"  topImage4="topImage4" />
    <CardImgGet D="tomImage1" topImage2="topImage2" topImage3="tomImage3" topImage4="topImage4" />
    {/* <div style={{height:'100px'}}></div> */}
    {/* <CardImg bottomImage1="bottomImage1" bottomImage2="bottomImage2" bottomImage3="bottomImage3"  bottomImage4="bottomImage4" /> */}
    <button type='button' className='btn btn-info'
          style={{ width:'110px', marginTop:'10px' }}
          onClick={()=>{
            navi("/regionevent/createform");
          }}>글쓰기</button>
    </>
  )
}

export default RegionEvent;

