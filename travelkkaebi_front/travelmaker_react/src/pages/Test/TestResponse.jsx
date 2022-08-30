import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';
import { API_BASE_URL } from '../../config';

import Img1 from './/basicLogo.png';

function TestResponse () {

  const [show, setShow] = useState(1);

  const [data, setData]=useState([]);
  const navi = useNavigate();
  const { currentPage }=useParams();



  const pageList=()=>{
    axios.get( API_BASE_URL+"/review/selectallbypage" )
    .then(res=>{
      
      console.log(res.data);

      setData(res.data);
      console.log("data1 = ", data);
      
      
    })
  }

  useEffect(()=>{
    pageList();

  },[]);
  console.log("data2 = ", data);

return (
  <>
    
      <div>
        <table className='table table-bordered' style={{width:'700px'}}>
          <thead>
            <tr style={{backgroundColor:'#ddd'}}>
              <th width='50'>번호</th>
              <th width='400' style={{textAlign:'center'}}>제목</th>
              <th width='80'>작성자</th>
              <th width='50'>조회</th>
            </tr>
          </thead>
          <tbody>


          </tbody>

        
        {
          data.map((obj, idx)=>
          (
          
          // <div key={idx}> testResponse : {obj.title}</div>
          
            <tr>
              <td width='50'>{obj.reviewId}</td>
              <td width='400' onClick={()=>{
                navi(`/testresponse/detail/${obj.reviewId}`)
              }} style={{cursor:'pointer'}}>{obj.title}</td>
              <td width='80'>{obj.userId}</td>
              <td width='50'>{obj.view}</td>
            </tr>
          

          ))
        }
        </table>


      </div>
        
    

    
    

    {/* <table className='table table-bordered' style={{width:'700px'}}>
        <thead>
          <tr style={{backgroundColor:'#ddd'}}>
            <th width='50'>번호</th>
            <th width='400' style={{textAlign:'center'}}>제목</th>
            <th width='80'>작성자</th>
            <th width='50'>조회</th>
          </tr>
        </thead> */}


        {/* <tbody>
        {
          data && data[0].map((row, idx)=>(
            <tr>
              <td>{data.no - idx}</td>
              <td onClick={()=>{
                navi(`/board/detail/${row.num}/${currentPage}`)
              }} style={{cursor:'pointer'}}>
                <img alt='' className='photo_small'
                src={photoUrl + row.photo} style={{borderRadius:'50px', border:'none'}}/>
                <b>{row.subject}</b>
              </td>
              <td>{row.name}</td>
              <td>{row.readcount}</td>
            </tr>
          ))
        }
        </tbody> */}
      {/* </table> */}
    
  </>

      
        )
      }




export default TestResponse;