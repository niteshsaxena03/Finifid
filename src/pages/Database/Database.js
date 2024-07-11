import Schema from "./dbSchema";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

// Category Data 
let initCategory  = {
  Professional : 0 ,
  Student : 0 , 
  Influencer : 0 , 
  Artist : 0 , 
  Official : 0 , 
  Technical : 0 
}


const Database = async (name, email, hobby, profession,age,ProfileDetails,newUser) => {
  let initDatabase = async () => {
    try {
      //  Init Data
      Schema.name = name;
      Schema.email = email;
      Schema.hobby = hobby;
      Schema.profession = profession;
      Schema.age=age;
      Schema.ProfileDetails = ProfileDetails  ;
      Schema.category = initCategory ; 
      { (newUser == true ? Schema.joinedDate = new Date() : Schema.joinedDate = Schema.joinedDate )}


      // End Data

      // Data uploading to firebase is taking place from below !
      const userDocRef = doc(
        db,
        "users",
        email
      );
      await setDoc(userDocRef, Schema);
    } catch (error) {
      console.log("Error Occurred While Uploading SignUp Data:", error);
    }
  };

  initDatabase();
};

export default Database;
