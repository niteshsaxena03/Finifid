import axios from "axios";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const NewsApi = ({ end }) => {
  const [filterNews, setFilterNews] = useState([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const news = (
          await axios.get("https://newsserver-bsja.onrender.com/api/news")
        ).data;
        setFilterNews(news);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    }

    fetchNews();
  }, [end]); // Fetch news whenever `end` changes

  const conciseDescription = (text) => {
    return text != null
      ? text.split(" ").slice(0, 3).join(" ") + " ..."
      : "Sorry! News Not Available";
  };

  return (
    <ul>
      {filterNews
        ? filterNews.map((mp) => (
            <li key={uuidv4()}>
              <div className="newsBox">
                <a href={mp.url}>
                  <h5 className="newsFont">{mp.title}</h5>
                </a>
                <p className="sideFont">{conciseDescription(mp.description)}</p>
                <div className="sepLineNews" />
              </div>
            </li>
          ))
        : null}
    </ul>
  );
};

export default NewsApi;
