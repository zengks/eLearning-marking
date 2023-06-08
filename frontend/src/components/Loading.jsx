import { Spinner } from "react-bootstrap"

const Loading = () => {
  return (
    <>
      <Spinner
        animation="border"
        varian="primary"
        size="sm"
        style={{
          display: "block",
          width: "30px",
          height: "30px",
        }}
      />
    </>
  )
}

export default Loading
