import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState } from "recoil";
import { isModalOpenState } from "../../recoil/atom";

const Background = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 80;
  box-sizing: inherit;
`;

const ModalContainer = styled.div`
display: flex;
flex-direction: column;
position: relative;
max-height: 800px;
max-width:550px;
height: 700px;
padding: 15px;
background: #fff;
border-radius: 10px;
text-align: center;
overflow: hidden;
animation: modal-show 0.3s;
@media 480px {
  width: 90%;
`;

const Closebtn = styled(CloseIcon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  color: rgb(94, 94, 94);
  cursor: pointer;
`;

function Modal({ component }) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const ref = useRef(null);

  useEffect(() => {
    const onClickModalOutSide = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsModalOpen(false);
    };
    document.addEventListener("mousedown", onClickModalOutSide);
    return () => {
      document.removeEventListener("mousedown", onClickModalOutSide);
    };
  });

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Background>
      <ModalContainer isModalOpen={isModalOpen} ref={ref}>
        {component}
        <Closebtn onClick={onClose} />
      </ModalContainer>
    </Background>
  );
}

export default Modal;
