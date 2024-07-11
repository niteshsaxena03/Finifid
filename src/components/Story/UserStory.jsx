import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../Firebase/firebaseContext";
import { useNavigate } from "react-router-dom";
import { Timestamp, doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";

// css
import "./Story.css";

// Icon
import { Avatar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

// Redux
import { useSelector ,  useDispatch } from "react-redux";
import { addDirectStory, fetchStory } from "../../features/postCounter.js";

// Story Schema
let Story = {
  url: "",
  onTime: "",
  offTime: ""
};


const UserStory = ({ data }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentUserStoryData, setStory] = useState({});
  const [storyTracker, setStoryTracker] = useState(false);
  const storyResult = useSelector((State)=>State.postCounter.addDirectStory) ; 

  useEffect(()=>{
    setStory(data) ;
  },[])

  const seeStory = () => {
    navigate(`/story`);
  };

  const checkOffTime = (offTime) => {
    const currentTime = new Date();
    return currentTime >= offTime.toDate();
  };

  async function storyUrlExtractor(stories) {
    let storeValidStories = [];
    let urls = [];
    let exceeds = false;
    for (let i = 0; i < stories.story.length; i++) {
      if (!checkOffTime(stories.story[i].offTime)) {
        storeValidStories.push(stories.story[i]);
        urls.push(stories.story[i].url);
      } else {
        exceeds = true;
      }
    }
    if (exceeds) {
      const userDocRef = doc(db, "users", data.email);
      stories.story = storeValidStories;
      if (urls.length === 0) {
        stories.isStory = false;
        await setDoc(userDocRef, stories);
        setStoryTracker(false);
      } else {
        await setDoc(userDocRef, stories);
      }
    }
    return urls;
  }

  useEffect(() => {
    async function getStoryDetails() {
      const currentData = doc(db, "users", data.email);
      const newData = await getDoc(currentData);
      const userData = newData.data();

      setStory(userData) ;

      if (userData.isStory) {
        let urls = await storyUrlExtractor(userData);
        if (urls.length > 0) {
          dispatch(fetchStory(urls));
        }
      }
    }

    if (data && data.email) {
      getStoryDetails();
    }
  }, []);

  const addStory = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      const imgRef = ref(storage, `Story/${data.email}/${uuidv4()}`);
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      const onTime = new Date();
      const offTime = new Date(onTime.getTime() + 60 * 60 * 1000);

      Story = {
        url: url,
        onTime: Timestamp.fromDate(onTime),
        offTime: Timestamp.fromDate(offTime)
      };

      const userDocRef = doc(db, "users", data.email);
      await updateDoc(userDocRef, {
        story: arrayUnion(Story),
        isStory: true
      });

      const newData = await getDoc(userDocRef); 
      setStory(newData.data());
      setStoryTracker(true); // Set the class name after the story is updated
    } catch (error) {
      console.error("Error uploading image:", error);
    } 
  };

  
    if(storyResult.get == true ){
      console.log(storyResult.get) ;
      async function handleStory(){
        let storyContent = storyResult.event ; 
        dispatch(addDirectStory({get : false , event : ""}))
        await addStory(storyContent.event) ;
      }
      handleStory() ; 

  }


  return (
    <>
    <div className="borderBox" style={{ "--bg-image": `url(${currentUserStoryData.ProfileDetails?.profileImg || ""})` }}>
      <div className="storyIcon">
        {console.log("work")}
       
        <span className="avatarContainer userContainer">
     
          <Avatar
            style={ currentUserStoryData && currentUserStoryData.story ? currentUserStoryData.story.length > 0  ? { border : "3px solid #8e0b3a" , cursor : "pointer"} : null : null }
            onClick={currentUserStoryData.isStory ? seeStory : null}
            src={currentUserStoryData.ProfileDetails?.profileImg || ""}
          />
        
       
          <label htmlFor="iconPlus">
            <span className="plusIcon">
              <AddIcon />
            </span>
          </label>
  
          <input
            type="file"
            style={{ display: "none" }}
            onChange={addStory}
            id="iconPlus"
            />
        </span>
        <h4 className="storyFont">{currentUserStoryData.name}</h4>
      </div>
    </div>
    </>
  );
};

export default UserStory;
