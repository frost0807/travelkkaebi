import styled from "styled-components";

const FooterBar = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  font-size: 16px;
  padding: 20px 60px;
  margin-top: 100px;
  color: black;
`;

const FooterBar2 = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  font-size: 16px;
  padding: 10px 60px;
  color: black;
`;

function Footer() {
  return (
    <>
      <FooterBar>
        <a>회사소개</a>
        <a>제휴안내</a>
        <a>광고안내</a>
        <a>이용약관</a>
        <a>개인정보처리방침</a>
        <a>청소년보호정책</a>
      </FooterBar>
      <FooterBar2>
        <a>Copyright ⓒ 2022 - 2022 KkaeB, All rights reserved.</a>
      </FooterBar2>
    </>
  );
}

export default Footer;
