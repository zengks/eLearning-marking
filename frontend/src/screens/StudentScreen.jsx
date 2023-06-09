import { useEffect, useState } from "react"
import { Container, Form, Button } from "react-bootstrap"
import { useSelector, useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import questions from "../mockData/questions.js"
import MultipleChoice from "../components/MultipleChoice"
import MultipleSelect from "../components/MultipleSelect"
import FillBlank from "../components/FillBlank"

import "../styles/studentScreen.css"

const StudentScreen = () => {
  const [answer, setAnswer] = useState("")
  const { userInfo } = useSelector((state) => state.auth)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userInfo.isAdmin) {
      navigate("/instructor/assignment")
    }
  }, [navigate, userInfo.isAdmin])

  return (
    <Container>
      <Form className="form">
        {questions.map((q, index) => {
          switch (q.type) {
            case "multiple-choice":
              return <MultipleChoice question={q} index={index} />
            case "multiple-select":
              return <MultipleSelect question={q} index={index} />
            case "fill-blank":
              return <FillBlank question={q} index={index} />
            default:
              break
          }
          return 0
        })}
        <Button type="submit" variant="primary" className="studentButton">
          Submit Now
        </Button>
      </Form>
    </Container>
  )
}

export default StudentScreen
