import { Outlet, Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import NavDropdown from 'react-bootstrap/NavDropdown'
import Button from 'react-bootstrap/Button'
import './Styles.css'
import { useAuth } from '../../context/AuthContext'
import { MdAddShoppingCart } from 'react-icons/md'
import { MdSwitchAccount } from 'react-icons/md'

const Layout = () => {
  const { loggedIn } = useAuth()

  return (
    <>
      <Navbar collapseOnSelect expand="lg" className="color-nav sticky-top">
        <Container>
          <Navbar.Brand>
            <Button>
              <Link to="/products">
                <h2>Logo</h2>
              </Link>
            </Button>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products">Products</Nav.Link>
            </Nav>
            <Nav>
              {!loggedIn && (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link eventKey={2} href="/register">
                    Register
                  </Nav.Link>
                </>
              )}

              {loggedIn && (
                <>
                  <Nav.Link href="/basket">
                    <MdAddShoppingCart />
                    Basket
                  </Nav.Link>

                  <Nav.Link href="/profile">
                    <MdSwitchAccount />
                    Profile
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  )
}

export default Layout
