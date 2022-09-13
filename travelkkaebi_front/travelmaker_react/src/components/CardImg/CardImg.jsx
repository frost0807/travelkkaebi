import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import Card from "react-bootstrap/Card";
import CardGroup from "react-bootstrap/CardGroup";
import { review } from "../../config";

import Img1 from ".//CardImg1.jpg";
import Img2 from ".//CardImg2.jpg";
import Img3 from ".//CardImg3.jpg";
import Img4 from ".//CardImg4.jpg";

// 이미지 사이즈 일괄 조정하기 추가

// 하단에 작성한 보령 머드 축제를 다녀오고서 이하 등등은 임시로 적은것
// 추후에는 백엔드에서 보내주는 props를 받는 것으로 작성

function CardImg() {
  const [hotReviewArr, setHotReviewArr] = useState([]);

  useEffect(() => {
    const getHotReview = axios
      .get(review + "/selectallgood")
      .then((reslist) => {
        console.log("reviewArr", reslist);
        setHotReviewArr(reslist.data);
      })
      .catch((error) => {
        if (error.res) {
          console.log(error.res);
          console.log("server responded");
          alert("axios 에러");
        } else if (error.request) {
          console.log("network error");
          alert("server 에러");
        } else {
          console.log(error);
        }
      });
  }, []);

  return (
    <div style={{ width: "70%", margin: "auto" }}>
      <h2
        style={{
          fontFamily: "SUIT ExtraBold",
          fontSize: "1.875em",
          marginBottom: "30px",
        }}
      >
        유저 리뷰 Top4
      </h2>
      <CardGroup>
        {hotReviewArr?.map((element, index) => (
          <Card key={index}>
            <Card.Img variant="top" src={element.reviewImgUrl} />
            <Card.Body>
              <Card.Title as="a" href="CardImg1">
                보령 머드 축제를 다녀오고서
              </Card.Title>
              <Card.Text>작성자 : 카리공주</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">7분전 업로드</small>
            </Card.Footer>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
}

export default CardImg;
