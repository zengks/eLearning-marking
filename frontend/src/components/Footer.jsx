import "../styles/footer.css"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
      <p>BCIT Copyright &copy; {year}</p>
    </footer>
  )
}

export default Footer
