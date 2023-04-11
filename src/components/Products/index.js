import React from 'react'
import { useState, useEffect } from 'react'
import './Styles.css'
import Card from '../Card/index'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import ReactPaginate from 'react-paginate'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import { fetchProductList } from '../../Api'
import { Stack, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Products() {
  const [APIData, setAPIData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [query, setQuery] = useState('')

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  useEffect(() => {
    fetchProductList(query, currentPage).then((response) => {
      setAPIData(response.list)
      setTotalPage(Math.ceil(response.totalCount / response.sizePerPage))
    })
  }, [currentPage, query])

  return (
    <Container className="mt-4" style={{ height: '80vh' }}>
      <Row
        className="justify-content-md-center align-content-md-center"
        style={{ height: '4rem' }}
      >
        <Col md={12}>
          <Stack direction="horizontal" gap={3}>
            <Form.Control
              className="me-auto"
              placeholder="search item..."
              onChange={(e) => setQuery(e.target.value)}
            />
            <div className="bg-light border mx-auto">
              <Link to="electronics">
                <Button variant="outline-secondary">Electronics</Button>
              </Link>
            </div>
            <div className="bg-light border">
              <Link to="wears">
                <Button variant="outline-secondary">Wears</Button>
              </Link>
            </div>
            <div className="bg-light border mx-auto">
              <Link to="jewelery">
                <Button variant="outline-secondary">Jewelery</Button>
              </Link>
            </div>
          </Stack>
        </Col>
      </Row>
      <Row xs={1} md={3} lg={4} className="g-4">
        {APIData.map((product) => (
          <Col gap={3} style={{ height: '35rem' }} key={product.id}>
            <Card product={product} />
          </Col>
        ))}
      </Row>
      {APIData.length > 0 && (
        <Row md={12}>
          <ReactPaginate
            previousLabel={'<<'}
            nextLabel={'>>'}
            breakLabel={'...'}
            pageCount={totalPage}
            marginPagesDisplayed={2}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={'pagination justify-content-center'}
            pageClassName={'page-item text-dark px-1'}
            pageLinkClassName={'page-link text-dark'}
            previousLinkClassName={'page-link text-dark'}
            nextLinkClassName={'page-link text-dark'}
            breakLinkClassName={'page-link text-dark'}
            activeClassName={'active'}
          />
        </Row>
      )}
    </Container>
  )
}

export default Products
