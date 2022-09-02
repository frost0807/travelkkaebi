import React, { useEffect, useState } from "react";
import axios from "axios";
import Paging from "../../components/Pagenation/Pagination";
import "./JoinMe.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { API_BASE_URL } from "../../config";
import LikeBtn from "../../components/Like/LikeBtn";

import { useRecoilState } from "recoil";
import {
  isLoginModalState,
  isLoginState,
  showJoinMeDetailState,
} from "../../recoil/atom";
import Login from "../../components/Login/Login";
import JoinMeDetail from "./JoinMeDetail";
import Logo from "../../images/basicLogo.png";
import { getToken, getUsername } from "../../util";
import JoinMeForm from "./JoinMeForm";
import JoinMeCard from "./JoinMeCard";
import styled from "styled-components";
import joinmebanner from "../../images/banner/joinme_banner.jpg";

function JoinMe() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [limit] = useState(20);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios
        .get("https://jsonplaceholder.typicode.com/posts")
        .then((res) => {
          setPosts(res.data);
        });
    };

    fetchPost();
  }, []);

  /*
  useEffect(() => {
    const fetchPost = async () => {
      const fetchAxios = await axios.get(API_BASE_URL+"selectallbypage" +page)
        .then(res => {
            setPosts(res1.data)
          }
        ))
      )
    }

    fetchPost();
  }, [])
*/

  //pagenation

  // modal
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);
  const [isLogin, setIsLoginState] = useRecoilState(isLoginState);
  const loginModal = () => {
    setIsLoginModalOpen(true);
  };

  const [showJoinMeDetail, setShowJoinMeDetail] = useRecoilState(
    showJoinMeDetailState
  );
  const toggleModal = () => {
    setShowJoinMeDetail(true);
  };

  return (
    <MainContent>
      <header className="instructor_banner">
        <div className="header-bncontainer">
          <div className="ins-banner-cover">
            <h1 className="bannername"> 같이 가요 !</h1>
            <p> 꿈같은 여행에 같이 떠날 친구들을 만나보세요.</p>
            <br />
            <p>더 행복한 여행이 될 거예요 !</p>
          </div>
        </div>
      </header>
      <Content>
        <ContentBody>
          <Button
            onClick={() => {
              {
                isLogin ? navigate("/joinmeform") : loginModal();
              }
            }}
          >
            글쓰기
          </Button>
          {isLoginModalOpen && <Login />}

          <View>
            {posts.slice(offset, offset + limit).map((post) => (
              <JoinMeCard key={post.id} post={post} />
            ))}
            <footer
              style={{
                display: "flex",
                position: "relative",
                width: "100%",
                marginTop: "2rem",
                textAlign: "center",
                justifyContent: "center",
                fontWeight: 100,
              }}
            >
              <Paging />
            </footer>
          </View>
        </ContentBody>
      </Content>
    </MainContent>
  );
}

export default JoinMe;

const MainContent = styled.main`
  min-height: 800px;
  box-sizing: inherit;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
`;

const Content = styled.div`
  max-width: 1400px;
  margin: auto;
  padding: 0 2rem;
  flex-grow: 1;
  position: relative;
  width: auto;
  display: block;
  box-sizing: inherit;
  color: #000a12;
`;
const ContentBody = styled.div`
  width: 100%;
  margin-top: 2rem;
  box-sizing: inherit;
`;
const View = styled.div`
  width: 100%;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  display: grid;
  box-sizing: inherit;
`;
