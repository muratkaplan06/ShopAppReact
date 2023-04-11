import React from 'react'
import { Row, Col, Container, Stack } from 'react-bootstrap'
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import Card from '../../components/Card/index'
import { fetchProductsByCategory } from '../../Api'
function Wears() {
  const [APIData, setAPIData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const categoryId = 1
  //const [query, setQuery] = useState('')

  const handlePageClick = (data) => {
    setCurrentPage(data.selected + 1)
  }

  useEffect(() => {
    fetchProductsByCategory(categoryId, currentPage).then((response) => {
      setAPIData(response.list)
      setTotalPage(Math.ceil(response.totalCount / response.sizePerPage))
    })
  }, [currentPage])
  return (
    <Container className="mt-4" style={{ height: '80vh' }}>
      <Row
        className="justify-content-md-center align-content-md-center"
        style={{ height: '4rem' }}
      >
        <Col md={6}>
          <Stack direction="horizontal" gap={3}>
            {/* <Form.Control
              className="me-auto"
              placeholder="search item..."
              //onChange={(e) => setQuery(e.target.value)}
            /> */}
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

export default Wears
