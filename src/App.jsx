import "./App.css";
import WelcomeScreen from "./components/pages/WelcomeScreen/WelcomeScreen";
import { Button } from "./components/ui/button";
import { Routes, Route } from "react-router";

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
    </Routes>
  );
}

export default App;
