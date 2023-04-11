import React from 'react'
import BasketCard from '../Card/BasketCard'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TotalPriceCard from '../Card/TotalPriceCard'
import Stack from 'react-bootstrap/Stack'
import { Button } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import { fetchBasketProductList } from '../../Api'
import ReactPaginate from 'react-paginate'
import EmptyBasketCard from '../Card/EmptyBasketCard'

function Basket() {
  const [APIData, setAPIData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [totalPrice, setTotalPrice] = useState(0)
  const [emptyBasket, setEmtyBasket] = useState(true)

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  useEffect(() => {
    fetchBasketProductList(currentPage).then((response) => {
      setAPIData(response.list)
      setTotalPage(Math.ceil(response.totalCount / response.sizePerPage))
      setTotalPrice(response.totalPrice)
      response.totalCount === 0 ? setEmtyBasket(true) : setEmtyBasket(false)
    })
  }, [currentPage, APIData])

  return (
    <Container className="mt-2" style={{ minHeight: '100vh' }}>
      <Row>
        <Col sm={12} md={8}>
          {APIData.map((product) => (
            <BasketCard key={product.id} product={product} />
          ))}
        </Col>
        {emptyBasket && (
          <Col md={12}>
            <EmptyBasketCard />
          </Col>
        )}
        {!emptyBasket && (
          <Col sm={12} md={4}>
            <Stack gap={2} className="col-md-4 mx-auto my-auto">
              <Button variant="warning" className="mt-3 mx-2">
                to pay approve
              </Button>
              <TotalPriceCard totalPrice={totalPrice} />
            </Stack>
          </Col>
        )}
      </Row>
      <Row className="my-2">
        {!emptyBasket && (
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item px-1  text-primary'}
            pageLinkClassName={'page-link text-primary'}
            previousLinkClassName={'page-link text-primary'}
            nextLinkClassName={'page-link text-primary'}
            breakLinkClassName={'page-link text-primary'}
            activeClassName={'active'}
          />
        )}
      </Row>
    </Container>
  )
}

export default Basket
