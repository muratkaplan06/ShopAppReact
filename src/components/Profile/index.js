import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Stack from 'react-bootstrap/Stack'
import { Link } from 'react-router-dom'

function Profile() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = async () => {
    logout()
    navigate('/products')
  }

  if (user == null) {
    return <div>Loading</div>
  }

  const userData = user.data
  return (
    <Container>
      <Row className="mx-auto mt-2">
        <Col md={3} style={{ borderStyle: 'groove' }}>
          <Card
            bg={'light'}
            text={'dark'}
            style={{ width: '18rem' }}
            className="my-4"
          >
            <Card.Header>Profile</Card.Header>
            <Card.Body>
              <Card.Title>
                {userData.firstName} {userData.lastName} <hr />
                {userData.email}
                <div>
                  <Button
                    variant="danger"
                    className="my-2 mx-auto"
                    onClick={handleLogout}
                  >
                    Çıkış Yap
                  </Button>
                </div>
              </Card.Title>
              <Card.Text></Card.Text>
            </Card.Body>
          </Card>
          <Stack gap={2} className="col-md-12 mx-auto p-2">
            <Link to="/basket">
              <Button variant="outline-secondary" style={{ width: '100%' }}>
                Basket
              </Button>
            </Link>
            <Button variant="outline-secondary">My Addresses</Button>
            <Button variant="outline-secondary">My Cards</Button>
            <Button variant="outline-secondary">My Personal Information</Button>
            <Button variant="outline-secondary">Help</Button>
          </Stack>
        </Col>
        <Col md={9} style={{ borderStyle: 'groove' }}>
          <Card className="mx-auto my-2 p-1">
            <Card.Header>Orders</Card.Header>
            <Card.Body>
              <Card.Title></Card.Title>
              <Card.Text>There is no orders now</Card.Text>
              <Link to="/">
                <Button variant="secondary">start shopping</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile
