import { Form } from "react-bootstrap"

import "../styles/question.css"

const MultipleChoice = ({ question, index }) => {
  const handleChange = async () => {}
  return (
    <div className="question">
      <p className="assignment">Assignment {index + 1}</p>
      <Form.Group>
        <Form.Label>
          <p className="title">{question.description}</p>
        </Form.Label>
        {question.choices.map((choice) => (
          <Form.Check
            type="radio"
            name="checkChoice"
            value={choice}
            label={choice}
            onChange={handleChange}
            className="options"
          />
        ))}
      </Form.Group>
    </div>
  )
}

export default MultipleChoice
