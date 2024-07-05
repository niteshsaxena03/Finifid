import { useEffect, useState } from "react";
import "./feed.css";
import Icon from "../IconComponent/Icon.jsx";
import Post from "../Post/post";
import { db } from "../../Firebase/firebaseContext.jsx";
import { serverTimestamp } from "../../Firebase/firebaseContext.jsx";
import {collection,addDoc,query,orderBy,getDocs,where,doc,setDoc,getDoc} from "firebase/firestore";
import { storage } from "../../Firebase/firebaseContext.jsx";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Upload's


// Stories Section
import Stories from "../Story/Stories.jsx";
import { UserData, FriendsData } from "../Story/customStoryData";

// Icons
import { Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useDispatch } from "react-redux";
import { incCount } from "../../features/postCounter.js";


let overAllTime;

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

const Feed = ({ data, profile, friends }) => {
  //   Hooks :
  let [post, setPost] = useState([]);
  let [input, setInput] = useState("");

  // DataBase Work  Temp :



  const dispatch = useDispatch() ;

  async function updatePostData(){

    const userDocRef = doc(db,"users",data.email);
    await setDoc(userDocRef, data);
    console.log("Succesfully Update Post Number ! ") ;
    
    const userDoc = await getDoc(userDocRef);
    dispatch(incCount(userDoc.data().ProfileDetails.post)) ;

  }



  // This is the common Function For Post Photos Videos 

  async function FetchData(folder){

    try{
      
    // Container's 
    let allPosts = [];
    const userPostsRef = collection(db,folder);
    
    let postsQuery;

    if (profile == true ) {
      postsQuery = query(userPostsRef, where("email", "==", data.email || "No Email"), orderBy("timestamp", "desc"));
    } else {
      postsQuery = query(userPostsRef);
    }

    const postsSnapshot = await getDocs(postsQuery);
        
    postsSnapshot.forEach((doc) => { 
        allPosts.push({ id: doc.id, ...doc.data() });
    }); 

    // Checking Belong to Which Collection  

    if( profile != true ){

      if(folder == "userPosts"){
        setPost(shuffleArray(allPosts) );
      }
      else if( folder == "photos"){
        setImgUrl(shuffleArray(allPosts));
      }
      else if(folder == "videos"){
        setVidUrl(shuffleArray(allPosts));
      }
    }
    else{

      if(folder == "userPosts"){
        setPost(allPosts) ;
      }
      else if (folder == "photos"){
        setImgUrl(allPosts) ;
      }
      else if(folder == "videos"){
        setVidUrl(allPosts);
      }

    }

    }
    catch(err){
      console.error("Error fetching posts:", err);
    }




   } 

  // Adding Post To Database
  const AddPost = async (event) => {

    event.preventDefault();
    try {
      const userDocRef = collection(db, "userPosts");

      let postData = {
        name: data.name,
        subHeader: data.profession,
        message: input,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: data.email,
      };

      // Upload !
      await addDoc(userDocRef, postData);
      setInput("");

      // Post After Upload !
      await FetchData("userPosts");

      // Update Posts Data 
      data.ProfileDetails.post ++ ; 
      await updatePostData() ; 

    } catch (error) {
      console.log("method not work  !", error);
    }
  };


  const shuffleArray = (array) => {
    let shuffledArray = array.slice(); // Create a copy of the array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  };

  useEffect(() => {

    async function fetchCurrent() {
      await FetchData("userPosts");
    }

    fetchCurrent();
  
  }, [data]);

  // Photo Work

  let [imgurl, setImgUrl] = useState([]);

  const AddPhoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Format the file reference using the email
    const email = formatEmail(data.email);
    const imgRef = ref(storage, `Photo/${email}/${file.name}`);

    try {
      // Upload the photo
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);

      // Save metadata and URL to Firestore
      const photoData = {
        url: url,
        name: data.name,
        subHeader: data.profession,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: data.email,
      };
      await addDoc(collection(db, "photos"), photoData);

      // Update state with new photo URL
      await FetchData("photos") ; 

      // Update Posts Data 
      data.ProfileDetails.post ++ ; 
      await updatePostData() ; 

    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    async function getImagesReload(){
       await FetchData("photos");
    }
    getImagesReload() ; 
  }, [data]);

  let [video, setVideo] = useState(null);
  let [videoUrl, setVidUrl] = useState([]);

  // Video WorK
  const AddVideo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setVideo(file);

    const formattedEmail = formatEmail(data.email); // Format email for storage reference
    const vidRef = ref(storage, `Video/${formattedEmail}/${file.name}`);

    try {
      // Upload the video
      await uploadBytes(vidRef, file);
      const url = await getDownloadURL(vidRef);

      // Save metadata and URL to Firestore
      const videoData = {
        url: url,
        name: data.name,
        subHeader: data.profession,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: data.email,
      };
      await addDoc(collection(db, "videos"), videoData);


      await FetchData("videos") ; 


      // Update Posts Data 
      data.ProfileDetails.post ++ ; 
      await updatePostData() ; 

      
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  useEffect(() => {

    async function getVideosReload(){
        await FetchData("videos") ;
    }

    getVideosReload();
  }, [data]);

  return (
    <div className="feed">
      {/* Story Section  */}

      {profile == true ? null : (
        <div className="storyPost">
          {/* {console.log(UserData)}; */}
          {/* {console.log(FriendsData)} */}
          <Stories UserData={UserData} FriendsData={FriendsData} data={data} />
        </div>
      )}

      {/* feed input  */}

      {friends == true ? null : (
        <div className="feedSearchBox">
          <div className="feedSearch">
            <Avatar 
              src={data && data.ProfileDetails ? data.ProfileDetails.profileImg : ""}/>
            <form onSubmit={AddPost}>
              <input
                type="text"
                placeholder="Start a post..."
                // for the value setting
                onChange={(event) => setInput(event.target.value)}
                // for getting value :
                value={input}
              />
              <button>Submit</button>
            </form>
          </div>

          {/* icons  */}
          <form className="feedIcons">
            <label htmlFor="photo">
              <Icon Icon={AddPhotoAlternateIcon} label={"Photo"} idx={0} />
            </label>
            <input
              type="file"
              accept="image/*"
              id="photo"
              style={{ display: "none" }}
              onChange={AddPhoto}
            />

            <label htmlFor="video">
              <Icon Icon={VideoCallIcon} label={"Video"} idx={1} />
            </label>
            <input
              type="file"
              accept="video/*"
              id="video"
              style={{ display: "none" }}
              onChange={AddVideo}
            />

            <Icon Icon={CameraAltIcon} label={"Live"} idx={2} />
            <Icon Icon={AddCircleIcon} label={"Story"} idx={3} />
          </form>
        </div>
      )}

      {/* @ Post Starts from Here !   */}
      {post.map(({ name, subHeader, message, photoURL, timestamp,email }) => {
        // Converting time :

        {
          if (timestamp != null) {
            timestamp = timestamp.toDate();
            timestamp = timestamp.toString().split(" ").slice(1, 4).join("-");
            overAllTime = timestamp;
          }
        }

        return (
          <Post
            key={uuidv4()}
            name={name}
            subHeader={subHeader}
            message={message}
            avatar={photoURL}
            timestamp={timestamp}
            email = {email}
          />
        );
      })}

      {/* @Post - Images Start from here */}

      {/* Posts with images */}
      {imgurl.map(({ url ,photoURL , name, subHeader, timestamp,email }) => {
        let formattedTimestamp = "";
        if (timestamp && typeof timestamp.toDate === 'function') {
          formattedTimestamp = timestamp.toDate().toString().split(" ").slice(1, 4).join("-");
        } else if (timestamp && typeof timestamp.seconds === 'number') {
          formattedTimestamp = new Date(timestamp.seconds * 1000).toString().split(" ").slice(1, 4).join("-");
        }

        return (
          <Post
            key={uuidv4()}
            name={name}
            subHeader={subHeader}
            message=""
            avatar={photoURL}
            timestamp={formattedTimestamp}
            postImage={url}
            email={email}
            caption=""
          />
        );
      })}
      {/* @Post - Videos Start from here */}

      {videoUrl.map(({ url, photoURL, name, subHeader, timestamp,email }) => {
        let formattedTimestamp = "";
        if (timestamp && typeof timestamp.toDate === 'function') {
          formattedTimestamp = timestamp.toDate().toString().split(" ").slice(1, 4).join("-");
        } else if (timestamp && typeof timestamp.seconds === 'number') {
          formattedTimestamp = new Date(timestamp.seconds * 1000).toString().split(" ").slice(1, 4).join("-");
        }

        return (
          <Post
            key={uuidv4()}
            name={name}
            subHeader={subHeader}
            message=""
            avatar={photoURL}
            timestamp={formattedTimestamp}
            email={email}
            caption=""
            postvideo={url}
          />
        );
      })}
    </div>
  );
};

export default Feed;
