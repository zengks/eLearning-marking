import { Form } from "react-bootstrap"

import "../styles/question.css"

const MultipleSelect = ({ question, index }) => {
  const handleChange = async () => {}
  return (
    <div className="question">
      <p className="assignment">Assignment {index + 1}</p>
      <Form.Group>
        <Form.Label>
          <p className="title">{question.description}</p>
        </Form.Label>
        {question.selection.map((item) => (
          <Form.Check
            type="checkbox"
            name="selectChoice"
            value={item}
            label={item}
            onChange={handleChange}
            className="options"
          />
        ))}
      </Form.Group>
    </div>
  )
}

export default MultipleSelect
