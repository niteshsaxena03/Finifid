import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const FirebaseContext = createContext(null);
const firebaseAuth = getAuth(firebaseApp);

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnQOUG7G3ozl7WhjwSNPofBy651tTmDb4",
  authDomain: "finifid-c7848.firebaseapp.com",
  projectId: "finifid-c7848",
  storageBucket: "finifid-c7848.appspot.com",
  messagingSenderId: "483068433079",
  appId: "1:483068433079:web:b287f0a20ba5346caa7332",
};

export const firebaseApp = initializeApp(firebaseConfig);

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUserWithEmailAndPassword = (email, password) => {
    createUserWithEmailAndPassword(firebaseAuth, email, password);
  };
  return (
    <FirebaseContext.Provider
      value={{ FirebaseContext, signUpUserWithEmailAndPassword }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
