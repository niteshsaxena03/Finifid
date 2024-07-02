import { useEffect, useState } from "react";
import "./feed.css";
import Icon from "../IconComponent/Icon.jsx";
import Post from "../Post/post";
import { db } from "../../Firebase/firebaseContext.jsx";
import { serverTimestamp } from "../../Firebase/firebaseContext.jsx";
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { storage } from "../../Firebase/firebaseContext.jsx";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

// Upload's
import { doc, setDoc } from "firebase/firestore";
;

// Stories Section
import Stories from "../Story/Stories.jsx";
import { UserData, FriendsData } from "../Story/customStoryData";

// Icons
import { Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";

let photo =
  "https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg";
let overAllTime;

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

const Feed = ({ data }) => {
  //   Hooks :
  let [post, setPost] = useState([]);
  let [input, setInput] = useState("");

  // DataBase Work  Temp :

  // Adding Post To Database

  const AddPost = async (event) => {
    event.preventDefault();

    const formattedEmail = formatEmail(data.email);

    try {
      const userDocRef = collection(db, "userPosts", formattedEmail, "posts");

      let postData = {
        name: data.userName,
        subHeader: data.profession,
        message: input,
        photoURL:
          "https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg",
        timestamp: serverTimestamp(),
        email: data.email,
      };

      // Upload !
      await addDoc(userDocRef, postData);
      setInput("");

      // Post After Upload !
      await fetchPosts();
    } catch (error) {
      console.log("method not work  !", error);
    }
  };

  // Function to fetch all emails from users collection
  const fetchUserEmails = async () => {
    const usersRef = collection(db, "users");
    const usersSnapshot = await getDocs(usersRef);
    const userEmails = usersSnapshot.docs.map((doc) => doc.data().email);
    return userEmails;
  };

  const checkUsersWithPosts = async (userEmails) => {
    const usersWithPosts = [];

    for (let email of userEmails) {
      const formattedEmail = formatEmail(email);
      const userPostsRef = collection(db, "userPosts", formattedEmail, "posts");

      const postsSnapshot = await getDocs(userPostsRef);

      if (!postsSnapshot.empty) {
        usersWithPosts.push(formattedEmail);
      }
    }

    return usersWithPosts;
  };
  const fetchPostsForUsers = async (usersWithPosts) => {
    let allPosts = [];

    for (let userEmail of usersWithPosts) {
      const userPostsRef = collection(db, "userPosts", userEmail, "posts");
      const postsSnapshot = await getDocs(userPostsRef);

      postsSnapshot.forEach((doc) => {
        allPosts.push({ id: doc.id, ...doc.data() });
      });
    }

    return allPosts;
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

  const fetchPosts = async () => {
    try {
      // Fetch all user emails
      const userEmails = await fetchUserEmails();

      // Check which users have posts
      const usersWithPosts = await checkUsersWithPosts(userEmails);

      // Fetch posts for users who have posts
      const allPosts = await fetchPostsForUsers(usersWithPosts);

      // Shuffle the posts array
      const shuffledPosts = shuffleArray(allPosts);

      console.log(shuffledPosts);
      setPost(shuffledPosts);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    async function fetchCurrent() {
      await fetchPosts();
    }

    if (data && data.email) {
      fetchCurrent();
    }
  }, [data]);

  // Photo Work

  let [img, setImg] = useState("");
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
        name: data.userName,
        subHeader: data.profession,
        timestamp: serverTimestamp(),
        email: data.email,
      };
      await addDoc(collection(db, "photos"), photoData);

      // Update state with new photo URL
      setImgUrl((prevUrls) => [...prevUrls, { ...photoData, id: uuidv4() }]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const photosRef = collection(db, "photos");
        const photosSnapshot = await getDocs(photosRef);
        const photos = photosSnapshot.docs.map((doc) => doc.data());

        // Assuming photos are sorted by timestamp if needed
        setImgUrl(photos);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };


    fetchImages();
  }, []);

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
        name: data.userName,
        subHeader: data.profession,
        timestamp: serverTimestamp(),
        email: data.email,
      };
      await addDoc(collection(db, "videos"), videoData);

      // Update state with new video URL
      setVidUrl((prevUrls) => [...prevUrls, { ...videoData, id: uuidv4() }]);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };


  useEffect(() => {
   const fetchVideos = async () => {
     try {
       const videosRef = collection(db, "videos");
       const videosSnapshot = await getDocs(videosRef);
       const videos = videosSnapshot.docs.map((doc) => doc.data());

       // Assuming videos are sorted by timestamp if needed
       setVidUrl(videos);
     } catch (error) {
       console.error("Error fetching videos:", error);
     }
   };


    fetchVideos();
  }, []);

  return (
    <div className="feed">
      {/* Story Section  */}
      <div className="storyPost">
        {/* {console.log(UserData)}; */}
        {/* {console.log(FriendsData)} */}
        <Stories UserData={UserData} FriendsData={FriendsData} data={data} />
      </div>

      {/* feed input  */}

      <div className="feedSearchBox">
        <div className="feedSearch">
          <Avatar />
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

      {/* @ Post Starts from Here !   */}

      {post.map(({ id, name, subHeader, message, photoURL, timestamp }) => {
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
            key={id}
            name={name}
            subHeader={subHeader}
            message={message}
            avatar={photoURL}
            timestamp={timestamp}
          />
        );
      })}

      {/* @Post - Images Start from here */}

     
      {imgurl.map(({ id, url, name, subHeader, timestamp }) => (
        <Post
          key={id}
          name={name}
          subHeader={subHeader}
          message={""}
          avatar={photo}
          timestamp={
            timestamp
              ? timestamp.toDate().toString().split(" ").slice(1, 4).join("-")
              : ""
          }
          postImage={url}
          caption=""
        />
      ))}

      {/* @Post - Videos Start from here */}

      {videoUrl.map(({ id, url, name, subHeader, timestamp }) => (
        <Post
          key={id}
          name={name}
          subHeader={subHeader}
          message={""}
          avatar={photo}
          timestamp={
            timestamp
              ? timestamp.toDate().toString().split(" ").slice(1, 4).join("-")
              : ""
          }
          caption=""
          postvideo={url}
        />
      ))}
    </div>
  );
};

export default Feed;
