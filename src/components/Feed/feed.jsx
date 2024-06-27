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

// Stories Section
import Stories from "../Story/Stories.jsx";
import { UserData, FriendsData } from "../Story/customStoryData";

// Icons
import { Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";

import { useFirebase } from "../../Firebase/firebaseContext.jsx";

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
  const AddPost = async (event) => {
    event.preventDefault();
    const formattedEmail = formatEmail(data.email);
    try {
      const addPost = await addDoc(
        collection(db, "userPosts", formattedEmail, "posts"),
        {
          name: data.userName,
          subHeader: data.profession,
          message: input,
          photoURL:
            "https://img.freepik.com/free-photo/smiling-young-male-professional-standing-with-arms-crossed-while-making-eye-contact-against-isolated-background_662251-838.jpg",
          timestamp: serverTimestamp(),
          email: data.email,
        }
      );
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    setInput("");
  };

  // useEffect(() => {
  //   const q = query(collection(db, "userPosts"), orderBy("timestamp", "desc"));

  //   const unsubscribe = onSnapshot(q, (snapshot) => {
  //     setPost(
  //       snapshot.docs.map((doc) => ({
  //         id: doc.id,
  //         data: doc.data(),
  //       }))
  //     );
  //   });
  // }, []);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const userPostsCollection = collection(db, "userPosts");
        const userPostsSnapshot = await getDocs(userPostsCollection);

        let allPosts = [];

        // Loop through each user's document in userPosts collection
        userPostsSnapshot.forEach(async (userDoc) => {
          const formattedEmail = userDoc.id; // Document ID is the formatted email

          // Reference to the subcollection "posts" for the current user
          const userPostsRef = collection(
            db,
            "userPosts",
            formattedEmail,
            "posts"
          );
          // Query to get all documents (posts) in the "posts" subcollection, ordered by timestamp
          const q = query(userPostsRef, orderBy("timestamp", "desc"));
          const snapshot = await getDocs(q);

          // Iterate through each post document and collect them
          snapshot.forEach((postDoc) => {
            allPosts.push({
              id: postDoc.id, // Document ID of the post
              data: postDoc.data(), // Post data
            });
          });
        });

        // Set all collected posts to state
        setPost(allPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Call fetchAllPosts function when component mounts
    fetchAllPosts();
  }, []); // Empty dependency array ensures it runs only once on mount

  // Photo Work

  let [img, setImg] = useState("");
  let [imgurl, setImgUrl] = useState([]);

  const AddPhoto = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setImg(file);

    const imgRef = ref(storage, `Photo/${uuidv4()}`);
    try {
      await uploadBytes(imgRef, file);
      const url = await getDownloadURL(imgRef);
      setImgUrl((prevUrls) => [...prevUrls, url]);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const listRef = ref(storage, "Photo");
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setImgUrl(urls);
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

    const vidRef = ref(storage, `Video/${uuidv4()}`);
    try {
      await uploadBytes(vidRef, file);
      const url = await getDownloadURL(vidRef);
      setVidUrl((prevUrls) => [...prevUrls, url]);
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const listRef = ref(storage, "Video");
        const res = await listAll(listRef);
        const urls = await Promise.all(
          res.items.map((itemRef) => getDownloadURL(itemRef))
        );
        setVidUrl(urls);
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
            <button>Sumbit</button>
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

      {post.map(
        ({ id, data: { name, subHeader, message, photoURL, timestamp } }) => {
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
        }
      )}

      {/* @Post - Images Start from here */}

      {imgurl.map((url) => (
        <Post
          key={uuidv4()}
          name={"Username"}
          subHeader={"subHeader"}
          message={""}
          avatar={photo}
          timestamp={overAllTime}
          postImage={url}
          caption="This is the Random Caption"
        />
      ))}

      {/* @Post - Videos Start from here */}

      {videoUrl.map((url) => (
        <Post
          key={uuidv4()}
          name={"Username"}
          subHeader={"subHeader"}
          message={""}
          avatar={photo}
          timestamp={overAllTime}
          caption="This is the Random Caption"
          postvideo={url}
        />
      ))}
    </div>
  );
};

export default Feed;
