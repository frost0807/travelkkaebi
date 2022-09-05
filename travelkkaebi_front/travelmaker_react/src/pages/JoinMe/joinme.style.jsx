import styled from "styled-components";

export const DetailHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  font-size: 26px;
  margin-top: -10px;
  padding-bottom: 15px;
`;

export const JoinContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: 16px 0 6px;
  height: 100%;
  font-size: 15px;
  line-height: 1.47;
  letter-spacing: -0.3px;
  color: #495057;
  overflow-x: hidden;
  overflow-y: auto;
  box-sizing: inherit;
`;

export const JoinIntroWrapper = styled.div`
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  box-sizing: inherit;

  font-size: 15px;
  line-height: 1.47;
  letter-spacing: -0.3px;
  color: #495057;
  font-weight: 500;
`;

export const IntroHeaders = styled.div`
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #e9ebee;
  font-weight: 400;
  display: block;
  box-sizing: inherit;
  text-align: left;
`;

export const IntroBodys = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding-bottom: 20px;
  font-size: 15px;
  line-height: 1.47;
  letter-spacing: -0.3px;
  color: #495057;
  display: block;
`;

export const JDFooter = styled.footer`
  display: flex;
  justify-content: flex-end;
  box-sizing: inherit;
`;

export const FooterButton = styled.button`
  padding: 6px 12px;
  color: #fff;
  height: 50px;
  background-color: #ffbe3bee;
  border-radius: 12px;
  margin-top: 18px;
  border: none;
`;

