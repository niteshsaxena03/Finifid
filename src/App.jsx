import "./App.css";
import FriendScreen from "./pages/Friends/FriendScreen";
import HomeScreen from "./pages/Home/HomeScreen";
import LoginScreen from "./pages/Login/LoginScreen";
import SignUpScreen from "./pages/SignUp/SignUpScreen";
import WelcomeScreen from "./pages/Welcome/WelcomeScreen";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/friends" element={<FriendScreen/>}/>
    </Routes>
  );
}

export default App;
