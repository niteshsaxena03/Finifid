import React from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Avatar } from '@mui/material';

const PostHeader = ({name,subHeader,timestamp,avatar}) => {
  return (
    <div className="postHeader">

                <div className="postHeaderLeft">

                    {/* avatar */}
                    <Avatar src={avatar} style={{objectFit : "contain" , height : "50px" , width : "50px" }}/>

                    {/* Username and Info  */}

                    <div className="username">

                        <h4 className='userTitle'>{name.userName}</h4>
                        <p className='userDescription'>{subHeader.userProfession}</p>  
                        <p className='timeStamp'>{timestamp}</p>
                    </div>
                </div>

                <div className="postHeaderRight ">
                        <MoreVertIcon/>
                </div>
        </div>
  )
}

export default PostHeader