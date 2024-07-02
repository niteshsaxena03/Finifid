import React from 'react'

// Icons 
import { Avatar } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// components 
import Icon from '../../components/IconComponent/Icon.jsx';
import FollowButton from '../../components/FollowButton/followButton.jsx';

// Css 
import './ProfileSection.css'
import './FriendsProfile.css' ;

const ProfileSection = ({friends}) => {
  return (
    <>
    
    <div className="upperProfile">

        {/* Main Image  */}

        <div className="backgroundImage">
            <img src="https://pbs.twimg.com/profile_banners/18839785/1718111779/1500x500" alt="background-Img"/>


        {/* Sub Image  */}
            <div className="subImage">
            <Avatar src='https://pbs.twimg.com/profile_images/1800516892370595841/NCnKrUga_400x400.jpg'/>
           </div>

        </div>

      


        {/* Lower Segment  */}
        <div className="informationBox">

            <div className="profileName">
                 <h2 className='headProfileName'>Narendra Modi</h2>
                 <h4 className='subProfilenName fontProfile'>@Narendra Modi</h4>
            </div>

            <div className="bioSection">
                 <p className='bio fontProfile'>Prime Minister of India | Head of Foreign Exchange | National Leader</p>
            </div>
               
            <div className="sepLine profileLineSep"></div>

            <div className="userPersonalSection">
                    <Icon Icon={LocationOnIcon} label={"India"} idx={0} />
                    <Icon Icon={WorkOutlineIcon} label={"PMO"} idx={1} />
                    <Icon Icon={StarIcon} label={"Exploring"} idx={2} />
                    <Icon Icon={CalendarMonthIcon} label={"Joined January 2009"} idx={3} />
            </div>

            <div className="userDataSection fontProfile ">

                    <div className="dataDesign">
                         <span className='dataDesignNo'><h3>100</h3></span>
                         <h2 className='dataDesignFont'>Posts</h2>
                    </div>

                    <div className="dataDesign">
                         <span className='dataDesignNo'><h3>1986</h3></span>
                    {
                         (friends == true ) ? 
                         <span className='followButton'><FollowButton/></span>
                         :
                         <h2 className='dataDesignFont'>Follower</h2>
                    }
                    </div>

                    <div className="dataDesign">
                         <span className='dataDesignNo'><h3>1000</h3></span>
                         <h2 className='dataDesignFont'>Following</h2>
                    </div>


            </div>


        </div>





    </div>
     
    
    </>
  )
}

export default ProfileSection