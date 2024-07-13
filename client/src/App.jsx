import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Layout from "./components/Layout";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/landing" element={<LandingPage />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
