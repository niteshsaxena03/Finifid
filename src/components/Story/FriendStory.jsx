import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


// css
import './Story.css'


// Icon 
import { Avatar } from '@mui/material'

const FriendStory = ({name , url, storyStatus}) => {

  const navigate = useNavigate();



  const seeStory = (name) => {
    navigate(`/story/friend/${name}`);  // Updated method
  };

  
  useEffect(()=>{

    if( storyStatus == true ){

          // after upload :    
          let container = document.querySelector(`.friendContainer-${name}`) ;
          container.classList.add("makeClick")   ;  
          console.log(name , container) ;
    }

  },[])



  return (
    <div className="borderBox" style={{ '--bg-image': `url(${url})` }}> 
      <div className='storyIcon'>
    <span className={`avatarContainer friendContainer-${name}`}onClick={ ( storyStatus == true) ? ()=>(seeStory(name)) : null  }>
        <Avatar src= {`${url}`} style={{cursor : storyStatus ? "pointer" : null }} />
    </span>
    <h4 className='storyFont'>{name}</h4>
    </div>
  </div>
  )
}

export default FriendStory        