import  { useState } from "react";
import "./header.css";
import HeaderOptions from "./headerOptions.jsx";
import PublicIcon from "@mui/icons-material/Public";
import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Home,
  Message,
  NotificationAdd,
  Group as GroupIcon,
} from "@mui/icons-material";
import { Avatar } from "@mui/material";

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <div className="logo">
          <PublicIcon />
        </div>
        <div className="search">
          <SearchIcon />
          <input type="text" placeholder="Search" name="searchData" />
        </div>
      </div>
      <div className="headerRight">
        <div className="hamburgerMenu" onClick={toggleMobileMenu}>
          <MenuIcon />
        </div>
        <div className={`icons ${isMobileMenuOpen ? "open" : ""}`}>
          <HeaderOptions Icon={Home} label={"Home"} navigation={"/home"} />
          <HeaderOptions Icon={Message} label={"Message"} />
          <HeaderOptions Icon={NotificationAdd} label={"Notifications"} navigation={"/notifications"}/>
          <HeaderOptions
            Icon={GroupIcon}
            label={"Friends"}
            navigation={"/friends"}
          />
          <HeaderOptions Avatar={Avatar} label={"User"} />
        </div>
      </div>
    </div>
  );
}

export default Header;
