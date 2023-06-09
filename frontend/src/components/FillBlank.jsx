import { useState } from "react"
import { Form, Button } from "react-bootstrap"

import "../styles/question.css"

const FillBlank = ({ question, index }) => {
  const [answer, setAnswer] = useState("")
  const [assignmentNumber, setAssignmentNumber] = useState(0)
  const [isA3Submitted, setIsA3Submitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAssignmentNumber(index + 1)
    setIsA3Submitted(true)
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
        {isA3Submitted ? (
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
