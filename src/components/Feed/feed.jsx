import React from 'react'
import './feed.css' ;
import Icon from '../IconComponent/Icon.jsx';
import Post from '../post/post';


// Icons 
import { Avatar } from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Feed = () => {
 let p =  <p>React.js is a popular JavaScript library developed
                    by Facebook for building user interfaces,
                    particularly single-page applications where
                    efficient data handling and dynamic content
                    rendering are crucial.
                    One of the key features of React is its component-based architecture, allowing developers to create reusable UI components that manage their own state. This modular approach simplifies the development process, making code more manageable and easier to debug.</p>

  let img = <img src='https://worksolutions.ru/uploads/e_Ho_Bd_M_Bva_U2_CU_03eh3_GWP_8_Ko_I_Wd9s_Nd5f19_T_Rd5t_80b2f09eaa.png'/>
  let img2 = <img src='https://cdn-fkmoj.nitrocdn.com/xvpOGZRTxJUhXKufpOYIruQcRqtvAAQX/assets/images/optimized/rev-4e1f421/media.briantracy.com/blog/wp-content/uploads/2024/01/23111610/Quote-11.png'/>

  return (
    <div className='feed'>

          {/* feed input  */}

          <div className="feedSearch">
             <Avatar/>
             <form>
                <input type="text" placeholder='Start a post...' />
                <button>Sumbit</button>
             </form>
          </div>

          {/* icons  */}
          <div className="feedIcons">
                <Icon Icon = {AddPhotoAlternateIcon} label={"Photo"} idx = {0} />
                <Icon Icon = {VideoCallIcon} label={"Video"} idx = {1}/>
                <Icon Icon = {CameraAltIcon} label={"Live"} idx = {2}/>
                <Icon Icon = {AddCircleIcon} label={"Story"} idx = {3}/>

          </div>



          {/* @ Post Starts from Here !   */}
          <Post Post = {p}/>
          <Post Post = {img}/>
          <Post Post = {img2}/>


          {/* <Post/> */}



    </div>

    

  

  )
}

export default Feed