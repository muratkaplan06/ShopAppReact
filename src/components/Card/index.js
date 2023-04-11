import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { TbCurrencyDollar } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import './Style.css'
import { useAuth } from '../../context/AuthContext'
import { useState, useEffect } from 'react'
import { fetchIsAdded, fetchAddBasket, fetchDeleteinBasket } from '../../Api'
import { BsFillCartCheckFill } from 'react-icons/bs'

function ProductCard({ product }) {
  const { loggedIn } = useAuth()
  const [isAddedBasket, setIsAddedBasket] = useState(false)

  useEffect(() => {
    // fetchIsAdded(product.id).then((dt) => {
    //   setIsAddedBasket(dt.data)
    // })
  }, [product.id])
  return (
    <Card style={{ width: '15rem', height: '10rem' }}>
      <Link to={`/${product.id}`}>
        <Card.Img
          variant="top"
          src={product.image1}
          width="250rem"
          height="300rem"
        />
      </Link>
      <Card.Body style={{ background: '#EEEEEE' }}>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.price}
          <TbCurrencyDollar />
        </Card.Text>
        {loggedIn &&
          (isAddedBasket ? (
            <Button
              variant="success"
              onClick={() => {
                fetchDeleteinBasket(product.id)
                setIsAddedBasket(false)
              }}
            >
              <span>
                <BsFillCartCheckFill style={{ fontSize: '1.2rem' }} />
              </span>
              <span> Added to Basket</span>
            </Button>
          ) : (
            <Button
              variant="secondary"
              type="button"
              onClick={() => {
                fetchAddBasket(product.id)
                setIsAddedBasket(true)
              }}
            >
              Add to Basket
            </Button>
          ))}
      </Card.Body>
    </Card>
  )
}

export default ProductCard
