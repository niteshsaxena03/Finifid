import { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function Header({
  profile = true,
  friends = true,
  notifications = true,
  home = true,
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/searchuser?query=${searchQuery.trim()}`);
    }
  };

  return (
    <div className="header">
      <div className="headerLeft">
        <div className="logo">
          <PublicIcon />
        </div>
        <div className="search">
          <form onSubmit={handleSearchSubmit}>
            <SearchIcon />
            <input
              type="text"
              placeholder="Search"
              name="searchData"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </form>
        </div>
      </div>
      <div className="headerRight">
        <div className="hamburgerMenu" onClick={toggleMobileMenu}>
          <MenuIcon />
        </div>
        <div className={`icons ${isMobileMenuOpen ? "open" : ""}`}>
          {home && (
            <HeaderOptions Icon={Home} label={"Home"} navigation={"/home"} />
          )}
          <HeaderOptions Icon={Message} label={"Message"} />
          {notifications && (
            <HeaderOptions
              Icon={NotificationAdd}
              label={"Notifications"}
              navigation={"/notifications"}
            />
          )}
          {friends && (
            <HeaderOptions
              Icon={GroupIcon}
              label={"Friends"}
              navigation={"/friends"}
            />
          )}
          {profile && (
            <HeaderOptions
              Avatar={Avatar}
              label={"User"}
              navigation={"/profile"}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
