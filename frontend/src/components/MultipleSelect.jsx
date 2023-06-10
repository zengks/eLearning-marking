import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"

import { useAddAnswerMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

import "../styles/question.css"

const MultipleSelect = ({ question, index }) => {
  const [selection, setSelection] = useState([])
  const [assignmentNumber, setAssignmentNumber] = useState("")
  const [isA2Submitted, setIsA2Submitted] = useState(false)

  const { userInfo } = useSelector((state) => state.auth)
  const [addAnswer] = useAddAnswerMutation()

  const dispatch = useDispatch()

  useEffect(() => {
    setAssignmentNumber((index + 1).toString())
  }, [index])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selection.length === 0) {
    }
    setIsA2Submitted(true)
    try {
      const res = await addAnswer({
        studentId: userInfo._id,
        questionNumber: assignmentNumber,
        description: question.description,
        answers: selection.join(", "),
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
        {selection.length === 0 ? (
          <Button type="submit" variant="primary" className="mt-3" disabled>
            Submit Now
          </Button>
        ) : isA2Submitted ? (
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
