import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"

const LoginScreen = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <Container>
      <h1>Sign In</h1>
      <Form>
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
        <Button type="submit" variant="primary" className="mt-3">
          Sign In
        </Button>
      </Form>
    </Container>
  )
}

export default LoginScreen
