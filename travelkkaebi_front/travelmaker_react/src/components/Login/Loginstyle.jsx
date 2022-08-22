import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';

const Background = styled.div `
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
    max-height: 60%;
    width: 25rem;
    height: 100%;
    padding: 16px;
    background: #fff;
    border-radius: 10px;
    text-align: center;
    animation: modal-show 0.3s;
    @media 480px {
        width: 90%;
    }
`;

const Closebtn = styled(CloseIcon)`
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 2rem;
    cursor: pointer;
`;

const FormBox = styled.div `
  margin: auto;
`

const InputBox = styled.div `
width: 350px;
position: relative;
margin-top: 30px;
`

const InputField = styled.input`
width: 100%;
padding: 20px 10px 10px;
background-color: transparent;
border: none;
border-bottom: 1px solid #999;
font-size: 18px;
color: black;
outline: none;
`

const FormFooter = styled.div `
margin-top: 20px;
text-align: center;
float: left;
margin-left: 100px;
`

const Btn = styled.button `
color: white;
width: 100%;
height: 50px;
background-color: #ffbe3bee;
font-size: 20px;
border: none;
border-radius: 25px;
cursor: pointer;
`

export { 
    Background, 
    ModalContainer, 
    Closebtn, 
    FormBox, 
    InputBox, 
    InputField,
    FormFooter,
    Btn 
}