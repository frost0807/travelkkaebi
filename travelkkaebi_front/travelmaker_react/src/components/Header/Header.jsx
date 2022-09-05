import Container from "react-bootstrap/Container"; // 부트스트랩 콘테이너
import Nav from "react-bootstrap/Nav"; // 부트스트랩 Nav
import Navbar from "react-bootstrap/Navbar"; // 부트스트랩 Navbar
import NavDropdown from "react-bootstrap/NavDropdown"; // 부트스트랩 드롭다운
import Button from "react-bootstrap/Button";

import LogoSrc from ".//Logo.png"; // 좌상단 대표로고 이미지 삽입
import styled from "styled-components"; // styled-components

//import Login from './Login/Login'; // 로그인

const Logo = styled.img`
  // 로고 이미지
  width: 100px;
  height: 114px;
  margin-right: 30px;
`;

function Header() {
  // 헤더 펑션
  let logInStatus = true;

  return (
    <Navbar
      bg="light"
      expand="lg"
      style={{
        marginBottom: "100px",
        position: "sticky",
        top: "0px",
        zIndex: "3",
      }}
    >
      <Container>
        <Logo href="/home" src={LogoSrc} />
        <Navbar.Brand href="/">전국팔도 깨비</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/contact">Contact</Nav.Link>

            <NavDropdown title="Info" id="basic-nav-dropdown">
              <NavDropdown.Item href="/EditorPick">에디터 추천</NavDropdown.Item>
              <NavDropdown.Item href="/regionevent">지역별 축제</NavDropdown.Item>
              <NavDropdown.Item href="/UserPick">유저 추천</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Info#">기타</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/review/1">Review</Nav.Link>
            <NavDropdown title="Party" id="basic-nav-dropdown">
              <NavDropdown.Item href="/PartyMain">구인</NavDropdown.Item>
              <NavDropdown.Item href="/joinme/1">같이가요</NavDropdown.Item>
              <NavDropdown.Item href="/pickupme">데려가줘</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/Party#">기타</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav>
            <Nav.Link href="/alert">🔔</Nav.Link>
            <Nav.Link href="/search">🔍</Nav.Link>
            {/* MyProfile 부분은 만약 로그인 상태가 null이면은 기본 도깨비 이미지, href -> Login
              로그인 상태면은 그 사람 프사 정보 받아서 이미지 띄우고, 클릭시 href-> MyPage
            */}
            {logInStatus === false ? (
              <Nav.Link href="/MyProfile">깨비자리</Nav.Link>
            ) : (
              <Nav.Link href="/MyProfile">프사 자리</Nav.Link>
            )}
            {/* <Nav.Link href="MyProfile">프사 자리</Nav.Link> */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
