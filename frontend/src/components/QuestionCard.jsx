import { Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { Card, Form } from "react-bootstrap"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"

import { useUpdateAssignmentMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

import "../styles/questionCard.css"

const QuestionCard = ({ question }) => {
  const [score, setScore] = useState("")
  const [marked, setMarked] = useState(false)

  const [updateAssignment] = useUpdateAssignmentMutation()

  const dispatch = useDispatch()

  const checkScore = (number) => {
    let pattern = /^([0-9]|[1-9][0-9]|100)$/
    return pattern.test(number) ? true : false
  }

  useEffect(() => {
    let qScore = localStorage.getItem(question._id)
    if (qScore) {
      setMarked(true)
      setScore(qScore)
    }
  }, [question])

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
      dispatch(submitAssignment({ ...res }))
      localStorage.setItem(question._id, res.updatedAssignment.score)
      setMarked(true)
      setScore(res.updatedAssignment.score)
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
          <Card.Subtitle className="description">
            {question.description}
          </Card.Subtitle>
          <Card.Text className="studentAnswer">
            <strong>Student's answer:</strong>
          </Card.Text>
          <Card.Text className="border border-primary p-2">
            {question.answers}
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
              onChange={(e) => setScore(e.target.value)}
            />
          </Form.Group>
          <p className="mt-3">
            **ONLY non-negative numerical value in the range of 0-100**
          </p>
          {marked ? (
            <Button
              type="submit"
              variant="primary"
              className="confirmBtn"
              disabled
            >
              Confirm
            </Button>
          ) : (
            <>
              {checkScore(score) ? (
                <Button type="submit" variant="primary" className="confirmBtn">
                  Confirm
                </Button>
              ) : (
                <Button
                  type="submit"
                  variant="primary"
                  className="confirmBtn"
                  disabled
                >
                  Confirm
                </Button>
              )}
            </>
          )}
        </Form>
      </Card>
    </>
  )
}

export default QuestionCard
