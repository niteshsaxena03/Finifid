import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import './followButton.css' ; 

// Follow Function ! 
import Follow from '../Follow/Follow.js';


const FollowButton = ({Email , data}) => {

  const [email , setEmail ] = useState("") ; 

  useEffect(()=>{

    if(data != null){
       setEmail(data) ;
    }

  },[data])




  function handleFollow(follower , following){
        Follow(follower , following ) ;
  }


  return (
  <Button onClick={()=>handleFollow(email, Email)} variant="outlined">Follow</Button>
  )
}

export default FollowButton