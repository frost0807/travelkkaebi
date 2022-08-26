import { Button, Container } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";
import useStore from "../store.js";
import Login from "./Login/Login";

const ModalOnbtn = () => {
  // const { modalState, openModal, closeModal } = useStore((state) => state);
  const navi = useNavigate();
  const register = () => {
    navi("/register");
  };

  return (
    <Container style={{ marginTop: 50 }}>
      {/* <Button onClick={openModal()}>Login</Button>
      <Login isOpen={modalState} close={closeModal()} />
      <Button onClick={register}>회원가입</Button> */}
    </Container>
  );
};

export default ModalOnbtn;
