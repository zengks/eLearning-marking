import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import { ToastContainer } from "react-toastify";

import Header from "./components/Header";
import Footer from "./components/Footer";

import './App.css'
import "react-toastify/dist/ReactToastify.css"

function App() {
  return (
    <>
      <Header />
      <ToastContainer position='top-center' autoClose={2500} />
      <Container>
        <Outlet />
      </Container>
      <Footer />
    </>
  );
}

export default App;
