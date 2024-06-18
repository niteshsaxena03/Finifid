import React from 'react'
import './sidebar.css'
import { Avatar } from "@mui/material";


const sidebar = () => {
  return (
    <div className='sidebar'>

          {/* Profile  */}  

                <div className="profile curveBorder">

                    <div className="user">

                        <div className="backPhoto">
                            {/* <img src = "https://static.vecteezy.com/system/resources/thumbnails/002/393/823/small_2x/gradient-blue-background-free-vector.jpg" alt="" /> */}
                        </div>

                        <div className="userHeader">
                        {/* avatar */}
                        <Avatar/>
                        {/* name and info  */}
                            <h4 className='userTitle'>Yash Gupta</h4>
                            <p className='userDescription'>Web-Developer</p>
                        </div>

                    </div>

                    <div className='sepLine'/>

                    <div className="userInfo">

                            <div className="userInfoContent sideFont">
                                <p>No of views of your profile</p> 
                                <span>12,456</span>
                            </div>

                            <div className="userInfoContent sideFont">
                                <p>Your Follower's</p> 
                                <span>500</span>   
                            </div>

                            <div className="userInfoContent sideFont">
                                <p>Total Post's</p> 
                                <span>100+</span>   
                            </div>

                          
                    </div>

                </div>





          {/* Sub Information  */}

                <div className="subProfile curveBorder">
                        <h4 className='headTrend'><i>Top Tredings of 2024</i></h4>
                        <p className='trends'><span>#</span>React Js</p>
                        <p className='trends'><span>#</span>JavaScript</p>
                        <p className='trends'><span>#</span>Node.js</p>
                        <p className='trends'><span>#</span>FireBase</p>
                        <p className='trends'><span>#</span>Next JS</p>
                        <p className='trends'><span>#</span>MongoDB</p>
                        <p className='trends'><span>#</span>PostMan</p>
                </div>



    </div>
  )
}

export default sidebar ;