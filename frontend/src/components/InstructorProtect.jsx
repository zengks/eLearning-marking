import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const InstructorProtect = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return userInfo.isAdmin ? <Outlet /> : <Navigate to="/" replace="true" />
}

export default InstructorProtect
