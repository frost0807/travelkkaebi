import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";
import Carousel from 'react-bootstrap/Carousel';

import axios from 'axios';
import React from 'react';
import { textAlign } from "@mui/system";
import banner from './/regionevent_banner.jpg';

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


    <div style={{ height:"30%", width:"50%", margin:"auto" }}>
      <Carousel>
      {
        data && data.map((row, idx)=>(
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={row.editorImgUrl1}
            alt="이미지 미첨부된 게시글"
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

    <div>
      
    <CardGroup style={{marginLeft:'100px', marginRight:'100px'}}>
      {
        data2 && data2.map((row, idx)=>(

      <Card >
        <Card.Img variant="top"  src={row.editorImgUrl1} />
        <Card.Body>
          <Card.Title as="a" onClick={()=>{
                  navi(`/editor/detail/${row.editorChoiceId}`)
                }} >{row.title}</Card.Title>
          <Card.Text>
            {row.nickname}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">{row.view}</small>
        </Card.Footer>
      </Card>
      ))
      }
    </CardGroup>


    </div>

    <button type='button' className='btn btn-info'
          style={{ width:'110px', marginTop:'10px' }}
          onClick={()=>{
            navi("/regionevent/createform");
          }}>글쓰기</button>
    </>
  )
}

export default Editor;

