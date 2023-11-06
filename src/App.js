import Main from "./pages/Main";
import About from "./pages/About";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavbarTest from "./components/bootstrap/NavbarTest";
import Travels from "./pages/Travels";
import TravelForm from "./pages/TravelForm";

function App() {
  return (
    <>
      <Router>
        <NavbarTest />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/travels" element={<Travels />} />
          <Route path="/travelForm" element={<TravelForm />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
