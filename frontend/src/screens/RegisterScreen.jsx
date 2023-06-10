import { useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"

import { setUserInfo } from "../reducers/auth/authSlice"
import { useRegisterMutation } from "../reducers/auth/userSlice"
import Loading from "../components/Loading"

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [register, { isLoading }] = useRegisterMutation()

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      navigate("/login")
    }
  }, [navigate, userInfo])

  const handleChange = (e) => {
    e.persist()
    e.target.value === "instructor" ? setIsAdmin(true) : setIsAdmin(false)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      toast.warn("Passwords do not match")
    } else {
      try {
        const res = await register({
          firstName,
          lastName,
          email,
          password,
          isAdmin,
        }).unwrap()
        dispatch(setUserInfo({ ...res }))
        navigate("/")
        toast.success("Register successfully!")
      } catch (error) {
        console.log(error)
        toast.error("Failed to register, please try again!")
      }
    }
  }

  return (
    <Container className="d-flex flex-column align-items-center">
      <h1>Enter New Student's Information</h1>
      <Form onSubmit={handleSubmit} className="w-25 mt-3">
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            value={firstName}
            placeholder="Enter first name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            value={lastName}
            placeholder="Enter last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>BCIT Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            value={confirmPassword}
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>What is your role?</Form.Label>
          <Form.Check
            type="radio"
            name="checkRole"
            value="student"
            label="Student"
            aria-label="student"
            onChange={handleChange}
          />
          <Form.Check
            type="radio"
            name="checkRole"
            aria-label="instructor"
            value="instructor"
            label="Instructor"
            onChange={handleChange}
          />
        </Form.Group>
        {isLoading && <Loading />}
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default RegisterScreen
