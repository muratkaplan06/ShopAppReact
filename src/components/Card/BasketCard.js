//import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { BsFillTrash3Fill } from 'react-icons/bs'
import { TbCurrencyDollar } from 'react-icons/tb'
import { fetchDeleteinBasket } from '../../Api'

function BasketCard({ product }) {
  console.log(product)
  return (
    <Card>
      <Card.Header as="h5">
        {product.price}
        <TbCurrencyDollar />
      </Card.Header>
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>{product.description}</Card.Text>
        <Button
          variant="danger"
          onClick={() => {
            fetchDeleteinBasket(product.id)
          }}
        >
          <BsFillTrash3Fill />
        </Button>
      </Card.Body>
    </Card>
  )
}

export default BasketCard
