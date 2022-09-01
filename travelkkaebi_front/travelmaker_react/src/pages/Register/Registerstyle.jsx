import styled from "styled-components";

const Wrapper = styled.div `
width : 100%;
margin : 30px 0px 100px;
background : #e7e7e7;
`

const ContainerWrapper = styled.div ` 
margin : 0 auto;
height : 100%;
zoom : 1;
display : block;
width : 1200px;
`
const Title = styled.h2 ` 
  font-size : 40px;
  margin: 50px 0;
  color : #2d3043;
  font-wight : bold;
  text-align : center;
  padding : 0;
  border : 0;
  display: block;
  margin-block-start : 0.83rem;
  margin-block-ebd : 0.83rem;
  margin-inline-start : 0px;
  margin-inline-end : 0px;
`
const FormTitle = styled.h3 `
  position : relative;
  padding : 0 0 10px 0;
  font-size : 18px;
  color : # 2d2f43;
  font-weight : 500;
  border-bottom : 2px solid #3d435f;
  display : block;
  margin-bottom : 10px;
  '&:after' {
    content : "";
    display : block;
    clear : both;
    visibility : hidden;
  }
`

export { 
  Wrapper,
  ContainerWrapper,
  Title,
  FormTitle
}