import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';


// css
import './Story.css'

// Icon 
import { Avatar } from '@mui/material'

// Redux 
import { useDispatch } from 'react-redux';
import { fetchFriendStory } from '../../features/postCounter.js';

const   FriendStory = ({name , url,storyStatus,email,stories}) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let [friendStoryData , setData ]  = useState([]) ;



  const seeStory = () => {
    dispatch(fetchFriendStory(friendStoryData)) ;
    navigate(`/story/friend`);  // Updated method
  };



  const checkOffTime = (offTime) => {
      const currentTime = new Date();
      return currentTime >= offTime.toDate();
  };
  
  useEffect(()=>{

      function storyUrlExtractor(stories) {

      let urls = [];

      for (let i = 0; i < stories.length; i++) {

        if (!checkOffTime(stories[i].offTime))
           {
            urls.push(stories[i].url);
           } 
      }
      
      setData(urls) ;
    }

    storyUrlExtractor(stories) ; 
     
  },[])



  return (
    <div className="borderBox" style={{ '--bg-image': `url(${url})`}}> 
      <div className='storyIcon'>
    <span className="avatarContainer friendContainer">
        <Avatar 
        src= {`${url}`}
        onClick = { friendStoryData.length > 0 ? seeStory : null }
        style={friendStoryData.length > 0 ? { border : "3px solid #8e0b3a" , cursor : "pointer"} : null  }
         />
    </span>
    <h4 className='storyFont'>{name}</h4>
    </div>
  </div>
  )
}

export default FriendStory        