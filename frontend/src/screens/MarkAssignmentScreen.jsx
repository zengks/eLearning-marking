import { Button, Container } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { Card, Form } from "react-bootstrap"
import { toast } from "react-toastify"

import { useGetAssignmentsQuery } from "../reducers/assignment/studentAnswerSlice"
import { useUpdateAssignmentMutation } from "../reducers/assignment/studentAnswerSlice"

import QuestionCard from "../components/QuestionCard"

import "../styles/markAssignmentScreen.css"

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
      {studentAssignments.map((each) => (
        <QuestionCard question={each} key={each._id} studentId />
      ))}
    </Container>
  )
}
export default MarkAssignmentScreen
