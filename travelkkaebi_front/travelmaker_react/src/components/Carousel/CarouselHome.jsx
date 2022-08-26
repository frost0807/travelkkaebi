import Carousel from 'react-bootstrap/Carousel';

import Img1 from './/CardImg1.jpg';
import Img2 from './/CardImg2.jpg';
import Img3 from './/CardImg3.jpg';
import Img4 from './/CardImg4.jpg';

function CarouselHome() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          height={300}
          width={"60%"}
        
          className="d-block w-100"
          src={Img1}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height={300}
          width={"60%"}
          className="d-block w-100"
          src={Img2}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          height={300}
          width={"60%"}
          className="d-block w-100"
          src={Img3}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default CarouselHome;