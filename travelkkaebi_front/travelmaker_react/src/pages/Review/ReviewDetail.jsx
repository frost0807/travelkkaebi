import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { API_BASE_URL } from "../../config";

import axios from 'axios';
import React from 'react';

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
      .then(res=>{
        setData(res.data);
        console.log(res);
        console.log(res.data);
      })
    }
  
    useEffect(()=>{
      getDetail();
    },[]);// currentPage가 변경될 때마다 다시 호출


  return (
    <div>

        <table className='table' style={{width:'500px'}}>
        <caption><h3>{data.title}</h3></caption>
        <tbody>
          <tr>
            <td>
              <b>작성자: {data.userId}({data.userId})</b>
              <span style={{float:'right', color:'gray'}}>{data.userId}</span>
            </td>
          </tr>
          <tr>
            <td>
              {/* <img alt='' src={photoUrl + dto.photo}
                style={{maxWidth:'400px'}}/> */}
                <br/><br/>
                <p style={{backgroundColor:'white', border:'none', maxWidth:'300px'}}>
                  {data.content}
                </p>
            </td>
          </tr>
          <tr>
            <td><b style={{color:'gray'}}>조회 {data.view}</b></td>
          </tr>
          <tr>
            <td>
              <button type='button' className='btn btn-info'
              style={{width:'100px', marginRight:'10px'}}
              onClick={()=>{
                navi("/review/form");
              }}>글쓰기</button>

              <button type='button' className='btn btn-success'
              style={{width:'100px', marginRigth:'10px'}}
              onClick={()=>{
                navi(`/review/1`);
              }}>목록</button>
            </td>
          </tr>
        </tbody>
      </table>

      
    </div>
    
  )

}


export default ReviewDetail;