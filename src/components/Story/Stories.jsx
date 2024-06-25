  import React from 'react'

  import FriendStory from './FriendStory'
  import UserStory from './UserStory';

  import './Stories.css'

  import Slider from "react-slick";
  import "slick-carousel/slick/slick.css";
  import "slick-carousel/slick/slick-theme.css";

  import { v4 as uuidv4 } from 'uuid';
  
  const Stories = ({UserData , FriendsData}) => {

    const settings = {
      dots: true,
      infinite: true,
      speed: 100,
      slidesToShow: 5,
      slidesToScroll: 2,
    };
  
  
   
    return (
    
      <div className="StoriesBox">

          {/* Heading  */}

          <span className='storyHeader'><h2>Hello, Yash</h2></span>

          <Slider {...settings}>
          

          {/* User Story  */}
          <UserStory UserData = {UserData}/>


          {/* Friend Story  */}
          {
            FriendsData.map((data)=>(
              <FriendStory name = {data.name} url = {data.url} storyStatus = {data.isStory} key={uuidv4() } />
            ))
          }

          </Slider>    
                
      </div>
    )
    
  }

  export default Stories