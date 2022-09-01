import styled from "styled-components";

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
