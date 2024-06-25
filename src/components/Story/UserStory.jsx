import React, { useEffect } from 'react'
import { useState } from 'react';
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { storage } from '../../Firebase/firebaseContext';
import { useNavigate } from 'react-router-dom';

// css
import './Story.css'


// Icon 
import { Avatar } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';

const UserStory = ({UserData}) => {


   // Photo Work 

  let [img, setImg] = useState("");
  let [imgurl, setImgUrl] = useState([]);
  let [isStorySet , setStory ] = useState(false) ;

  const navigate = useNavigate();


  const seeStory = () => {
    navigate(`/story`);  // Updated method
  };


  useEffect(()=>{
    if(UserData.isStory==true){
        let container = document.querySelector(".userContainer .MuiAvatar-root")
        container.classList.add("makeClick")   ;
    }
  },[])

  const addStory = async (event) => {

    console.log("work") ;
    const file = event.target.files[0];
    if (!file) return;

    setImg(file);

    const imgRef = ref(storage, `Story/${uuidv4()}`);
    try {
      
    //   Upload process :

      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      setImgUrl((prevUrls) => [...prevUrls, url]);
    
      // after upload :    
      let container = document.querySelector(".userContainer .MuiAvatar-root") ;
      console.log(container) ;

        
      
      //Show After  Upload : 
      UserData.isStory = true ; 
      container.classList.add("afterStoryPost")    
      setStory(true) ;
    


    } catch (error) {
      console.error("Error uploading image:", error);
    }




  };


  


  return (
    <div className="borderBox" style={{ '--bg-image': `url(${UserData.url})` }}>
      <div className='storyIcon'>

        <span className='avatarContainer userContainer' onClick={ ( UserData.isStory == true) ? seeStory : null  }>
          <Avatar src={UserData.url} />

          <label htmlFor="iconPlus">
            <span className='plusIcon'>
              <AddIcon />
            </span>
          </label>
          <input type="file" style={{ display: "none" }} onChange={addStory} id='iconPlus' />
        </span>
        <h4 className='storyFont'>{UserData.name}</h4>
      </div>
    </div>
  )
}

export default UserStory        