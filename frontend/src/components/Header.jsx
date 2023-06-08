import { Navbar, Nav, Container } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa"

import bcitLogo from "../assets/bcitLogo.png"
import "../styles/header.css"

const Header = () => {
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={bcitLogo} alt="bcit logo" />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="menu-bar" />
          <Navbar.Collapse id="menu-bar">
            <Nav className="ms-auto">
              <LinkContainer to="/register">
                <Nav.Link>
                  <FaSignInAlt />
                  Register
                </Nav.Link>
              </LinkContainer>
              <LinkContainer to="/login">
                <Nav.Link>
                  <FaUserPlus />
                  Log In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
