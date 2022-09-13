import Container from "react-bootstrap/Container"; // 부트스트랩 콘테이너
import Nav from "react-bootstrap/Nav"; // 부트스트랩 Nav
import Navbar from "react-bootstrap/Navbar"; // 부트스트랩 Navbar
import NavDropdown from "react-bootstrap/NavDropdown"; // 부트스트랩 드롭다운
import Button from "react-bootstrap/Button";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoSrc from ".//Logo.png"; // 좌상단 대표로고 이미지 삽입
import styled from "styled-components"; // styled-components
import { Accordion } from "react-bootstrap";
import { LoginSharp } from "@mui/icons-material";
import Login from "../Login/Login";
import { isLoginModalState, isLoginState } from "../../recoil/atom";
import { is_logged } from "../../util";
import { useRecoilState } from "recoil";
import Register from "../../pages/Register/Register";

//import Login from './Login/Login'; // 로그인

const Logo = styled.img`
  // 로고 이미지
  width: 200px;
  margin-right: 30px;
`;

function Header() {
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);
  // 헤더 펑션
  const login = () => {
    setIsLoginModalOpen(true);
  };

  const logout = () => {
    localStorage.clear();
    window.location.replace("http://localhost:3000/");
  };

  return (
    <Navbar
      bg="white"
      expand="lg"
      style={{
        padding: "5px 0 5px 0",
        borderTop: "solid 1px",
        borderTopColor: "lightgrey",
        borderBottom: "solid 1px",
        borderBottomColor: "lightgrey",
        marginLeft: "0px",
        position: "sticky",
        top: "0px",
        zIndex: "3",
      }}
    >
      <Container>
        <a href="/">
          <Logo
            style={{
              marginLeft: "100px",
              marginTop: "10px",
              marginBottom: "10px",
            }}
            src={LogoSrc}
          />
        </a>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <div style={{ color: "black" }}>
            <Nav
              style={{ marginLeft: "30px", fontSize: "16px" }}
              className="me-auto"
            >
              <Nav.Link href="/contact">전국팔도 깨비?</Nav.Link>
              <NavDropdown
                style={{ marginLeft: "30px", marginRight: "30px" }}
                title="여행"
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item href="/joinme/1">같이가요</NavDropdown.Item>
                <NavDropdown.Item href="/pickme/0">
                  데려가주세요
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/mytravel/1">내 여행</NavDropdown.Item>
              </NavDropdown>
              <NavDropdown title="정보" id="basic-nav-dropdown">
                <NavDropdown.Item href="/editor/1">
                  에디터 추천
                </NavDropdown.Item>
                <NavDropdown.Item href="/regionevent">
                  지역별 축제
                </NavDropdown.Item>
                <NavDropdown.Item href="/review/1">유저 리뷰</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </div>
        </Navbar.Collapse>
        <div style={{ marginLeft: "200px" }}>
          {!is_logged ? (
            <Button
              style={{ border: "none" }}
              variant="outline-dark"
              title="로그인"
              onClick={login}
            >
              <LoginIcon />
            </Button>
          ) : (
            <Button
              style={{ border: "none" }}
              variant="outline-dark"
              title="로그아웃"
              onClick={logout}
            >
              <LogoutIcon />
            </Button>
          )}
          <Button
            style={{ border: "none", marginLeft: "10px" }}
            variant="outline-dark"
            title="회원가입"
            href="/register"
          >
            <AssignmentIcon />
          </Button>
        </div>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav style={{ marginLeft: "50px" }}>
            {/* MyProfile 부분은 만약 로그인 상태가 null이면은 기본 도깨비 이미지, href -> Login
              로그인 상태면은 그 사람 프사 정보 받아서 이미지 띄우고, 클릭시 href-> MyPage
            */}
            {!is_logged ? (
              <img
                src="https://whdcksbucket.s3.ap-northeast-2.amazonaws.com/static/defaultProfile.png"
                width="50px"
                style={{ borderRadius: "50%" }}
                alt=""
              />
            ) : (
              <NavDropdown
                title={
                  <img
                    src={localStorage.getItem("profileImageUrl")}
                    width="50px"
                    style={{ borderRadius: "50%" }}
                    alt=""
                  />
                }
              >
                <NavDropdown.Item>마이페이지</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item>내 신청서</NavDropdown.Item>
                <NavDropdown.Item href="/mypage/apply/list">
                  내게 온 신청서
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
      {isLoginModalOpen && <Login />}
    </Navbar>
  );
}

export default Header;
