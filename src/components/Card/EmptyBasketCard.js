import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { BsFillCartXFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'

function EmptyBasketCard() {
  return (
    <Card>
      <Card.Header as="h5"></Card.Header>
      <Card.Body>
        <Card.Title>
          <BsFillCartXFill />
        </Card.Title>
        <Card.Text>
          <b>There are no products in your Basket</b>
        </Card.Text>
        <Button variant="primary">
          <Link to="/">Continue Shopping</Link>
        </Button>
      </Card.Body>
    </Card>
  )
}

export default EmptyBasketCard
