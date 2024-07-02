import React from 'react'
import { Avatar } from "@mui/material";

// Component ! 
import FollowButton from '../FollowButton/followButton';


const recentsView = ({profile, end , Email , data }) => {


  return (
        <>
            <div className="recentsView" aria-label={Email}>
                <div className="recentsActivity">
                    <Avatar/>


                <div className='innerRecentsText'>
                    <h5 className='newsFont addFontStyleHeader'>{"Username" }</h5>

                    {(profile == true ) ? 
                     <p className='sideFont addFontStyleSubHeader'>{"@Username" }</p>
                     : 
                     <p className='sideFont addFontStyleSubHeader'>{"1 new message" }</p>
                    }

                </div>

                </div>

                 {
                    (profile == true ) ? 
                    <FollowButton Email = {Email}  data = {data}/> 
                    :
                    <p  className='sideFont addFontStyleSubHeader'>{"3 hour ago" }</p>
                 }
            </div>
            { end != true ?  <div className='sepLineNews'/> : null  }
        </>
  ); 
}

export default recentsView