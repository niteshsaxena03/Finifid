import Schema from "./dbSchema";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

const Database = async (name, email, hobby, profession, age = null) => {
  let initDatabase = async () => {
    try {
      //  Init Data
      Schema.userName = name;
      Schema.email = email;
      Schema.hobby = hobby;
      Schema.profession = profession;
      Schema.age=age;

      // End Data

      // Data uploading to firebase is taking place from below !

      const formattedEmail = formatEmail(email);
      const userDocRef = doc(
        db,
        "users",
        formattedEmail.toString().toLowerCase()
      );
      await setDoc(userDocRef, Schema);
    } catch (error) {
      console.log("Error Occurred While Uploading SignUp Data:", error);
    }
  };

  initDatabase();
};

export default Database;
