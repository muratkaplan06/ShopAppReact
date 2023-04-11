import React from 'react'
import Card from 'react-bootstrap/Card'
import { TbCurrencyDollar } from 'react-icons/tb'

function TotalPriceCard({ totalPrice }) {
  return (
    <Card bg={'Light'.toLowerCase()} text={'Dark'} style={{ width: '18rem' }}>
      <Card.Header>order summary</Card.Header>
      <Card.Body>
        <Card.Title> basket amount </Card.Title>
        <Card.Text>
          <b>Total Price:</b>
          <span className="px-1" style={{ color: 'green' }}>
            <b>{totalPrice}</b>
          </span>
          <TbCurrencyDollar />
        </Card.Text>
      </Card.Body>
    </Card>
  )
}

export default TotalPriceCard
