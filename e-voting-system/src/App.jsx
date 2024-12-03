import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Components/LoginPage/LoginPage.jsx";
import Register from "./Regester/Regester.jsx";
import Home from "./Home/Home.jsx";
import Dashboard from "./Dashboard/Dashboard.jsx";
import Profile from "./Profile/Profile.jsx";
import UpdatePassword from "./UpdatePassword/UpdatePassword.jsx";
import ElectionPage from "./ElectionPage/ElectionPage.jsx";
import Header from "./Components/Header/Header.jsx";
import LandingPage from "./Components/LandingPage.jsx";
import SignUpPage from "./Components/SignUpPage/SignUpPage.jsx";
import UserHomePage from "./Components/UserHomePage/UserHomePage.jsx";
import ElectionListPage from "./Components/ElectionListPage/ElectionListPage.jsx";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/header" element={<Header />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={< UserHomePage/>} />
        <Route path="/electionlist" element={<ElectionListPage />} />
      </Routes>
    </Router>
  );
}

export default App;
