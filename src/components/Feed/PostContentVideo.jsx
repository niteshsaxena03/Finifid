import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import '../../pages/SignUp/SignUpScreen.css';
import '../../pages/SignUp/form.css';
import SimpleBackdrop from '../Progress/LoadingBackDrop.jsx';
import {
  storage, db
} from '../../Firebase/firebaseContext.jsx';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { refreshContent, incCount } from '../../features/postCounter.js';
import { v4 as uuidv4 } from 'uuid';

const PostContentVideo= ({ data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { type } = useParams();

  const [button, setButton] = useState(false);
  const [profileDetails, setDetails] = useState({
    caption: '',
    video: null
  });
  const [error, setError] = useState(null);

  function handleAllChange(event) {
    const { name, value, files } = event.target;
    setDetails(prevDetails => ({
      ...prevDetails,
      [name]: files ? files[0] : value
    }));
  }

  async function updatePostData() {
    const userDocRef = doc(db, 'users', data.email);
    await setDoc(userDocRef, data);
    const userDoc = await getDoc(userDocRef);
    dispatch(incCount(userDoc.data().ProfileDetails.post));
  }

  const AddPhoto = async (e) => {
    e.preventDefault();
    setError(null);
    setButton(true);

    if (!profileDetails.video) {
      setError('Please select an video to upload.');
      setButton(false);
      return;
    }

    console.log("after submit",profileDetails)

    try {
      const videoRef = ref(storage, `Video/${data.email}/${profileDetails.video.name}`);
      await uploadBytes(videoRef, profileDetails.video);
      const url = await getDownloadURL(videoRef);

      const postId = uuidv4();
      const compositeKey = data.email + postId;
      const postDocRef = doc(db, 'videos', compositeKey);

      const photoData = {
        postId: postId,
        url: url,
        name: data.name,
        subHeader: data.profession,
        caption: profileDetails.caption,
        photoURL: data.ProfileDetails.profileImg,
        timestamp: serverTimestamp(),
        email: data.email,
        likes: 0,
        likedBy: [],
        comments: {},
        commentsCount: 0,
      };

      await setDoc(postDocRef, photoData);
      dispatch(refreshContent());

      data.ProfileDetails.post++;
      await updatePostData();

      navigate(type === 'profile' ? '/profile' : '/home');
    } catch (error) {
      console.error('Error uploading image:', error);
      setButton(false);
    }
  };

  return (
    <div className="loginScreen">
      {button ? (
        <span>
          <SimpleBackdrop /><br /><br /><br /><br />
          <p style={{ marginLeft: '5%', fontSize: '25px', width: '100%' }}>Uploading...</p>
        </span>
      ) : (
        <Card className="cardContainer mx-auto">
          <form onSubmit={AddPhoto}>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Add Your Video</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="caption">Caption</Label>
                  <Input
                    id="caption"
                    type="text"
                    placeholder="Write your caption..."
                    name="caption"
                    onChange={handleAllChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="backgroundVideo">Video</Label>
                  <Input
                    id="backgroundVideo"
                    type="file"
                    accept="video/*"
                    name="video"
                    onChange={handleAllChange}
                  />
                </div>
                {error && (
                  <div className="error-message text-red-500">{error}</div>
                )}
                <Button type="submit" className="w-full" variant="mehroon">
                  POST
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      )}
    </div>
  );
};

export { PostContentVideo };
