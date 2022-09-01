import { Container } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import axios from "axios";
import Paging from "../../components/Pagenation/Pagination";
import "./JoinMe.css";
import { Button } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { API_BASE_URL } from "../../config";
import LikeBtn from "../../components/Like/LikeBtn";
import Modal from "../../components/Modal/Modal";
import { useRecoilState } from "recoil";
import { isModalOpenState } from "../../recoil/atom";
import Login from "../../components/Login/Login";
import JoinMeDetail from "./JoinMeDetail";

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
      const fetchAxios = await axios.all([
        axios.get('https://jsonplaceholder.typicode.com/posts'),
        axios.get('API_BASE_URL')]
        .then(axios.spread(
          (res1, res2) => {
            setPosts(res1.data)
            if (res.data.type === false) setLike(true)
          }
        ))
      )
    }

    fetchPost();
  }, [])
*/

  // modal
  const [isModalOpen, setIsModalOpen] = useRecoilState(isModalOpenState);

  const toggleModal = (target) => {
    console.log("모달온오프");
    setIsModalOpen((e) => target);
  };

  const modalType = {
    Login: {
      component: <Login />,
    },
    JoinMeDetail: {
      component: <JoinMeDetail />,
    },
  };

  // 글쓰기 Page (noModal)
  const joinMeFormhandler = () => {
    navigate("/joinmeform");
  };

  return (
    <Container>
      <Button onClick={joinMeFormhandler}>글쓰기</Button>
      <Button onClick={() => toggleModal("Login")}>로그인</Button>
      <Row xs={5} md={5} className="g-5">
        {posts.slice(offset, offset + limit).map((post) => (
          <Col>
            <Card
              key={post.id}
              className="post-card"
              onClick={() => toggleModal("JoinMeDetail")}
            >
              <Card.Body>
                <Card.Title>
                  {post.id},
                  {post.title.length < 12
                    ? post.title
                    : post.title.slice(0, 13) + "..."}
                  <span style={{ fontSize: "0.3rem" }}>
                    {" "}
                    <i className="fa-solid fa-eye" />
                    &nbsp;30
                  </span>
                </Card.Title>
                <Card.Text>
                  {post.body.length < 122
                    ? post.body
                    : post.body.slice(0, 122) + "..."}
                </Card.Text>
              </Card.Body>
              <div className="heart-btn">
                <LikeBtn /> <p>좋아요 수</p>
              </div>
              <div>아바타요</div>
              <span> 닉네임이요 </span>
              <p> CreateTime </p>
            </Card>
          </Col>
        ))}
      </Row>
      <footer>
        <Paging />
      </footer>
      {isModalOpen && <Modal {...modalType[isModalOpen]} />}
    </Container>
  );
}

export default JoinMe;
