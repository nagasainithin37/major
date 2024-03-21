import { Route, Routes, Navigate } from "react-router-dom";
import Register from "./components/register/Register.jsx";
import Login from "./components/login/Login.jsx";
import Home from "./components/home/Home.jsx";
function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="" element={<Navigate replace to="signup" />} />
    </Routes>
  );
}

export default App;
