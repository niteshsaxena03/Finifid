import "./App.css";
import FriendScreen from "./pages/Friends/FriendScreen";
import HomeScreen from "./pages/Home/HomeScreen";
import LoginScreen from "./pages/Login/LoginScreen";
import NotificationScreen from "./pages/Notifications/NotificationScreen";
import ProfileScreen from "./pages/Profile/ProfileScreen";
import SignUpScreen from "./pages/SignUp/SignUpScreen";
import WelcomeScreen from "./pages/Welcome/WelcomeScreen";
import { Routes, Route } from "react-router";
import MainStory from "./components/Story/mainStory";
import SeeFriendStory from "./components/Story/SeeFriendStory";
import FriendsProfile from "./pages/Profile/FriendsProfile";
import ProfileDetails from "./pages/SignUp/ProfileDetails.jsx";
import SearchUser from "./pages/SearchUser/SearchUser";
import EditProfile from "./pages/Profile/EditProfile.jsx";
import { PostContentPhoto } from "./components/Feed/PostContentPhoto.jsx";
// DataBase Imports :
import { useFirebase } from "./Firebase/firebaseContext.jsx";
import { useState, useEffect } from "react";
import { Provider } from "react-redux";

// Redux 
import { Store } from "./app/store.js";
import Comments from "./pages/Comments/Comments";
import { PostContentVideo } from "./components/Feed/PostContentVideo";


function App() {
  
  // Data From Database :
  const { user, fetchDetails } = useFirebase(); 
  const [data, setData] = useState({});

  // Fetch user data function
  async function fetchUserData(email) {
    try {
      let data = await fetchDetails(email);
      setData(data);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  }  

  //  @ object -> Data Contain all info !
  useEffect(() => {
    if (user) {
      console.log(user.email) ;
      fetchUserData(user.email);
    }
  }, [user, fetchDetails]);

  return (
    <Provider store={Store}>
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/home" element={<HomeScreen data={data} />} />
      <Route path="/friends" element={<FriendScreen data = {data} />} />
      <Route path="/notifications" element={<NotificationScreen data={data}/>} />     
      <Route path="/profile" element={<ProfileScreen data = {data}/>} />
      <Route path="/story" element={<MainStory data={data}/>} />
      <Route path="/story/friend" element={<SeeFriendStory />} />
      <Route path="/profile/friend/:email" element={<FriendsProfile currentUserData={data}/>} />
      <Route path="/createProfile/:name" element={<ProfileDetails/>} />
      <Route path="/searchuser" element={<SearchUser/>}/>
      <Route path="/comments" element={<Comments data={data} />} />
      {/* Routes for edit  */}
      <Route path="/editProfile" element={<EditProfile  data={data} />}/> 
      {/* Route for Post  */}
      <Route path="/post/photo/:type" element={<PostContentPhoto data={data} />} />
      <Route path="/post/video/:type" element={<PostContentVideo data={data} />} />


    </Routes>
    </Provider>
  );
}

export default App;
