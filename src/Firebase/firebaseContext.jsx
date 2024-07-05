import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  serverTimestamp,
  query,
  where,
  collection,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import fetchUserData from "../pages/Database/userData.js";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDnQOUG7G3ozl7WhjwSNPofBy651tTmDb4",
  authDomain: "finifid-c7848.firebaseapp.com",
  projectId: "finifid-c7848",
  storageBucket: "finifid-c7848.appspot.com",
  messagingSenderId: "483068433079",
  appId: "1:483068433079:web:b287f0a20ba5346caa7332",
};

const firebaseApp = initializeApp(firebaseConfig);

const firebaseAuth = getAuth(firebaseApp);

const FirebaseContext = createContext(null);

// Get a reference to the Firestore service
const db = getFirestore(firebaseApp);

// To get Image from the Storage :
const storage = getStorage(firebaseApp);

export { db };
export { serverTimestamp };
export { storage };

export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const loginUserWithEmailAndPassword = (email, password) => {
    return signInWithEmailAndPassword(firebaseAuth, email, password);
  };

  const getUserDetailsByEmail = async (email) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userData = querySnapshot.docs[0].data();
        return userData;
      } else {
        console.warn("No matching documents.");
        return null;
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      return null;
    }
  };
  const getUsersByQuery = async (searchQuery) => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("name", "==", searchQuery)); // Adjust based on the search field
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        return querySnapshot.docs.map((doc) => doc.data());
      } else {
        console.warn("No matching documents.");
        return [];
      }
    } catch (error) {
      console.error("Error fetching user details:", error.message);
      return [];
    }
  };

  const fetchDetails = async (email) => {
    try {
      return await fetchUserData(email);
    } catch (error) {
      console.log(error);
    }
  };

  const isLoggedIn = !!user;

  // Function to get the like status of a post
  const getPostLikeStatus = async (postId, userEmail) => {
    const postRef = doc(db, "userPosts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();
      return postData.likedBy.includes(userEmail);
    } else {
      console.error("No such post!");
      return false;
    }
  };

  // Function to like/unlike a post
  const toggleLikePost = async (postId, userEmail) => {
    const postRef = doc(db, "userPosts", postId);
    const postSnap = await getDoc(postRef);

    if (postSnap.exists()) {
      const postData = postSnap.data();
      const isLiked = postData.likedBy.includes(userEmail);

      if (isLiked) {
        await updateDoc(postRef, {
          likes: postData.likes - 1,
          likedBy: arrayRemove(userEmail),
        });
      } else {
        await updateDoc(postRef, {
          likes: postData.likes + 1,
          likedBy: arrayUnion(userEmail),
        });
      }
    } else {
      console.error("No such post!");
    }
  };

  return (
    <FirebaseContext.Provider
      value={{
        signUpUserWithEmailAndPassword,
        loginUserWithEmailAndPassword,
        isLoggedIn,
        user,
        getUserDetailsByEmail,
        fetchDetails,
        getUsersByQuery,
        toggleLikePost,
        getPostLikeStatus,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
