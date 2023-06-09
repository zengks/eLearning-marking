import { useState } from "react"
import { Form } from "react-bootstrap"

import "../styles/question.css"

const FillBlank = ({ question, index }) => {
  const [answer, setAnswer] = useState("")

  return (
    <div className="question">
      <p className="assignment">Assignment {index + 1}</p>
      <Form.Group>
        <Form.Label>
          <p className="title">{question.description}</p>
        </Form.Label>
        <Form.Control
          type="text"
          value={answer}
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
    </div>
  )
}

export default FillBlank
