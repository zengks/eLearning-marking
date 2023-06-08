import { useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
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
    if (userInfo) {
      navigate("/")
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
    <Container>
      <h1>Sign In</h1>
      <Form onSubmit={handleSubmit}>
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
    </Container>
  )
}

export default LoginScreen
