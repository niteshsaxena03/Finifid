import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};


const fetchUserData = async (email) => {
  try {
    const formattedEmail = formatEmail(email);
    console.log("user searching mail :"  , formattedEmail) ;
    const userDocRef = doc(db, "users", formattedEmail);
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      return userDoc.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
};

export default fetchUserData;
