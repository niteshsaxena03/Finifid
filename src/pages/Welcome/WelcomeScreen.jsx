import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import "./WelcomeScreen.css";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "@/Firebase/firebaseContext";
import { useMediaQuery } from "react-responsive";

function WelcomeScreen() {
  const navigate = useNavigate();
  const firebase = useFirebase();
  const { isLoggedIn } = firebase; // Corrected here

  // Using useMediaQuery to detect mobile devices
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  // Function to detect if user is already logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  if (isMobile) {
    return (
      <div className="mobileWarning">
        <h1>Sorry, this app is not optimized for mobile as of now.</h1>
        <h1>Kindly use a desktop</h1>
      </div>
    );
  }

  return (
    <div className="welcomeScreen">
      <h1 className="mainHeading">The NY Network</h1>
      <h2 className="secondHeading">Welcomes You</h2>
      <div className="buttonContainer">
        <Button
          className="button"
          variant="contained"
          size="lg"
          onClick={() => navigate("/login")}
        >
          Login
        </Button>
        <Button
          className="button"
          variant="contained"
          size="lg"
          onClick={() => navigate("/signup")}
        >
          SignUp
        </Button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
