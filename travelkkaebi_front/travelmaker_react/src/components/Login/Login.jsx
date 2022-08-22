import React from 'react';
import LoginForm from './LoginForm';
import { Background, ModalContainer, Closebtn } from './Loginstyle';

const Login = ({ isOpen, close }) => {


  // stopPropagation
  // 감싸고 있는 부모요소에도 이벤트가 발동되는 걸 (이벤트버블링) 막기 위해
  // 이벤트 전파를 막고 싶은 요소에 넣는다.
  // 참고사이트 https://velog.io/@tlatjdgh3778/React%EC%97%90%EC%84%9C-Modal-%EA%B5%AC%ED%98%84
  return (

    <>
    {isOpen ? 

      <Background>
      <ModalContainer onClick={ e => e.stopPropagation() } >
      <LoginForm />
     <Closebtn onClick= { close } />
     </ModalContainer>
     </Background> : null}

     </>

  )
}

export default Login