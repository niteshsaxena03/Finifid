import React from 'react'
import { useEffect , useState } from 'react';
import { Avatar } from "@mui/material";
import { useNavigate } from 'react-router';

// Component ! 
import FollowButton from '../FollowButton/followButton';

// DB 
import {getDoc,doc} from "firebase/firestore";
import { db } from "../../Firebase/firebaseContext.jsx";


let users = ["doghomeoffical_gmail_com","cathomeoffical_gmail_com","weather_gmail_com","ryzenamd_gmail_com"] ;

const recentsView = ({userData,end}) => {

  const navigate = useNavigate();

  const [randomUsers,setUsers] = useState([]) ;



  useEffect(()=>{

    async function getRandomSuggestion(){
      let prevIdx = new Set()  ; 
      let allData = [] ;
      try {
        // Fetching Users : 

        for( let i = 0 ; i<users.length ; i++ ){

        const userDocRef = doc(db, "users", users[i]);
        const userDoc = await getDoc(userDocRef);
        allData.push(userDoc.data()) ;

        }

        // Selecting Any 5 
        let select = [] 
        while( select.length != 4 ){

            let idx = Math.floor(Math.random()*allData.length) ; 
            
            if( idx <= allData.length  && !prevIdx.has(idx) ){
              select.push(allData[idx]) ;
              prevIdx.add(idx) ;
            }
        }
        


        // Setting the data : 
        setUsers(select) ;
        

      
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    getRandomSuggestion() ;
  },[])



  function handleClick(email){
    navigate(`/profile/friend/${email}`); 
  }

  function checkExists(userFollowings , email ){
    
    for(let i = 0 ; i<userFollowings.length ; i++ ){

      if( userFollowings[i] === email ){
             return true  ;
      }
    }
    return false ; 

  }
 

  return (
       
        randomUsers.map((data,idx)=>(
            <React.Fragment key={idx}>
            <div className="recentsView" aria-label={data && data.email ? data.email : "No email"}>
                <div className="recentsActivity">
                    <Avatar src={data && data.ProfileDetails ? data.ProfileDetails.profileImg : <Avatar/>}  onClick={()=>handleClick(data.email)}/>


                <div className='innerRecentsText'>
                    <h5  className='newsFont addFontStyleHeader'>{data && data.name ? data.name  : "Loading"}</h5>
                    <p className='sideFont addFontStyleSubHeader'>{data && data.ProfileDetails ? data.ProfileDetails.username : "Loading..." }</p>
                </div>

                </div>
                    {
                      (
                      checkExists(userData.following ,data.email) ?
                      <FollowButton userData={userData} otherUser = {data}  value = {true} /> 
                      : 
                      <FollowButton userData={userData} otherUser = {data}  value = {false}/>  
                      )
                       
                   
                    }
                </div>

               { end != true ?  <div className='sepLineNews'/> : null  }
           </React.Fragment>
        ))
       
  ); 
}

export default recentsView