import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import "./SignUpScreen.css"; // Import your CSS file for LoginScreen styling
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../Firebase/firebaseContext";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { signUpUserWithEmailAndPassword } = useFirebase();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      // You might want to send the name and hobby to your backend here
      const result = await signUpUserWithEmailAndPassword(email, password);
      if (result) {
        console.log("Sign up successful:", result);
        navigate("/home"); // Navigate to the home page after successful sign-up
      } else {
        console.warn("Sign up result is null or undefined");
        setError("Unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error.message);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="loginScreen">
      <Card className="cardContainer mx-auto">
        <form onSubmit={handleSignUp}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your details to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hobby">Hobby</Label>
                <Input
                  id="hobby"
                  type="text"
                  placeholder="e.g., Painting"
                  onChange={(e) => setHobby(e.target.value)}
                  value={hobby}
                  required
                />
              </div>
              {error && (
                <div className="error-message text-red-500">{error}</div>
              )}
              <Button type="submit" className="w-full" variant="mehroon">
                Sign Up
              </Button>
              <Button className="w-full" onClick={() => navigate("/login")}>
                Already have an account? Log in
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
    </div>
  );
}
