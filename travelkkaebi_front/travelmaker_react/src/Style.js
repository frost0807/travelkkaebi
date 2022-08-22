import { createGlobalStyle } from "styled-components";
import reset from 'styled-reset'

const RegionStyle = createGlobalStyle `
  ${ reset }
  * {
    box-sizing : border-box;
    outline : none;
  }

  html, body { 
    margin : 0;
    padding : 0;
    width : 100%;
    height : 100%;
    font-family : 'Malgun Gothic', sans-serif;
   }
`;

export default RegionStyle