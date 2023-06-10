import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const InstructorProtect = () => {
  const { userInfo } = useSelector((state) => state.auth)
  if (userInfo && userInfo.isAdmin) {
    return <Outlet />
  } else {
    return <Navigate to="/" replace="true" />
  }
}

export default InstructorProtect
