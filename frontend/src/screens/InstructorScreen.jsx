import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap"
import { useEffect, useState } from "react"

import { useGetStudentsQuery } from "../reducers/auth/userSlice"
import { useGetAssignmentsQuery } from "../reducers/assignment/studentAnswerSlice"
import { LinkContainer } from "react-router-bootstrap"

const InstructorScreen = () => {
  const [allStudents, setAllStudents] = useState([])
  const [allSubmittedAssignments, setaAllSubmittedAssignments] = useState([])

  const { data: students } = useGetStudentsQuery()
  const { data: assignments } = useGetAssignmentsQuery()

  useEffect(() => {
    if (students && assignments) {
      setAllStudents(students.students)
      setaAllSubmittedAssignments(assignments.submittedAssignment)
    }
  }, [assignments, students])

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        {allStudents.map((student) => (
          <Col sm={12} md={6} key={student._id}>
            <Card>
              <Card.Body>
                <Card.Title>
                  Name: {`${student.firstName} ${student.lastName}`}
                </Card.Title>
                <Card.Subtitle>ID: {student._id}</Card.Subtitle>
                <Card.Text>Submitted Assignments:</Card.Text>
                <ListGroup>
                  {allSubmittedAssignments.map((each) => {
                    if (each.studentId === student._id) {
                      return (
                        <ListGroup.Item key={each._id}>
                          {each.questionNumber}: <strong>Submitted</strong>
                        </ListGroup.Item>
                      )
                    }
                  })}
                </ListGroup>
                <LinkContainer to={`/instructor/assignments/${student._id}`}>
                  <Button className="my-3" variant="primary">
                    Start Marking
                  </Button>
                </LinkContainer>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default InstructorScreen
