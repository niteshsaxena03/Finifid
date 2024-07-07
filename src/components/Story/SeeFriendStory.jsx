import React from 'react'
import Stories from 'stories-react';
import 'stories-react/dist/index.css';
import './mainStory.css' ;

import { useState , useEffect } from 'react';

// Redux
import { useSelector } from 'react-redux';

function ImagesStories({data}) {

    const [ stories , setStories ] = useState([]) ;
 
    let story =  useSelector((State)=>State.postCounter.friendStory) ;

    useEffect(() => {

        console.log("Data - story " , story );   

        const fetchImages = async () => {
          try {
           
            if( story ){

              // Fetching Stories 
              const stories = story.map((url)=>(
                      {
                          type: "image",
                          url:url,
                          duration: 5000
                      }
              ))
              
              setStories(stories) ;
            }
           

          } catch (error) {

            console.error("Error fetching images:", error);

          }

        };


    
        fetchImages();
      }, [data]);

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

  

      export default function MainStory({data}) {
        return (
          <div className="App">
            {console.log("data at main :" , data )}
            <h1 className='fontStoryHead'>Story</h1>
            <div style={{ display: "flex", justifyContent: "center" }} >
              <ImagesStories data={data}/>
            </div>
          </div>
        );
}

