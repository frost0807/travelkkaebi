

import { Button, Container } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Register from '../pages/Register/Register';
import Login from './Login/Login';

const ModalOnbtn = () => {

  const [ loginModal, setLoginModal ] = useState(false);

  const openModal = () => {
    setLoginModal(true);
  }


  const closeModal = () => {
    setLoginModal(false);
  }

  const navi = useNavigate();
  const register = () => {
    navi('/register')
  }


  return (

    <Container style={{ marginTop: 50 }}>
    <Button onClick={ openModal }>
      Login
    </Button>
    <Login isOpen={ loginModal } close={ closeModal } />

    <Button onClick={ register }>
      회원가입
    </Button>
    </Container>
    
  )
}

export default ModalOnbtn