import React from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

// User Data 
import Data from './Data.js'


const formatEmail = (email) => {
    return email.replace(/[^a-zA-Z0-9]/g, "_");
  };
  


async function Follow(follower , following ){
   
    async function getUserData(){
        if(follower){
            return follower ; 
        }
    } 
    
    
    handleAddFollower((await getUserData()) , following) ;

}

function handleAddFollower(followerData , FollowingData){

    const addToDatabase = async () =>{
        followerData.following.push(FollowingData) ; 
        const formattedEmail = formatEmail(followerData.email); 
        const userDocRef = doc(
          db,
          "users",
          formattedEmail.toLowerCase()
        );
        await setDoc(userDocRef, followerData);
        console.log("Done !") ;
    }

    addToDatabase() ; 
  
}



export default Follow