import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaUserPlus,
  FaUserAlt,
} from "react-icons/fa"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import bcitLogo from "../assets/bcitLogo.png"
import { useLogoutMutation } from "../reducers/auth/userSlice"
import { logout } from "../reducers/auth/authSlice"

import "../styles/header.css"

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [logoutUser] = useLogoutMutation()

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap()
      dispatch(logout())
      navigate("/")
      toast.success("Logged out successfully!")
    } catch (error) {
      console.log(error)
      toast.error("Failed to log out, please try again!")
    }
  }

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
              {userInfo ? (
                <>
                  <NavDropdown
                    title={`${userInfo.firstName} ${userInfo.lastName}`}
                  >
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <FaUserAlt />
                        Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={handleLogout}>
                      <FaSignOutAlt />
                      Log Out
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                <>
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
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}

export default Header
