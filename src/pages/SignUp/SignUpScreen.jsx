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
import { useState } from "react";

export default function SignUpScreen() {
  const navigate = useNavigate();
  const { signUpUserWithEmailAndPassword } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await signUpUserWithEmailAndPassword(email, password);
      navigate("/home"); // Navigate to the home page after successful sign-up
    } catch (error) {
      console.error("Error signing up:", error.message);
      // Handle the error
    }
  };

  return (
    <div className="loginScreen">
      <Card className="mx-auto max-w-sm">
        <form onSubmit={handleSignUp}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Sign Up</CardTitle>
            <CardDescription>
              Enter your email and password to create a new account
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
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
