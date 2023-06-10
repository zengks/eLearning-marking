import React from "react"
import { Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const PageNotFound = () => {
  return (
    <Container className="mt-5">
      <h1>Lost? ...</h1>
      <h2>
        <Link to="/">Click here</Link> to go home...
      </h2>
    </Container>
  )
}

export default PageNotFound
