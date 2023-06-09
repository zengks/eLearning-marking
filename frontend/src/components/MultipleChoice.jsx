import { Form, Button } from "react-bootstrap"

import "../styles/question.css"
import { useState } from "react"

const MultipleChoice = ({ question, index }) => {
  const [choice, setChoice] = useState("")
  const [assignmentNumber, setAssignmentNumber] = useState(0)
  const [isA1Submitted, setIsA1Submitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAssignmentNumber(index + 1)
    setIsA1Submitted(true)
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
        {isA1Submitted ? (
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
