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


// DataBase Imports : 
import { useFirebase } from "./Firebase/firebaseContext.jsx";
import { useState , useEffect } from "react";

function App() {

  // Data From Database : 
  const { user , fetchDetails  } = useFirebase();
  const [data , setData ] = useState({}) ;



  //  @ object -> Data Contain all info !  
  useEffect(()=>{
    
      if(user){
        async function UserData(){
          let data = await fetchDetails(user.email) ; 
          setData(data) ;
        }
        UserData() ; 
  }
      
  },[user , fetchDetails]) ;


  return (
    <Routes>
      <Route path="/" element={<WelcomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/home" element={<HomeScreen data = {data}/>} />
      <Route path="/friends" element={<FriendScreen/>}/>
      <Route path="/notifications" element={<NotificationScreen/>}/>
      <Route path="/profile" element={<ProfileScreen/>}/>
      <Route path="/story" element={<MainStory/>} />
      <Route path="/story/friend/:name" element={<SeeFriendStory/>} />

    </Routes>
  );
}

export default App;
