import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import Pagination from '../../components/Pagenation/Pagination';
import './PickUpMe.css';



function PickUpMe() {

  const [posts, setPosts] = useState([]);
  const limit = 20;
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;


  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(res => {
        setPosts(res.data)
      })
  }, [])

  return (
    <Container>
      <Row xs={5} md={5} className="g-5">
        {posts.slice(offset, offset + limit).map((post) =>
          <Col>
            <Card key={post.id} className='post-card' >
              <Card.Body>
                <Card.Title>{post.title.length < 12 ? post.title : post.title.slice(0, 13) + '...'}</Card.Title>
                <Card.Text>
                  {post.body.length < 122
                    ? post.body
                    : post.body.slice(0, 122) + '...'}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
      <footer>
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>
    </Container>

  )
}

export default PickUpMe