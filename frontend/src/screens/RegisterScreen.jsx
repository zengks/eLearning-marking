import { useState } from "react"
import { Container, Form, Button } from "react-bootstrap"

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isAdmin, setIsAdmin] = useState(false)

  const handleChange = (e) => {
    e.persist()
    e.target.value === "instructor" ? setIsAdmin(true) : setIsAdmin(false)
  }

  return (
    <Container>
      <h1>Sign In</h1>
      <Form>
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
        <Button type="submit" variant="primary" className="mt-3">
          Register
        </Button>
      </Form>
    </Container>
  )
}

export default RegisterScreen
