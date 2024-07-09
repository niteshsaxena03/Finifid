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
import "../SignUp/SignUpScreen.css"; // Import your CSS file for SignUpScreen styling


// Data-Base
import { useNavigate } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes} from "firebase/storage";
import { db,storage } from "../../Firebase/firebaseContext.jsx";
import {doc, updateDoc } from "firebase/firestore";

  

// css 
import '../SignUp/form.css'

// Progress 
import SimpleBackdrop from "../../components/Progress/LoadingBackDrop.jsx";


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


export default function EditProfile({data}) {
  

    const navigate = useNavigate();

    const [ userData , setData ] = useState([]) ;

    const [ profileDetails , setDetails ] = useState(profileDetailsOfUser) ;
    const [error, setError] = useState(null);
    let [ button , setButton ] = useState(false) ;

    console.log("main data  ",userData) ;

    useEffect(()=>{
        setData(data) ;
    },[data])



    function handleAllChange(name , value ){
        profileDetailsOfUser[name] = value  ;
        
        console.log("Data Update" , profileDetailsOfUser) ; 

        setDetails((prevData)=>{
            return { ...prevData , profileDetailsOfUser } 
        }) ;
    }
    
 
  const handleSignUp = async (e) => {

    e.preventDefault();
    setError(null); // Clear previous errors
    setButton(true) ;
    try {

        if( userData && userData.ProfileDetails){
        // Database Init :

        // Uploading Profile Image : 
        const userPhotoRef = ref(storage ,`Profile/${data.email}/ProfilePhoto`) ; 
        await uploadBytes(userPhotoRef , profileDetailsOfUser.profileImg ) ; 
        const profileURL = await getDownloadURL(userPhotoRef) ;

        // BackGround Image 
        const userPhotoRef_background = ref(storage ,`Profile/${data.email}/BackGroundPhoto`) ; 
        await uploadBytes(userPhotoRef_background , profileDetailsOfUser.backgroundImg ) ; 
        const backProfileURL = await getDownloadURL(userPhotoRef_background) ;


        // Upload Data ! 

        // Other Data 
        userData.ProfileDetails.backgroundImg = backProfileURL ; 
        userData.ProfileDetails.profileImg = profileURL ; 
        userData.ProfileDetails.bio = profileDetailsOfUser.bio ; 
        userData.ProfileDetails.location = profileDetailsOfUser.location ; 
        userData.ProfileDetails.favourite = profileDetailsOfUser.favourite ; 
        userData.ProfileDetails.work = profileDetailsOfUser.work ; 
        
        
        
        
        console.log("Last Details Before set" , userData.ProfileDetails ) ;
        
        const userDocRef = doc(db, "users", userData.email);    
        await updateDoc(userDocRef, {
               ProfileDetails: userData.ProfileDetails ,
            });
                        
        console.log("Update  successfull !") ;
        navigate("/home") ;

        // After upload 
        setButton(false) ;
            
        }
    }
    catch (error) {
      console.error("Error signing up:", error.message);
      setError("Failed to sign up. Please try again.");
      setButton(false) ;
    }
  };

  return (

    <div className="loginScreen">
    {
        button ? <span><SimpleBackdrop/><br/><br/><br/><br/><p style={{marginLeft : "5%" , fontSize : "25px"}}>Updating...</p></span>
      :

      <Card className="cardContainer mx-auto">
        <form onSubmit={handleSignUp}>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold">Edit Your Profile</CardTitle>
            <CardDescription>
              Enter your details to edit your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
            
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


            </div>

              {error && (
                <div className="error-message text-red-500">{error}</div>
              )}
              <Button type="submit" className="w-full" variant="mehroon">
                Edit Profile
              </Button>
            </div>
          </CardContent>
        </form>
      </Card>
        }
    </div>
  );
}


