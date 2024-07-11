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
  setDoc,
  getDoc,
  deleteDoc,
  arrayUnion,
  increment,
} from "firebase/firestore";
import { Firestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
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


  async function updateCategory( userData , otherUser ){

    try{

      const userDocRef = doc(db, "users", userData);
      let user = (await getDoc(userDocRef)).data();
  
      const otherDocRef = doc(db, "users", otherUser);
      let other = (await getDoc(otherDocRef)).data();
  
  
      other.category[user.profession]++ ; 
    
      await setDoc(otherDocRef, other);
  
      console.log("Check Reach")
    }
    catch(err){
      console.log("Reach Error",err) ;
    }

  }


  const toggleLikePost = async (postId, userEmail,currentUserEmail,collectionName) => {
    try {
      // Get a reference to the userPosts collection
      const postsCollectionRef = collection(db,collectionName);

      // Query to find the post with the given postId
      const postsQuery = query(
        postsCollectionRef,
        where("postId", "==", postId)
      );
      const postSnap = await getDocs(postsQuery);
      const compositeKey=userEmail+postId;

      if (!postSnap.empty) {
        // Get the document reference and data
        const postDoc = postSnap.docs[0];
        const postDocRef = doc(db, collectionName,compositeKey);
        const postData = postDoc.data();
        const likedBy = postData.likedBy;

        // Determine if the post is currently liked by the user
        const isLiked = likedBy.includes(currentUserEmail);

        if (isLiked) {
          // If already liked, unlike the post
          const updatedLikedBy = likedBy.filter((email) => email !== currentUserEmail);
          await updateDoc(postDocRef, {
            likes: updatedLikedBy.length,
            likedBy: updatedLikedBy,
          });
        } else {
          // If not liked, like the post
          const updatedLikedBy = [...likedBy, currentUserEmail];
          await updateDoc(postDocRef, {
            likes: updatedLikedBy.length,
            likedBy: updatedLikedBy,
          });

         await updateCategory(currentUserEmail,userEmail) ;
        }
      } else {
        console.error(`No such post with postId: ${postId}!`);
      }
    } catch (error) {
      console.error("Error toggling like post:", error.message);
    }
  };

  const addCommentToPost = async (
    postId,
    userEmail,
    currentUserName,
    comment,
    collectionName,
    currentUserEmail
  ) => {
    try {
      // Get a reference to the userPosts collection
      console.log('name' , currentUserEmail) ;

      const postsCollectionRef = collection(db, collectionName);

      // Query to find the post with the given postId
      const postsQuery = query(
        postsCollectionRef,
        where("postId", "==", postId)
      );
      const postSnap = await getDocs(postsQuery);
      const compositeKey = userEmail + postId;

      if (!postSnap.empty) {
        // Get the document reference and data
        const postDoc = postSnap.docs[0];
        const postDocRef = doc(db, collectionName, compositeKey);
        const postData = postDoc.data();
        const comments = postData.comments || {};
        const commentCount = postData.commentsCount || 0;

        // Create a new comment object with timestamp
        const newComment = {
          userName: currentUserName,
          commentText: comment,
        };

        // Add the new comment to the comments object
        const updatedComments = {
          ...comments,
          [`comment_${commentCount + 1}`]: newComment, // Append comment with a new key
        };

        // Update the post with the new comment and increment the comment count
        await updateDoc(postDocRef, {
          comments: updatedComments,
          commentsCount: commentCount + 1,
        });

        await updateCategory(currentUserEmail,userEmail) ;

      } else {
        console.error(`No such post with postId: ${postId}!`);
      }
    } catch (error) {
      console.error("Error adding comment to post:", error.message);
    }
  };

  const addNotification = async (targetUserEmail, actorEmail, action) => {
    try {
      // Reference to the target user's document
      const userDocRef = doc(db, "users", targetUserEmail);

      // Fetch existing notifications
      const userDoc = await getDoc(userDocRef);
      if (!userDoc.exists()) {
        console.error("User does not exist");
        return;
      }

      // Get existing notifications array
      const existingNotifications = userDoc.data().notifications || [];

      // Construct the new notification object
      const notification = {
        email: actorEmail,
        action: action,
      };

      // Update the notifications array with the new notification
      const updatedNotifications = [...existingNotifications, notification];

      // Write the updated array back to Firestore
      await updateDoc(userDocRef, {
        notifications: updatedNotifications,
      });

      console.log("Notification added successfully");
    } catch (error) {
      console.error("Error adding notification:", error.message);
    }
  };
  const logOut = () => {
    return signOut(firebaseAuth);
  };
  const deletePost = async (userEmail, postId, collectionName) => {
    try {
      // Create the composite key
      const compositeKey = userEmail + postId;

      // Get the document reference for the post
      const postDocRef = doc(db, collectionName, compositeKey);

      // Get the document reference for the user's profile
      const userDocRef = doc(db, "users", userEmail);

      // Delete the post document
      await deleteDoc(postDocRef);

      // Decrease the post count in the user's profile details
      await updateDoc(userDocRef, {
        "ProfileDetails.post": increment(-1),
      });

      console.log(
        `Document with composite key ${compositeKey} successfully deleted and post count updated.`
      );
    } catch (error) {
      console.error("Error deleting document:", error.message);
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
        addCommentToPost,
        addNotification,
        logOut,
        deletePost,
      }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
