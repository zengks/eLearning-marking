import { Button } from "react-bootstrap"
import { useState } from "react"
import { Card, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import { useUpdateAssignmentMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

const QuestionCard = ({ question, studentId }) => {
  const [score, setScore] = useState(0)

  const [updateAssignment] = useUpdateAssignmentMutation()

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await updateAssignment({
        _id: question._id,
        studentId: question.studentId,
        questionNumber: question.questionNumber,
        description: question.description,
        answers: question.answers,
        submitted: question.submitted,
        score: score.toString(),
      }).unwrap()
      console.log(res)
      dispatch(submitAssignment({ ...res }))
    //   navigate(`/assignments/${question._id}`)
      toast.success("Score updated")
    } catch (error) {
      console.log(error)
      toast.error("Failed to update the assignment.")
    }
  }
  return (
    <>
      <Card className="answerCard">
        <Card.Body>
          <Card.Title>{question.questionNumber}</Card.Title>
          {question._id}
          <Card.Subtitle className="description">
            {question.description}
          </Card.Subtitle>
          <Card.Text className="studentAnswer">
            <strong>Student Answers</strong>: {question.answers}
          </Card.Text>
        </Card.Body>
        <Form className="form" onSubmit={handleSubmit}>
          <Form.Group className="score-input">
            <Form.Label>
              <strong>Score</strong>
            </Form.Label>
            <Form.Control
              type="number"
              value={score}
              placeholder="Enter score"
              min={0}
              max={100}
              onChange={(e) => setScore(e.target.value)}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="confirmBtn">
            Confirm
          </Button>
        </Form>
      </Card>
    </>
  )
}

export default QuestionCard
