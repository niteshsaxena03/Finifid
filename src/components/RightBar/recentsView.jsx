import React from 'react'
import { useEffect , useState } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from "@mui/material";
import { useNavigate } from 'react-router';

// Component ! 
import FollowButton from '../FollowButton/followButton';

// DB 
import {getDocs,doc ,collection} from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";

// Redux 
import { refreshPage } from '../../features/postCounter.js';



const recentsView = ({userData,end}) => {

  const navigate = useNavigate();

  const [randomUsers,setUsers] = useState([]) ;

  let refresh = useSelector((State)=>State.refresh)


  useEffect(() => {
    async function getRandomSuggestion() {
      try {
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);
  
        let allData = [];
        querySnapshot.forEach((doc) => {
          const users = doc.data();
          // Exclude documents where email matches userData.email
          if (userData.email !== users.email) {
            allData.push(users);
          }
        });
  
        let select = [];
        if (allData.length <= 4) {
          // Less than 5 documents, select all
          select = allData;
        } else {
          // More than 4 documents, select 4 random ones
          let prevIdx = new Set();
          while (select.length < 4) {
            let idx = Math.floor(Math.random() * allData.length);
            if (!prevIdx.has(idx)) {
              select.push(allData[idx]);
              prevIdx.add(idx);
            }
          }
        }
  
        setUsers(select);
  
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  
    getRandomSuggestion();
  }, [userData])

  function handleClick(email){
    navigate(`/profile/friend/${email}`); 
  }

  function checkExists(userFollowings , email ){
    
    if( userFollowings != undefined && userFollowings.following != undefined ){

    for(let i = 0 ; i<userFollowings.following.length ; i++ ){

      if( userFollowings.following[i] === email ){
             return true  ;
      }
    }
    return false ; 

  }

  }
 

  return (
       
        randomUsers.map((data,idx)=>(
            <React.Fragment key={idx}>
            <div className="recentsView" aria-label={data && data.email ? data.email : "No email"}>
                <div className="recentsActivity">
                    <Avatar src={data && data.ProfileDetails ? data.ProfileDetails.profileImg : null }  onClick={()=>handleClick(data.email)}/>


                <div className='innerRecentsText'>
                    <h5  className='newsFont addFontStyleHeader'>{data && data.name ? data.name  : "Loading"}</h5>
                    <p className='sideFont addFontStyleSubHeader'>{data && data.ProfileDetails ? data.ProfileDetails.username : "Loading..." }</p>
                </div>

                </div>
                    {
                      data && data.email 
                      ?
                      (
                      checkExists(userData ,data.email ) ?
                      <FollowButton userData={userData} otherUser = {data}  value = {true} /> 
                      : 
                      <FollowButton userData={userData} otherUser = {data}  value = {false}/>  
                      )
                      :
                      null 
                       
                   
                    }
                </div>

               { end != true ?  <div className='sepLineNews'/> : null  }
           </React.Fragment>
        ))
       
  ); 
}

export default recentsView