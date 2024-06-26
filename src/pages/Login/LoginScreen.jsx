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
import "./LoginScreen.css";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../../Firebase/firebaseContext";

export default function LoginScreen() {
  const navigate = useNavigate();
  const { loginUserWithEmailAndPassword } = useFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {

      const result = await loginUserWithEmailAndPassword(email, password);

      if (result) {
        // Checking
        console.log("Login successful:", result);
        navigate("/home");

      } 

      else {
        console.warn("Login result is null or undefined");
        setError("Unexpected error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Error logging in:", error.message);
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div className="loginScreen">
      <Card className="mx-auto max-w-sm">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Login</CardTitle>
          <CardDescription>
            Enter your email and password to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="error-message text-red-500">{error}</div>
              )}
              <Button type="submit" className="w-full" variant="mehroon">
                Log in
              </Button>
              <Button className="w-full" onClick={() => navigate("/signup")}>
                Don't have an account? Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
