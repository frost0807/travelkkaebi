import React, { useCallback, useEffect, useRef } from "react";
import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";
import { useRecoilState } from "recoil";
import { isModalOpenState } from "../../recoil/atom";

const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgb(0, 0, 0, 0.5);
  z-index: 1000;
`;

const ModalContainer = styled.div`
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
max-height: 100%;
width: 25rem;
height: auto;
padding: 16px;
background: #fff;
border-radius: 10px;
text-align: center;
animation: modal-show 0.3s;
@media 480px {
  width: 90%;
`;

const Closebtn = styled(CloseIcon)`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  width: 2rem;
  cursor: pointer;
`;

function Modal({ component }) {
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const ref = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", onClickModalOutSide);
    return () => {
      document.addEventListener("mousedown", onClickModalOutSide);
    };
  }, [ref]);

  function onClickModalOutSide(e) {
    if (ref.current && ref.current.contains(e.target)) {
      onClose();
    }
  }

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Background>
      <ModalContainer isModalOpen={isModalOpen} ref={ref}>
        <Closebtn onClick={onClose} />
        {component}
      </ModalContainer>
    </Background>
  );
}

export default Modal;
