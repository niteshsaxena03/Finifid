// const express = require('express');
// const axios = require('axios');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 3001; // Port for your server

// // Enable CORS for all routes
// app.use(cors());

// // Endpoint to fetch news from News API
// app.get('/api/news', async (req, res) => {
//   try {
//     let q = 'facebook';
//     const newsapi = `https://newsapi.org/v2/everything?q=${q}&apiKey=1f16c9c0ce704f0898301082e53998ff`;

//     const response = await axios.get(newsapi);
//     let data = response.data.articles;

//     // Ensure we have enough articles to choose from
//     if (data.length < 5) {
//       throw new Error('Not enough articles to select from');
//     }

//     let filterNews = [];
//     let indicesUsed = new Set();

//     while (filterNews.length < 5) {
//       let randomIndex = Math.floor(Math.random() * data.length);

//       // Ensure unique index and valid article
//       if (!indicesUsed.has(randomIndex) && data[randomIndex].title !== "[Removed]") {
//         indicesUsed.add(randomIndex);
//         filterNews.push(data[randomIndex]);
//       }
//     }

//     res.json(filterNews);
//   } catch (error) {
//     console.error('Error fetching news:', error);
//     res.status(500).json({ error: 'Failed to fetch news' });
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
