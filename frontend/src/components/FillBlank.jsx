import { Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { useGetAssignmentsQuery } from "../reducers/assignment/studentAnswerSlice"
import { useAddAnswerMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

import "../styles/question.css"

const FillBlank = ({ question, index, studentId }) => {
  const [answer, setAnswer] = useState("")
  const [assignmentNumber, setAssignmentNumber] = useState(0)
  const [submittedAssignment, setSubmittedAssignment] = useState([])
  const [curScore, setCurScore] = useState("N/A")

  const { userInfo } = useSelector((state) => state.auth)
  const { data: assignments } = useGetAssignmentsQuery()
  const [addAnswer] = useAddAnswerMutation()

  const dispatch = useDispatch()

  useEffect(() => {
    setAssignmentNumber((index + 1).toString())
    if (assignments) {
      const submitted = assignments.submittedAssignment.filter(
        (a) => a.studentId === studentId
      )
      const q = submitted.filter(
        (each) => each.questionNumber === `Assignment ${index + 1}`
      )
      if (q.length > 0) {
        setCurScore(q[0].score)
        setSubmittedAssignment(q[0])
        setAnswer(q[0].answers)
      }
    }
  }, [assignments, index, studentId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await addAnswer({
        studentId: userInfo._id,
        questionNumber: assignmentNumber,
        description: question.description,
        answers: answer,
        submitted: true,
        score: "Not Marked Yet",
      }).unwrap()
      dispatch(submitAssignment({ ...res }))
      setCurScore(res.score)
      toast.success(
        `Assignment ${assignmentNumber} has been submitted successfully.`
      )
    } catch (error) {
      console.log(error)
      toast.error("Failed to submit.")
    }
  }

  const checkAnswerFormat = (text) => {
    const pattern = /^[a-zA-Z]+\s[a-zA-Z]+\s[0-9]+$/g
    return pattern.test(text) ? true : false
  }

  return (
    <Form className="question" onSubmit={handleSubmit}>
      <p className="assignment">Assignment {index + 1}</p>
      <Form.Group>
        <Form.Label>
          <p className="title">{question.description}</p>
        </Form.Label>
        <Form.Control
          type="text"
          value={
            submittedAssignment.length > 0
              ? submittedAssignment[0].answers
              : answer
          }
          name="answer"
          placeholder="Type your answer here"
          onChange={(e) => setAnswer(e.target.value)}
          className="input-blank"
        />
        <div className="input-format">
          <p>*** ONLY accept the following particular format ***</p>
          <p>
            [alphabetical letters][1 blank space][alphabetical letters][1 blank
            space][numbers]
          </p>
        </div>
      </Form.Group>
      <div className="studentButton">
        <p className="score">
          <strong>Score: </strong>
          {curScore}
        </p>
        {curScore === "Not Marked Yet" || !isNaN(curScore) ? (
          <Button type="submit" variant="primary" className="mt-3" disabled>
            Submitted
          </Button>
        ) : (
          <Button
            type="submit"
            variant="primary"
            className="mt-3"
            disabled={!checkAnswerFormat(answer)}
          >
            Submit Now
          </Button>
        )}
      </div>
    </Form>
  )
}

export default FillBlank
