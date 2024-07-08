import { useEffect, useState } from "react";
import "./feed.css";
import Icon from "../IconComponent/Icon.jsx";
import Post from "../Post/post";
import { db } from "../../Firebase/firebaseContext.jsx";
import { serverTimestamp } from "../../Firebase/firebaseContext.jsx";
import { v4 as uuidv4 } from "uuid";

// Upload's
import {
  collection,
  addDoc,
  query,
  orderBy,
  getDocs,
  where,
  doc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { storage } from "../../Firebase/firebaseContext.jsx";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Stories Section
import Stories from "../Story/Stories.jsx";
import { UserData, FriendsData } from "../Story/customStoryData";

// Icons
import { Avatar } from "@mui/material";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import VideoCallIcon from "@mui/icons-material/VideoCall";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import AddCircleIcon from "@mui/icons-material/AddCircle";

// Redux
import { useDispatch, useSelector } from "react-redux";
import { incCount, refreshContent } from "../../features/postCounter.js";

// Components
import CircularIndeterminate from "../Progress/progress.jsx";

let overAllTime;

const formatEmail = (email) => {
  return email.replace(/[^a-zA-Z0-9]/g, "_");
};

const Feed = ({ data, profile, friends }) => {
  let refresh = useSelector((State) => State.postCounter.contentRefresh);

  let allRandomPost = [];

  // Set-Auto-Random-Fetch
  const [randomPosts, setRandomPosts] = useState(allRandomPost);
  let [progess, setProgess] = useState(true);

  //   Hooks :
  let [input, setInput] = useState("");

  // DataBase Work  Temp :
  const dispatch = useDispatch();

  async function updatePostData() {
    const userDocRef = doc(db, "users", data.email);
    await setDoc(userDocRef, data);
    console.log("Succesfully Update Post Number ! ");

    const userDoc = await getDoc(userDocRef);
    dispatch(incCount(userDoc.data().ProfileDetails.post));
  }

  // This is the common Function For Post Photos Videos

  async function FetchData(folder) {
    try {
      // Container's
      const userPostsRef = collection(db, folder);

      let postsQuery;

      if (profile == true) {
        postsQuery = query(
          userPostsRef,
          where("email", "==", data.email || "No Email"),
          orderBy("timestamp", "desc")
        );
      } else {
        postsQuery = query(userPostsRef);
      }

      const postsSnapshot = await getDocs(postsQuery);

      postsSnapshot.forEach((doc) => {
        allRandomPost.push({
          type: folder,
          content: { id: doc.id, ...doc.data() },
        });
      });

      // Checking Belong to Which Collection

      if (profile != true) {
        // Video Folder is last folder !
        if (folder == "videos") {
          console.log("Not profile");
          setRandomPosts(shuffleArray(allRandomPost));
          return true;
        }
      } else {
        // Video Folder is last folder !
        if (folder == "videos") {
          allRandomPost = allRandomPost.sort(
            (a, b) => b.content.timestamp - a.content.timestamp
          );
          setRandomPosts(() => {
            return [...allRandomPost];
          });
          console.log("After post", randomPosts);
        }
      }
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }

  // Adding Post To Database
  const AddPost = async (event) => {
    event.preventDefault();
    try {
      // Generate a unique postId
      const postId = uuidv4();
      const userEmail = data.email; // Get the user's email
      const compositeKey = userEmail + postId;
      const postDocRef = doc(db, "userPosts", compositeKey);

      let postData = {
        postId: postId,
        name: data.name,
        subHeader: data.profession,
        message: input,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: userEmail,
        likes: 0,
        likedBy: [],
        comments: {},
        commentsCount: 0,
      };

      // Upload the post data
      await setDoc(postDocRef, postData);
      setInput("");

      // Post After Upload !
      dispatch(refreshContent());

      // Update user's post count
      data.ProfileDetails.post++;
      await updatePostData();
    } catch (error) {
      console.log("Error adding post:", error);
    }
  };

  // Photo Work
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

      const postId = uuidv4();
      const userEmail = data.email; // Get the user's email
      const compositeKey = userEmail + postId;
      const postDocRef = doc(db, "photos", compositeKey);

      // Save metadata and URL to Firestore
      const photoData = {
        postId: postId,
        url: url,
        name: data.name,
        subHeader: data.profession,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: data.email,
        likes: 0,
        likedBy: [],
        comments: {},
        commentsCount: 0,
      };
      await setDoc(postDocRef, photoData);

      // Update state with new photo URL
      dispatch(refreshContent());

      // Update Posts Data
      data.ProfileDetails.post++;
      await updatePostData();

      // Update Posts Data
      data.ProfileDetails.post++;
      await updatePostData();
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  // Video WorK
  const AddVideo = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formattedEmail = formatEmail(data.email); // Format email for storage reference
    const vidRef = ref(storage, `Video/${formattedEmail}/${file.name}`);

    try {
      // Upload the video
      await uploadBytes(vidRef, file);
      const url = await getDownloadURL(vidRef);

      const postId = uuidv4();
      const userEmail = data.email; // Get the user's email
      const compositeKey = userEmail + postId;
      const postDocRef = doc(db, "videos", compositeKey);

      // Save metadata and URL to Firestore
      const videoData = {
        postId: postId,
        url: url,
        name: data.name,
        subHeader: data.profession,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: data.email,
        likes: 0,
        likedBy: [],
        comments: {},
        commentsCount: 0,
      };
      await setDoc(postDocRef, videoData);

      await FetchData("videos");

      dispatch(refreshContent());

      // Update Posts Data
      data.ProfileDetails.post++;
      await updatePostData();
    } catch (error) {
      console.error("Error uploading video:", error);
    }
  };

  //Shuffle
  function shuffleArray(array) {
    let shuffledArray = array.slice();
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  }

  // Fetch All Over Data
  useEffect(() => {
    async function fetchCurrent() {
      allRandomPost = [];
      setProgess(true);
      await FetchData("userPosts");
      await FetchData("photos");
      await FetchData("videos");
      setProgess(false);
    }

    fetchCurrent();
  }, [data, refresh]);

  return (
    <div className="feed">
      {console.log("feed working  !   ")}
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
              src={
                data && data.ProfileDetails
                  ? data.ProfileDetails.profileImg
                  : ""
              }
            />
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

      {/* Content Loading - Bar */}

      {progess == true ? (
        <CircularIndeterminate />
      ) : (
        randomPosts.map((post) => {
          switch (post.type) {
            case "userPosts":
              {
                if (
                  post.content &&
                  post.content.timestamp &&
                  typeof post.content.timestamp.toDate === "function"
                ) {
                  post.content.timestamp = post.content.timestamp
                    .toDate()
                    .toString()
                    .split(" ")
                    .slice(1, 4)
                    .join("-");
                  overAllTime = post.content.timestamp;
                }
              }

              return (
                <Post
                  key={uuidv4()}
                  name={post.content.name}
                  subHeader={post.content.subHeader}
                  message={post.content.message}
                  avatar={post.content.photoURL}
                  timestamp={post.content.timestamp}
                  email={post.content.email}
                  postId={post.content.postId}
                  likes={post.content.likes}
                  likedBy={post.content.likedBy}
                  userEmail={post.content.email}
                  collectionName={"userPosts"}
                />
              );

            case "photos":
              {
                if (
                  post.content &&
                  post.content.timestamp &&
                  typeof post.content.timestamp.toDate === "function"
                ) {
                  post.content.timestamp = post.content.timestamp
                    .toDate()
                    .toString()
                    .split(" ")
                    .slice(1, 4)
                    .join("-");
                  overAllTime = post.content.timestamp;
                }
              }

              return (
                <Post
                  key={uuidv4()}
                  name={post.content.name}
                  subHeader={post.content.subHeader}
                  message=""
                  avatar={post.content.photoURL}
                  timestamp={post.content.timestamp}
                  email={post.content.email}
                  postImage={post.content.url}
                  caption=""
                  postId={post.content.postId}
                  likes={post.content.likes}
                  likedBy={post.content.likedBy}
                  userEmail={post.content.email}
                  collectionName={"photos"}
                />
              );

            case "videos":
              {
                if (
                  post.content &&
                  post.content.timestamp &&
                  typeof post.content.timestamp.toDate === "function"
                ) {
                  post.content.timestamp = post.content.timestamp
                    .toDate()
                    .toString()
                    .split(" ")
                    .slice(1, 4)
                    .join("-");
                  overAllTime = post.content.timestamp;
                }
              }

              return (
                <Post
                  key={uuidv4()}
                  name={post.content.name}
                  subHeader={post.content.subHeader}
                  message=""
                  avatar={post.content.photoURL}
                  timestamp={post.content.timestamp}
                  email={post.content.email}
                  postvideo={post.content.url}
                  caption=""
                  postId={post.content.postId}
                  likes={post.content.likes}
                  likedBy={post.content.likedBy}
                  userEmail={post.content.email}
                  collectionName={"videos"}
                />
              );
          }
        })
      )}
    </div>
  );
};

export default Feed;
