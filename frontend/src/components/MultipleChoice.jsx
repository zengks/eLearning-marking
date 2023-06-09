import { Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { useAddAnswerMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

import "../styles/question.css"

const MultipleChoice = ({ question, index }) => {
  const [choice, setChoice] = useState("")
  const [assignmentNumber, setAssignmentNumber] = useState(0)
  const [isA1Submitted, setIsA1Submitted] = useState(false)

  const { userInfo } = useSelector((state) => state.auth)
  const [addAnswer] = useAddAnswerMutation()

  const dispatch = useDispatch()

  useEffect(() => {
    setAssignmentNumber((index + 1).toString())
  }, [index])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsA1Submitted(true)
    try {
      const res = await addAnswer({
        studentId: userInfo._id,
        questionNumber: assignmentNumber,
        answers: choice,
        submitted: true,
        score: "Not Marked Yet",
      }).unwrap()
      dispatch(submitAssignment({ ...res }))
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
          />
        ))}
      </Form.Group>
      <div className="studentButton">
        {choice === "" ? (
          <Button type="submit" variant="primary" className="mt-3" disabled>
            Submit Now
          </Button>
        ) : isA1Submitted ? (
          <Button type="submit" variant="primary" className="mt-3" disabled>
            Submitted
          </Button>
        ) : (
          <Button type="submit" variant="primary" className="mt-3">
            Submit Now
          </Button>
        )}
      </div>
    </Form>
  )
}

export default MultipleChoice
