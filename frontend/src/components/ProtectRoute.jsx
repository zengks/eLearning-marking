import { useSelector } from "react-redux"
import { Outlet, Navigate } from "react-router-dom"

const ProtectRoute = () => {
  const { userInfo } = useSelector((state) => state.auth)

  return userInfo ? <Outlet /> : <Navigate to="/" replace="true" />
}

export default ProtectRoute
