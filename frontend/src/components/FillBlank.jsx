import { Form, Button } from "react-bootstrap"
import { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-toastify"

import { useAddAnswerMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

import "../styles/question.css"

const FillBlank = ({ question, index }) => {
  const [answer, setAnswer] = useState("")
  const [assignmentNumber, setAssignmentNumber] = useState(0)
  const [isA3Submitted, setIsA3Submitted] = useState(false)

  const { userInfo } = useSelector((state) => state.auth)
  const [addAnswer] = useAddAnswerMutation()

  const dispatch = useDispatch()

  useEffect(() => {
    setAssignmentNumber((index + 1).toString())
  }, [index])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsA3Submitted(true)
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
          value={answer}
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
        {!checkAnswerFormat(answer) ? (
          <Button type="submit" variant="primary" className="mt-3" disabled>
            Submit Now
          </Button>
        ) : isA3Submitted ? (
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

export default FillBlank
