import { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar } from "@mui/material";
import { useFirebase } from "../../Firebase/firebaseContext";

function Sidebar({data}) {

  return (
    <div className="sidebar">
      <div className="profile curveBorder">
        <div className="user">
          <div className="backPhoto"></div>
          <div className="userHeader">
            <Avatar />
            <h4 className="userTitle">{ data.userName|| "Loading..."}</h4>
            <p className="userDescription">{data.profession || "No profession listed"}</p>
          </div>
        </div>
        <div className="sepLine" />
        <div className="userInfo">
          <div className="userInfoContent sideFont">
            <p className="email">Email</p>
            <span>{data.email || "No email available"}</span>
          </div>
          <div className="userInfoContent sideFont">
            <p className="hobby">Hobby</p>
            <span>{data.hobby || "No hobby listed"}</span>
          </div>
        </div>
      </div>
      <div className="subProfile curveBorder">
        <h4 className="headTrend">
          <i>Top Trends of 2024</i>
        </h4>
        <p className="trends">
          <span>#</span>React Js
        </p>
        <p className="trends">
          <span>#</span>React Native
        </p>
        <p className="trends">
          <span>#</span>Node.js
        </p>
        <p className="trends">
          <span>#</span>FireBase
        </p>
        <p className="trends">
          <span>#</span>Next JS
        </p>
        <p className="trends">
          <span>#</span>MongoDB
        </p>
        <p className="trends">
          <span>#</span>PostMan
        </p>
      </div>
    </div>
  )
} ;

export default Sidebar;
