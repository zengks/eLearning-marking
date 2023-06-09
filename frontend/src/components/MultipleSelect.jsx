import { Form, Button } from "react-bootstrap"
import { useState } from "react"

import "../styles/question.css"

const MultipleSelect = ({ question, index }) => {
  const [selection, setSelection] = useState([])
  const [assignmentNumber, setAssignmentNumber] = useState(0)
  const [isA2Submitted, setIsA2Submitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setAssignmentNumber(index + 1)
    setIsA2Submitted(true)
  }

  const handleChange = (e) => {
    e.target.checked
      ? setSelection([...selection, e.target.value])
      : setSelection(selection.filter((select) => select !== e.target.value))
  }

  return (
    <Form className="question" onSubmit={handleSubmit}>
      <p className="assignment">Assignment {index + 1}</p>
      <Form.Group>
        <Form.Label>
          <p className="title">{question.description}</p>
        </Form.Label>
        {question.selection.map((item) => (
          <Form.Check
            key={item}
            type="checkbox"
            name="selectChoice"
            value={item}
            label={item}
            className="options"
            onChange={handleChange}
          />
        ))}
      </Form.Group>
      <div className="studentButton">
        {isA2Submitted ? (
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

export default MultipleSelect
