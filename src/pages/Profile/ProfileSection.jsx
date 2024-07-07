import React, { useState } from 'react'

// Icons 
import { Avatar } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import StarIcon from '@mui/icons-material/Star';
import LocationOnIcon from '@mui/icons-material/LocationOn';

// components 
import Icon from '../../components/IconComponent/Icon.jsx';
import FollowButton from '../../components/FollowButton/followButton.jsx';
import CircularIndeterminate from '../../components/Progress/progress.jsx';

// Css 
import './ProfileSection.css'
import './FriendsProfile.css' ;
import { useSelector } from 'react-redux';

const ProfileSection = ({data,friends,updatedFollowers,updatedFollowing,userData}) => {    


   // For post count ! : 
   const postCount = useSelector((State)=> State.postCounter.postCount) ; 

  // Progress     
   let [ progress , setProgress] = useState(true) ;
   

  function getJoinedDate(userJoinDate){ 

     if(userJoinDate){
          let date = userJoinDate.toDate().toString().split(" ").slice(1,4).join(" ") ; 
          date =  date.toString().split(" ") ;
          return `Joined ${date[0] +" "+date[2]}`
     }
     else{
          return 'Loading ...'
     }

    }  


    function checkExists(userFollowings,email ){
     
          if(userFollowings != undefined ){
                
               for(let i = 0 ; i<userFollowings.length ; i++ ){
          
                    if( userFollowings[i] === email ){
                         return true  ;
                    }
               }
               return false ; 
          }
 
   }


  return (
    <>    
    
    <div className="upperProfile">


     {
        progress == true && data.ProfileDetails == undefined ? 
        <CircularIndeterminate/>
        :
        <div className="backgroundImage">
        {/* Main Image  */}
            <img src={data.ProfileDetails && data.ProfileDetails.backgroundImg ? data.ProfileDetails.backgroundImg : ""}/>


        {/* Sub Image  */}
            <div className="subImage">
            <Avatar src={data.ProfileDetails && data.ProfileDetails.profileImg ? data.ProfileDetails.profileImg : ""}/>
           </div>


        </div>
     }
      


        {/* Lower Segment  */}
        <div className="informationBox">

            <div className="profileName">    
                 <h2 className='headProfileName'>{data.name}</h2>
                 <h4 className='subProfilenName fontProfile'>{data.ProfileDetails && data.ProfileDetails.username ? data.ProfileDetails.username : ""}</h4>
            </div>

            <div className="bioSection">
                 <p className='bio fontProfile'>{data.ProfileDetails && data.ProfileDetails.bio ? data.ProfileDetails.bio : ""}</p>
            </div>
               
            <div className="sepLine profileLineSep"></div>

            <div className="userPersonalSection">
                    <Icon Icon={LocationOnIcon} label={data.ProfileDetails && data.ProfileDetails.location ? data.ProfileDetails.location : "Loading ..."} idx={0} />
                    <Icon Icon={WorkOutlineIcon} label={data.ProfileDetails && data.ProfileDetails.work ? data.ProfileDetails.work : "Loading ..."} idx={1} />
                    <Icon Icon={StarIcon} label={data.ProfileDetails && data.ProfileDetails.favourite ? data.ProfileDetails.favourite : "Loading ..."} idx={2} />
                    <Icon Icon={CalendarMonthIcon} label={`${getJoinedDate(data.joinedDate)}`} idx={3} />
            </div>

            <div className="userDataSection fontProfile ">
                    <div className="dataDesign">
                         <span className='dataDesignNo'><h3>{data && data.ProfileDetails ? data.ProfileDetails.post < postCount.ProfileDetails.post ? postCount.ProfileDetails.post : data.ProfileDetails.post  :  0}</h3></span>
                         <h2 className='dataDesignFont'>Posts</h2>
                    </div>

                    <div className="dataDesign">
                         <span className='dataDesignNo'><h3>{ data  && data.followers ? updatedFollowers == 0  ?  data.followers.length  : updatedFollowers :  0 }</h3></span>

                         
                    {
                         (friends == true  ) ? 
                         ( userData != undefined && data != undefined ) ?
                         checkExists(userData.following ,data.email) ?
                         <span className='followButton'><FollowButton userData={userData} otherUser={data} value={true}/></span>
                         :
                         <span className='followButton'><FollowButton userData={userData} otherUser={data} value={false}/></span>
                         :
                         "Loading"
                         :
                         <h2 className='dataDesignFont'>Follower</h2>
                    }
                    </div>

                    <div className="dataDesign">
                         <span className='dataDesignNo'><h3>{ data && data.following ? updatedFollowing == 0  ? data.following.length : updatedFollowing :  0}</h3></span>
                         <h2 className='dataDesignFont'>Following</h2>
                    </div>


            </div>


        </div>





    </div>
     
    
    </>
  )
}

export default ProfileSection