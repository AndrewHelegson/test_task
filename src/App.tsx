import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import Results from "./pages/Results";
import Repo from "./pages/Repo";
import Footer from "./components/Footer";

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Header navigate={navigate} />
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/results" element={<Results />} />
          <Route path="/:id" element={<Repo />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
