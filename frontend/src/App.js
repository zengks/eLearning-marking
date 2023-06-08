import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <ToastContainer />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
