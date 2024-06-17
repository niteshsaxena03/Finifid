// css 
import "./header.css" ;

// components 
import HeaderOptions from './headerOptions.jsx' ;

// All Icons Import : 
import PublicIcon from '@mui/icons-material/Public';
import SearchIcon from '@mui/icons-material/Search';
import { Home } from "@mui/icons-material";
import { Message } from "@mui/icons-material";
import { NotificationAdd } from "@mui/icons-material";
import GroupIcon from '@mui/icons-material/Group';
import { Avatar } from "@mui/material";

function Header() {
  return (

    <div className="header">  {/* Nav Header  */}

        <div className="headerLeft">
                <div className="logo">
                <PublicIcon/>
               </div>


               <div className="search">
                 <SearchIcon/>
                 <input type="text" placeholder="search" name="searchData"/>
                </div>

        </div>

              

        <div className="headerRight">
                <div className="icons">
                    <HeaderOptions Icon = {Home} label = {"Home"}/>
                    <HeaderOptions Icon = {Message} label = {"Message"}/>
                    <HeaderOptions Icon = {NotificationAdd} label = {"Notify"}/>
                    <HeaderOptions Icon = {GroupIcon} label = {"Friends"}/>
                    <HeaderOptions Avatar = {Avatar} label = {"User"} />

                </div>
        </div>
        
    </div>
 )

}

export default Header ; 