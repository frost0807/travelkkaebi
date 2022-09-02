import styled from "styled-components";
import CloseIcon from "@mui/icons-material/Close";

export const Backgr = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow: hidden;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1060;
  box-sizing: inherit;
`;

export const Dimmed = styled.div`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background: rgba(11, 19, 30, 0.37);
`;

export const ModalContainer = styled.div`
  padding: 24px;
  margin: auto;
  width: 450px !important;
  height: 550px;
  background-color: #fff;
  border-radius: 6px;
  z-index: 10;
`;

export const Closebtn = styled(CloseIcon)`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-weight: inherit;
  font-style: inherit;
  box-sizing: inherit;
`;

const FormBox = styled.div`
  margin: auto;
  width: 400px;
  height: 100%;
  padding: 5px;
`;

const InputBox = styled.div`
  position: relative;
  margin-top: 30px;
  min-width: 100%;
`;

const InputField = styled.input`
  width: 100%;
  padding: 20px 10px 10px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid #999;
  font-size: 18px;
  color: black;
  outline: none;
`;

const FormFooter = styled.div`
  margin-top: 20px;
  text-align: center;
  margin-bottom: 30px;
`;

const SnsLine = styled.div`
  display: flex;
  flex-basis: 100%;
  align-items: center;
  color: rgba(0, 0, 0, 0.35);
  font-size: 5px;
  padding: 10px;
  margin: 8px 0px;
  &:before {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
  &:after {
    content: "";
    flex-grow: 1;
    background: rgba(0, 0, 0, 0.35);
    height: 1px;
    font-size: 0px;
    line-height: 0px;
    margin: 0px 16px;
  }
`;

const Btn = styled.button`
  color: white;
  width: 80%;
  height: 50px;
  font-size: 20px;
  background-color: #ffbe3bee;
  border: none;
  border-radius: 30px;
  cursor: pointer;
`;

export { FormBox, InputBox, InputField, FormFooter, Btn, SnsLine };
