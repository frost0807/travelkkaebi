import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { regionevent } from "../../config";

import Img1 from ".//CardImg1.jpg";
import Img2 from ".//CardImg2.jpg";
import Img3 from ".//CardImg3.jpg";
import Img4 from ".//CardImg4.jpg";

// import "./CarouselHome.css";

function CarouselHome() {
  const [latestRegionEvnetArr, setLatestRegionEventArr] = useState([]);

  useEffect(() => {
    const getRegionEvent = axios
      .get(regionevent + "/home", null)
      .then((reslist) => {
        console.log("res", reslist);
        setLatestRegionEventArr(reslist.data);
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
    <Carousel>
      {latestRegionEvnetArr.map((element, index) => (
        <Carousel.Item key={index}>
          <img
            style={{ width: "500px", height: "800px" }}
            className="d-block w-100"
            src={element.posterImageUrl}
            alt=""
          />
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default CarouselHome;
