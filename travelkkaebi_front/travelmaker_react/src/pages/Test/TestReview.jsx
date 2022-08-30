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

function TestReview() {

  const [show, setShow] = useState(1);

  const [data, setData]=useState('');
  const navi = useNavigate();

  // 현재 페이지 번호
  const { currentPage }=useParams();


  // 시작시 호출되는 함수
  const pageList=()=>{
    axios.get( API_BASE_URL+"/selectallbypage" )
    .then(res=>{
      setData(res.data.reviewList);
    })
  }

  useEffect(()=>{
    pageList();
  },[currentPage]);// currentPage가 변경될 때마다 다시 호출

            /* https://maggie-a.tistory.com/220 TypeError: Cannot read property 'map' of null
            */
                            /* <img alt='' className='photo_small'
                  src={photoUrl + row.photo} style={{ borderRadius:'50px', border:'none' }}/> */
  return(
    
    
    


    <div style={{}}>



      <div style={{}}>
        <h3 className='alert alert-info' style={{ width:'700px', marginTop: 90, margin: 'auto' }}>
          총 {data.totalCount} 개의 게시글이 있습니다
        </h3>
        <br/>
        {data.map = (dataset) =>{
          <li key={dataset.reviewId}>
            <ul>
              <li>{dataset.reviewId}</li>
              <li>{dataset.categoryId}</li>
              <li>{dataset.reviedId}</li>
              <li>{dataset.reviewId}</li>
              <li>{dataset.reviewId}</li>
            </ul>
          </li>
        }}

        {/* 페이징 */}
        <div style={{ width:'700px', margin:'auto' }}>
          <ul className='pagination'>
          {
            (data.startPage > 1 ? <li>
              <Link to={ `/testreview/${data.startPage-1}` }>이전</Link></li>:null)
          }  
          {
            data.parr && data.parr.map(n=>{
              return (
                <li>
                  <Link to={'/testreview'+ n}>
                    <b style={{ color: n == currentPage?'red':'black' }}>{n}</b>
                  </Link>
                </li>
              )
            })
          }
          {
            (data.endPage < data.totalPage ? 
            <li><Link to={ `/testreview/${data.endPage+1}` }>다음</Link></li>:null)
          }
          </ul>
        </div>
          
        <div style={{ width:'700px', textAlign:'right', margin:'auto', display:'flex' }}>
          <div style={{ width:'100%', marginTop:'10px' }}>
          <InputGroup className="mb-3" style={{}}>
            <Form.Control aria-label="Text input with dropdown button" />
            <SplitButton
              variant="outline-secondary"
              title="검색"
              id="segmented-button-dropdown-2"
              alignRight
            >
              <Dropdown.Item href="#">글쓴이 검색</Dropdown.Item>
              <Dropdown.Item href="#">제목 검색</Dropdown.Item>
              <Dropdown.Item href="#">내용 검색</Dropdown.Item>
              {/* <Dropdown.Divider />
              <Dropdown.Item href="#">Separated link</Dropdown.Item> */}
            </SplitButton>
          </InputGroup>
          </div>

          <div style={{ width:'300px' }}>
          <button type='button' className='btn btn-info'
          style={{ width:'110px', marginTop:'10px' }}
          onClick={()=>{
            navi("/board/form");
          }}>글쓰기</button>

          <div className='list-icon'>
            <span className='glyphicon glyphicon-th-list bicon' 
            style={{ color:show===1?'green':'magenta' }}
            onClick={()=>{
              setShow(1);
            }}></span>
            <span className='glyphicon glyphicon-th-large'
            style={{ color:show===2?'green':'magenta' }}
            onClick={()=>{
              setShow(2);
            }}></span>
            <span className='glyphicon glyphicon-list-alt'
            style={{ color:show===3?'green':'magenta' }}
            onClick={()=>{
              setShow(3);
            }}></span>
          </div>

          </div>

        <div>
          {
            // show===1?<BoardList1/>:show===2?<BoardList2/>:<BoardList3/>
          }
        </div>
      </div>
      
      </div>

      
    </div>
  );
}

export default TestReview;