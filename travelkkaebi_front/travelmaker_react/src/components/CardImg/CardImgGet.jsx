import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import Img1 from './/CardImg1.jpg';
import Img2 from './/CardImg2.jpg';
import Img3 from './/CardImg3.jpg';
import Img4 from './/CardImg4.jpg';


// 이미지 사이즈 일괄 조정하기 추가

// 하단에 작성한 보령 머드 축제를 다녀오고서 이하 등등은 임시로 적은것
// 추후에는 백엔드에서 보내주는 props를 받는 것으로 작성

function CardImgGet() {
  return (
    <CardGroup style={{marginLeft:'100px', marginRight:'100px'}}>
      <Card >
        <Card.Img variant="top" src={ Img1 } />
        <Card.Body>
          <Card.Title as="a" href="CardImg1">보령 머드 축제를 다녀오고서</Card.Title>
          <Card.Text>
            작성자 : 카리공주
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">7분전 업로드</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={ Img2 } />
        <Card.Body>
          <Card.Title as="a" href="CardImg2">부산 조선통신사 후기</Card.Title>
          <Card.Text>
            작성자 : e의2승
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">17분전 업로드</small>
        </Card.Footer>
      </Card>
      <Card>
        <Card.Img variant="top" src={ Img3 } />
        <Card.Body>
          <Card.Title as="a" href="CardImg3">서울 재즈 페스티발</Card.Title>
          <Card.Text>
            작성자 : 천지삐까리
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">22분전 업로드</small>
        </Card.Footer>
      </Card>

      <Card>
        <Card.Img variant="top" src={ Img4 } />
        <Card.Body>
          <Card.Title as="a" href="CardImg4">횡성 더덕 축제를 다녀왔읍니다^^.</Card.Title>
          <Card.Text>
            작성자 : 2호선러버
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">1시간전 업로드</small>
        </Card.Footer>
      </Card>
    </CardGroup>
  );
}

export default CardImgGet;