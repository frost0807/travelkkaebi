import Carousel from 'react-bootstrap/Carousel';

import Img1 from './/CardImg1.jpg';
import Img2 from './/CardImg2.jpg';
import Img3 from './/CardImg3.jpg';
import Img4 from './/CardImg4.jpg';

// import "./CarouselHome.css";

function CarouselHome() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          
          // style={{height:"400px", width:"600px"}}
          className="d-block w-100"
          src={Img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>보령 머드 축제</h3>
          <p>2022.07 ~ 2022.08</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          
          className="d-block w-100"
          src={Img2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>부산 조선통신사 축제</h3>
          <p>2022.08 ~ 2022.09</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          
          className="d-block w-100"
          src={Img3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>서울 가요축제</h3>
          <p>
            2022.08 ~ 2022.09
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;