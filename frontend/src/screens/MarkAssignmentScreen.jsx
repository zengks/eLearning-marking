import { Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import { useGetAssignmentsQuery } from "../reducers/assignment/studentAnswerSlice"

import QuestionCard from "../components/QuestionCard"

const MarkAssignmentScreen = () => {
  const [studentAssignments, setStudentAssignments] = useState([])
  const { studentId } = useParams()

  const { data: assignments } = useGetAssignmentsQuery()

  useEffect(() => {
    if (assignments) {
      setStudentAssignments(
        assignments.submittedAssignment.filter((a) => a.studentId === studentId)
      )
    }
  }, [assignments, studentId])

  return (
    <Container>
      {studentAssignments.length === 0 ? (
        <h2 className="text-center mt-5">
          No submitted assignment yet... Check back later
        </h2>
      ) : (
        <>
          {studentAssignments.map((each) => (
            <QuestionCard question={each} key={each._id} studentId />
          ))}
        </>
      )}
    </Container>
  )
}
export default MarkAssignmentScreen
