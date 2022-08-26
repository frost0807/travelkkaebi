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

function TestResponse () {

  const [show, setShow] = useState(1);

  const [data, setData]=useState('');
  const navi = useNavigate();
  const { currentPage }=useParams();



  const pageList=()=>{
    axios.get( API_BASE_URL+"/review/selectAllByPage" )
    .then(res=>{
      console.log(res);
      setData(res.data);
    })
  }

  useEffect(()=>{
    pageList();
  },[currentPage]);


return (
  <div>TestResponse Test : {data[0].title}</div>
)

}

export default TestResponse;