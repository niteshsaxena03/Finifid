import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';
import '../Navbar/sidebar.css';
import './post.css' ;
import Icon from "../IconComponent/Icon.jsx" ; 

// Icons : 
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';
import SendIcon from '@mui/icons-material/Send';

const Post = ({Post}) => {
  return (
    <div className='posts'>

        <div className="postHeader">

                <div className="postHeaderLeft">

                    {/* avatar */}

                    <Avatar/>

                    {/* Username and Info  */}

                    <div className="username">

                        <h4 className='userTitle'>Yash Gupta</h4>
                        <p className='userDescription'>Front End Developer</p>  
                        
                    </div>
                </div>

                <div className="postHeaderRight ">
                        <MoreVertIcon/>
                </div>
        </div>

        <div className="postBody">
            <div className="postBodyContent">
                {Post}
            </div>
        </div>

        
        <div className="postFooter">
                <Icon Icon = {ThumbUpOffAltIcon} label={"Like"} idx = {-1}/>
                <Icon Icon = {ChatBubbleOutlineIcon} label={"Comment"} idx = {-1}/>
                <Icon Icon = {ShareIcon} label={"Share"} idx = {-1}/>
                <Icon Icon = {SendIcon} label={"Send"} idx = {-1}/>

        </div>













    </div>

  )
}

export default Post