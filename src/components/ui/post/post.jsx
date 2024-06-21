import React from 'react'
import '../Navbar/sidebar.css';
import './post.css' ;
import PostHeader from './postHeader';
import PostFooter from './postFooter';



const Post = ({name, subHeader ,message , avatar , timestamp , postImage  ,  postvideo   , caption = ""}) => {
  return (
    <div className='posts'>

        <PostHeader name={name} subHeader={subHeader} avatar={avatar} timestamp={timestamp} />       

        <div className="postBody">


        {/* 1 */}
        { message != "" ? <div className="postBodyContent">{message}</div> : null }

        {/* 2 */}
        { postImage  != undefined ? 

        <div className="imagePost">
            <p  className='caption'><i>{(caption != "" ? caption : null )}</i></p>
            <div className="sepLine"></div>
            <img src={postImage}  className="postBodyContent"></img>
        </div> 
        
        // else 
        : null }


        {/* 3*/}
        { postvideo  != undefined ? 

        <div className="videoPost">
            <p  className='caption'><i>{(caption != "" ? caption : null )}</i></p>
            <div className="sepLine vidLine"></div>
            <video src={postvideo} controls></video>
        </div> 

        // else 
        : null }
        

  

        </div>

        
        <PostFooter/>
    </div>

  )
}

export default Post