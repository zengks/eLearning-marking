import { Form, Button } from "react-bootstrap"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useSelector, useDispatch } from "react-redux"

import { useGetAssignmentsQuery } from "../reducers/assignment/studentAnswerSlice"
import { useAddAnswerMutation } from "../reducers/assignment/studentAnswerSlice"
import { submitAssignment } from "../reducers/assignment/assignmentSlice"

import "../styles/question.css"

const MultipleSelect = ({ question, index, studentId }) => {
  const [selection, setSelection] = useState([])
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
        setSelection(q[0].answers)
      }
    }
  }, [assignments, index, studentId])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (selection.length === 0) {
    }
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
      setCurScore(res.score)
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
            checked={selection.includes(item)}
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
            disabled={selection.length === 0}
          >
            Submit Now
          </Button>
        )}
      </div>
    </Form>
  )
}

export default MultipleSelect
