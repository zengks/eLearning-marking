import { useEffect, useState } from "react"
import { Container, Form, Button, Row, Col } from "react-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import { setUserInfo } from "../reducers/auth/authSlice"
import { useLoginMutation } from "../reducers/auth/userSlice"
import Loading from "../components/Loading"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { userInfo } = useSelector((state) => state.auth)

  const [login, { isLoading }] = useLoginMutation()

  useEffect(() => {
    if (userInfo && !userInfo.isAdmin) {
      navigate(`/assignments/${userInfo._id}`)
    } else if (userInfo && userInfo.isAdmin) {
      navigate(`/instructor`)
    }
  }, [navigate, userInfo])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await login({ email, password }).unwrap()
      dispatch(setUserInfo({ ...res }))
      navigate("/")
      toast.success("Successfully Logged in!")
    } catch (error) {
      toast.error("Invalid email or password, please try again!")
    }
  }

  return (
    <Container style={{ width: "500px", margin: "2rem auto" }}>
      <Row>
        <Col sm={12}>
          <h1 className="mt-3">Sign In</h1>
          <Form onSubmit={handleSubmit} className="mt-5">
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
            {isLoading && <Loading />}
            <Button type="submit" variant="primary" className="mt-3">
              Sign In
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default LoginScreen
