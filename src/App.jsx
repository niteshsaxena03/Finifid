import "./App.css";
import LoginScreen from "./components/pages/Login/LoginScreen";
import SignUpScreen from "./components/pages/SignUp/SignUpScreen";
import WelcomeScreen from "./components/pages/WelcomeScreen/WelcomeScreen";
import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
    </Routes>
  );
}

export default App;
