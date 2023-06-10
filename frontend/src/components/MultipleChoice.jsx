import { Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { useGetAssignmentsQuery } from "../reducers/assignment/studentAnswerSlice"
import { useAddAnswerMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

import "../styles/question.css"

const MultipleChoice = ({ question, index, studentId }) => {
  const [choice, setChoice] = useState("")
  const [assignmentNumber, setAssignmentNumber] = useState(0)
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
        setChoice(q[0].answers)
      }
    }
  }, [assignments, index, question._id, studentId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await addAnswer({
        studentId: userInfo._id,
        questionNumber: assignmentNumber,
        description: question.description,
        answers: choice,
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

  return (
    <Form className="question" onSubmit={handleSubmit}>
      <p className="assignment">Assignment {index + 1}</p>
      <Form.Group>
        <Form.Label>
          <p className="title">{question.description}</p>
        </Form.Label>
        {question.choices.map((eachChoice) => (
          <Form.Check
            key={eachChoice}
            type="radio"
            name="checkChoice"
            value={eachChoice}
            label={eachChoice}
            className="options"
            onChange={(e) => setChoice(e.target.value)}
            checked={eachChoice === choice}
          />
        ))}
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
            disabled={choice === ""}
          >
            Submit Now
          </Button>
        )}
      </div>
    </Form>
  )
}

export default MultipleChoice
