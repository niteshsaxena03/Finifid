import { useEffect, useState } from "react";
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
import { useNavigate, useParams } from "react-router-dom";
import {
    storage,
    useFirebase,
  } from "../../Firebase/firebaseContext";
  


// css 
import './form.css'

// Data-Base
import Database from "../Database/Database.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

let profileDetailsOfUser = {
    username : "" ,
    backgroundImg : "" ,
    profileImg : "" ,
    bio : "" ,
    location : "India" ,
    work : "" , 
    favourite : "Explorer" ,
    dob : "" ,
    post : 0 
}

let previousDetails = {
    email : "" ,
    password : "" , 
    hobby : "" ,
    profession : "" ,
    age : "" 
}

function setPreviousFormDetails(email  ,  password , hobby, profession  , age  ){
    previousDetails.email = email ; 
    previousDetails.password = password ; 
    previousDetails.age = age ;  
    previousDetails.profession = profession ; 
    previousDetails.hobby = hobby; 
}

export default function ProfileDetails() {

    // User name -    
    const {name} = useParams() ; 

    const navigate = useNavigate();

    const [ profileDetails , setDetails ] = useState(profileDetailsOfUser) ;
    const [error, setError] = useState(null);
    const { signUpUserWithEmailAndPassword } = useFirebase();



 

    function handleAllChange(name , value ){
        profileDetailsOfUser[name] = value  ;
        
        console.log("Data Update" , profileDetailsOfUser) ; 

        setDetails((prevData)=>{
            return { ...prevData , profileDetailsOfUser } 
        }) ;
    }
    
    function createUsername(name) {
        // Convert to lowercase and trim spaces
        const username = name.toLowerCase().trim();
      
        // Replace spaces with underscores (you can modify this based on your preference)
        return  `@${ username.replace(/\s+/g, '_')}`;

    }

    const formatEmail = (email) => {
        return email.replace(/[^a-zA-Z0-9]/g, "_");
      };
      

    useEffect(()=>{

        function generateUsername(){
            const username = createUsername(name);
            handleAllChange("username",username) ;
        }

        generateUsername() ;  
    },[])


  




  const handleSignUp = async (e) => {

    e.preventDefault();

    setError(null); // Clear previous errors

    try {
        // Database Init :

        const formattedEmail = formatEmail(previousDetails.email).toLowerCase() ;
        // Uploading Profile Image : 
        const userPhotoRef = ref(storage ,`Profile/${formattedEmail}/ProfilePhoto`) ; 
        await uploadBytes(userPhotoRef , profileDetailsOfUser.profileImg ) ; 
        const profileURL = await getDownloadURL(userPhotoRef) ;

        // BackGround Image 
        const userPhotoRef_background = ref(storage ,`Profile/${formattedEmail}/BackGroundPhoto`) ; 
        await uploadBytes(userPhotoRef_background , profileDetailsOfUser.backgroundImg ) ; 
        const backProfileURL = await getDownloadURL(userPhotoRef_background) ;


        // Upload Data ! 
        profileDetailsOfUser.profileImg = profileURL ;
        profileDetailsOfUser.backgroundImg = backProfileURL ;


        console.log("Last Details Before set" , profileDetailsOfUser) ;



        await Database(name, formattedEmail , previousDetails.hobby,previousDetails.profession,previousDetails.age,profileDetailsOfUser,true);
        console.log("Sign up successfull !") ;

        const result = await signUpUserWithEmailAndPassword(previousDetails.email, previousDetails.password);
        console.log("Sign up successful:", result);

        if(result){
        navigate("/home"); // Navigate to the home page after successful sign-up
        }
        else{
          throw "Something went Wrong ! " ;
        }
    
    }
    catch (error) {
      console.error("Error signing up:", error.message);
      setError("Failed to sign up. Please try again.");
    }
  };

  return (
    <div className="loginScreen">
      <Card className="cardContainer mx-auto">
        <form onSubmit={handleSignUp}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Create Your Profile</CardTitle>
            <CardDescription>
              Enter your details to create a your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="space-y-2">

                <Label htmlFor="name">Username</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder={profileDetailsOfUser.username} 
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="backgroundImage">Background Image</Label>
                <Input
                    id="backgroundImage"
                    type="file"
                    accept="image/*"
                    name = "backgroundImg"
                    onChange={(e) => handleAllChange(e.target.name , e.target.files[0])}
                    
                />
                </div>

                <div className="space-y-2">
                <Label htmlFor="ProfileImage">Profile Image</Label>
                <Input
                    id="ProfileImage"
                    type="file"
                    accept="image/*"
                    name = "profileImg"
                    onChange={(e) => handleAllChange(e.target.name , e.target.files[0])}
                />
                </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Input
                  id="bio"
                  type="text"
                  placeholder="e.g.,Freelancer Experienced Over 2 Years ...."
                  name="bio"
                  onChange={(e) => handleAllChange( e.target.name , e.target.value)}
                />
              </div>

              <div className="space-y-2">
            <Label htmlFor="location">Location</Label>

            <select name="location" id="location" className="w-full selectedInput"  onChange={(e)=>handleAllChange(e.target.name , e.target.value)} >

                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Canada">Canada</option>
                <option value="Australia">Australia</option>
                <option value="Germany">Germany</option>
                <option value="France">France</option>
                <option value="Japan">Japan</option>
                <option value="Brazil">Brazil</option>
                <option value="South Africa">South Africa</option>
                <option value="Spain">Spain</option>
                <option value="Italy">Italy</option>

            </select>
            </div>

              <div className="space-y-2">
                <Label htmlFor="work">Work</Label>
                <Input
                  id="work"
                  type="text"
                  name = "work"
                  placeholder="e.g.,Software engineer "
                  onChange={(e) => handleAllChange(e.target.name , e.target.value)}
                  required
                />
              </div>

            <div className="flex space-x-4">
              <div className="space-y-2 flex-1">
            <Label htmlFor="favourite">Favourite</Label>

            <select name="favourite" id="favourite" className="w-full selectedInput" onChange={(e)=>handleAllChange(e.target.name , e.target.value)} >
                <option value="Explorer">Explorer</option>
                <option value="Reading">Reading</option>
                <option value="Sports">Sports</option>
                <option value="Cooking">Cooking</option>
                <option value="Photography">Photography</option>
                <option value="Traveling">Traveling</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Writing">Writing</option>
                <option value="Gaming">Gaming</option>
                <option value="Volunteering">Volunteering</option>
                <option value="Fitness">Fitness</option>
            </select>
            </div>

            <div className="space-y-2 flex-1">
            <Label htmlFor="dob">Date of Birth</Label>
            <input type="date" id="dob" name="dob"  className="w-full selectedInput" onChange={(e)=>handleAllChange(e.target.name , e.target.value )} required />
            </div>


            </div>

              {error && (
                <div className="error-message text-red-500">{error}</div>
              )}
              <Button type="submit" className="w-full" variant="mehroon">
                Create Profile
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


export {setPreviousFormDetails} ;
