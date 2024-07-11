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
import "./SignUpScreen.css"; // Import your CSS file for SignUpScreen styling
import { useNavigate } from "react-router-dom";

import { setPreviousFormDetails } from "./ProfileDetails";


// css 
import './form.css'


export default function SignUpScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hobby, setHobby] = useState("");
  const [profession, setProfession] = useState("Professional");
  const [age, setAge] = useState(""); 
  const [error, setError] = useState(null);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      // Sign up the user
      setPreviousFormDetails(email , password , hobby , profession , age  )
      navigate(`/createProfile/${name}`); // Navigate to the create Profile after successful sign-up
    
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
            <div className="space-y-3">
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
              <div className="space-y-2">
              <Label htmlFor="profession">Profession</Label>
              <select onChange={(e)=>setProfession(e.target.value)} name="professionData" id="profession" className="w-full selectedInput">
                <option value="Professional">Professional</option>
                <option value="Student">Student</option>
                <option value="Influencer">Influencer</option>
                <option value="Artist">Artist</option>
                <option value="Official">Official</option> 
                <option value="Technical">Technical</option>
              </select>          
              </div>
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  placeholder="Enter your age"
                  onChange={(e) => setAge(e.target.value)}
                  value={age}
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

