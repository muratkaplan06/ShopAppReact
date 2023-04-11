import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useAuth } from '../../context/AuthContext'
import { BsFillCartCheckFill } from 'react-icons/bs'
import { TbCurrencyDollar } from 'react-icons/tb'
import {
  fetchProductById,
  fetchIsAdded,
  fetchAddBasket,
  fetchDeleteinBasket,
} from '../../Api'
import { useState, useEffect } from 'react'

import Carousel from 'react-bootstrap/Carousel'

function ProductDetail() {
  const { loggedIn } = useAuth()
  const { productId } = useParams()
  const { isLoading, error, data } = useQuery(['product', productId], () =>
    fetchProductById(productId),
  )
  const [isAddedBasket, setIsAddedBasket] = useState(false)
  useEffect(() => {
    fetchIsAdded(productId).then((dt) => {
      console.log(dt.data)
      setIsAddedBasket(dt.data)
    })
  }, [productId])

  if (isLoading) return 'Loading...'

  if (error) return 'An error has occurred: ' + error.message

  return (
    <section>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            {/* <img className="card-img-top" src={data.image} alt="loading..." /> */}
            <Carousel variant="dark">
              <Carousel.Item interval={1000}>
                <img
                  className="d-block w-100 my-4"
                  src={data.image1}
                  height="650 rem"
                  alt="First slide"
                />
                <Carousel.Caption>
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 my-4"
                  src={data.image2}
                  height="700rem"
                  alt="Second slide"
                />
                <Carousel.Caption>
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100 my-4"
                  src={data.image3}
                  height="700rem"
                  alt="Third slide"
                />
                <Carousel.Caption>
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>
          <div className="col-md-6">
            <div className="small mb-1">{data.categoryName}</div>
            <h1 className="display-5 fw-bolder">{data.name}</h1>
            <div className="fs-5 mb-5">
              <span>
                {data.price}
                <TbCurrencyDollar />
              </span>
            </div>
            <p className="lead">{data.description}</p>
            <div className="d-flex">
              {loggedIn &&
                (isAddedBasket ? (
                  <button
                    className="btn btn-success btn-sm follow"
                    onClick={() => {
                      fetchDeleteinBasket(productId)
                      setIsAddedBasket(false)
                    }}
                  >
                    <span>
                      <BsFillCartCheckFill style={{ fontSize: '1.2rem' }} />
                    </span>
                    <span> Added to Basket</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-outline-dark flex-shrink-0"
                    type="button"
                    onClick={() => {
                      fetchAddBasket(productId)
                      setIsAddedBasket(true)
                    }}
                  >
                    Add to Basket
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
