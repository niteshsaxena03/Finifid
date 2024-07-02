import React, { useEffect, useState } from 'react'
import { getNews } from './getNewsApi'
import { v4 as uuidv4 } from 'uuid';

const newsApi = ({end}) => {
    let [filterNews , setNews] = useState([]) ; 

    async function realNews(){
      let news = await getNews() ; 
      setNews(news) ;
    } ; 
    
    useEffect(()=>{
      
      async function getNews(){
        await realNews() ; 
      }

      getNews() ; 
    },[])




   function conciseDescription(text){
      return text.split(" ").slice(0,3).join(" ") ; 
   }
      

  return (
    <ul>
    {filterNews.map((mp) => (
      <li key={uuidv4()}>
        <div className="newsBox">
          <a href = {`${mp.url}`}><h5 className="newsFont">{mp.title}</h5></a>
          <p className="sideFont">{conciseDescription(mp.description)}<b> ...</b></p>
          <div className="sepLineNews" />
        </div>
      </li>
    ))}
  </ul>
  )
}

export default newsApi