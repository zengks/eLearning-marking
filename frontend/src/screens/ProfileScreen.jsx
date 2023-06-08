import { useSelector } from "react-redux"
import { Container, Card } from "react-bootstrap"

const ProfileScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return (
    <Container>
      <h1>Profile</h1>
      <Card style={{ width: "500px", margin: "0 auto" }}>
        <Card.Body>
          <Card.Title style={{ fontSize: "2rem" }}>
            <strong>{`${userInfo.firstName} ${userInfo.lastName}`}</strong>
          </Card.Title>
          <Card.Text>
            <strong>Email</strong>: {userInfo.email}
          </Card.Text>
          <Card.Text>
            <strong>User Role</strong>:
            {userInfo.isAdmin ? " Instructor" : " Student"}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default ProfileScreen
