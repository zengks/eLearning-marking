import { useEffect } from "react"
import { Container } from "react-bootstrap"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import questions from "../mockData/questions.js"
import MultipleChoice from "../components/MultipleChoice"
import MultipleSelect from "../components/MultipleSelect"
import FillBlank from "../components/FillBlank"

const StudentScreen = () => {
  const { userInfo } = useSelector((state) => state.auth)
  const { studentId } = useParams()

  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo.isAdmin) {
      navigate("/instructor/assignment")
    }
  }, [navigate, userInfo.isAdmin])

  return (
    <Container>
      {questions.map((q, index) => {
        switch (q.type) {
          case "multiple-choice":
            return (
              <div key={index}>
                <MultipleChoice
                  question={q}
                  index={index}
                  studentId={studentId}
                />
              </div>
            )
          case "multiple-select":
            return (
              <div key={index}>
                <MultipleSelect
                  question={q}
                  index={index}
                  studentId={studentId}
                />
              </div>
            )
          case "fill-blank":
            return (
              <div key={index}>
                <FillBlank question={q} index={index} studentId={studentId} />
              </div>
            )
          default:
            break
        }
        return 0
      })}
    </Container>
  )
}

export default StudentScreen
