import React from 'react'
import { Avatar } from "@mui/material";


const recentsView = ({end}) => {
  return (
        <>
            <div className="recentsView">

                <div className="recentsActivity">
                <Avatar/>

                <div className='innerRecentsText'>
                    <h5 className='newsFont'>Username</h5>
                    <p className='sideFont'>1 new message</p>
                </div>

                </div>

                <p className='sideFont'>3 hour ago</p>
            </div>
            { end != true ?  <div className='sepLineNews'/> : null  }
        </>
  ); 
}

export default recentsView