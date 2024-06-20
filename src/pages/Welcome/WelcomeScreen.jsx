import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button"; // Adjust the import path as per your project structure
import "./WelcomeScreen.css";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/Firebase/firebaseContext";

function WelcomeScreen() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { isLoggedIn } = useFirebase();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); // Example breakpoint for small screen
    };

    // Initial check on mount
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [firebase, navigate]);

  return (
    <div className="welcomeScreen">
      <h1 className="mainHeading">The NY Network</h1>
      <h2 className="secondHeading">Welcomes You</h2>
      <div className="buttonContainer">
        <Button
          className="button"
          variant="background"
          size={isSmallScreen ? "sm" : "lg"}
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="button"
          variant="background"
          size={isSmallScreen ? "sm" : "lg"}
          onClick={() => navigate("/signup")}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
