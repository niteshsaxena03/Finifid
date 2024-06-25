import React from 'react'
import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import './mainStory.css' ;  
import './StoryDesign.css'

import { useState , useEffect } from 'react';
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from '../../Firebase/firebaseContext';


import { useParams } from 'react-router-dom';


function ImagesStories() {

    const [stories, setStories] = useState([]);
    const { name } = useParams();



    useEffect(() => {
        const fetchImages = async () => {
          try {
            const listRef = ref(storage, `Story/Friend/${name}`);
            const res = await listAll(listRef);
            const urls = await Promise.all(
              res.items.map((itemRef) => getDownloadURL(itemRef))
            );


            // Fetching Stories 
            const stories = urls.map((url)=>(
                    {
                        type: "image",
                        url:url,
                        duration: 5000
                    }
            ))
            
            setStories(stories) ;

          } catch (error) {

            console.error("Error fetching images:", error);

          }

        };
    
        fetchImages();
      }, []);

      return (
        <div>
          {stories.length > 0 ? (
            <Stories width="400px" height="600px" stories={stories} />
          ) : (
            <p>Loading stories...</p>
          )}
        </div>
      );
    }

  

      export default function SeeFriendStory() {
        return (
          <div className="App">
            <h1 className='fontStoryHead'>Story</h1>
            <div style={{ display: "flex", justifyContent: "center" }} >
              <ImagesStories />
            </div>
          </div>
        );
}

