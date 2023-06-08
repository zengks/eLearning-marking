import "../styles/footer.css"

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <footer>
      <h5>BCIT</h5>
      <p>Copyright &copy; {year}</p>
    </footer>
  )
}

export default Footer
