import axios from 'axios';

let q = 'Facebook';
const newsapi = `https://newsapi.org/v2/everything?q=${q}&apiKey=1f16c9c0ce704f0898301082e53998ff`;

async function getNews() {
  try {
    const response = await axios.get(newsapi);
    let data = response.data.articles;

    // Ensure we have enough articles to choose from
    if (data.length < 5) {
      throw new Error('Not enough articles to select from');
    }

    let filterNews = [];
    let indicesUsed = new Set();

    while (filterNews.length < 5) {
      let randomIndex = Math.floor(Math.random() * data.length);

      // Ensure unique index and valid article
      if (!indicesUsed.has(randomIndex) && data[randomIndex].title !== "[Removed]") {
        indicesUsed.add(randomIndex);
        filterNews.push(data[randomIndex]);
      }
    }

    return filterNews;
  } catch (error) {
    console.error('Error fetching news:', error);
    return [];
  }
}

export { getNews };
