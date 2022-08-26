import React from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import SplitButton from 'react-bootstrap/SplitButton';

function Review() {

  const [show, setShow] = useState(1);

  const [data, setData]=useState('');
  const navi = useNavigate();

  // 현재 페이지 번호
  const { currentPage }=useParams();

  // url선언
  let pagelistUrl = process.env.REACT_APP_SPRING_URL + 'board/pagelist?currentPage=' + currentPage;
  let photoUrl  = process.env.REACT_APP_SPRING_URL + 'save/';

  // 시작시 호출되는 함수
  const pageList=()=>{
    axios.get(pagelistUrl)
    .then(res=>{
      setData(res.data);
    })
  }

  useEffect(()=>{
    pageList();
  },[currentPage]);// currentPage가 변경될 때마다 다시 호출


  return(
    
    


    <div style={{}}>

      



      <div style={{}}>
        <h3 className='alert alert-info' style={{ width:'700px', marginTop: 90, margin: 'auto' }}>
          총 {data.totalCount} 개의 게시글이 있습니다
        </h3>
        <br/>
        <table className='table table-bordered' style={{ width:'700px', margin: 'auto' }}>
          <thead>
            <tr style={{ backgroundColor:'#ddd' }}>
              <th width='50'>번호</th>
              <th width='400' style={{ textAlign:'center' }}>제목</th>
              <th width='80'>작성자</th>
              <th width='50'>조회</th>
            </tr>
          </thead>
          <tbody>
          {
            /* https://maggie-a.tistory.com/220 TypeError: Cannot read property 'map' of null
            */
            data && data.list.map((row, idx)=>(
              <tr>
                <td>{data.no - idx}</td>
                <td onClick={()=>{
                  navi(`/board/detail/${row.num}/${currentPage}`)
                }} style={{ cursor:'pointer' }}>
                  <img alt='' className='photo_small'
                  src={photoUrl + row.photo} style={{ borderRadius:'50px', border:'none' }}/>
                  
                  <b>{row.subject}</b>
                </td>
                <td>{row.name}</td>
                <td>{row.readcount}</td>
              </tr>
            ))
          }
          </tbody>
        </table>

        {/* 페이징 */}
        <div style={{ width:'700px', margin:'auto' }}>
          <ul className='pagination'>
          {
            (data.startPage > 1 ? <li>
              <Link to={ `/board/list/${data.startPage-1}` }>이전</Link></li>:'')
          }  
          {
            data.parr && data.parr.map(n=>{
              const url = '/board/list/' + n;
              return (
                <li>
                  <Link to={url}>
                    <b style={{ color: n == currentPage?'red':'black' }}>{n}</b>
                  </Link>
                </li>
              )
            })
          }
          {
            (data.endPage < data.totalPage ? 
            <li><Link to={ `/board/list/${data.endPage+1}` }>다음</Link></li>:'')
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

export default Review;