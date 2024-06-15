import { Button } from "@/components/ui/button";
import "./WelcomeScreen.css";
function WelcomeScreen() {
  return (
    <div className="welcomeScreen">
      <h1 className="mainHeading">The Saxena Network</h1>
      <h2 className="secondHeading">Welcomes You</h2>
      <div className="buttonContainer">
        <Button className="button" variant="background">Login</Button>
        <Button className="button" variant="background">SignUp</Button>
      </div>
    </div>
  );
}

export default WelcomeScreen;
