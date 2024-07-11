const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Define the proxy endpoint
app.get('/trends', (req, res) => {
  const apiUrl = 'https://trendserver.onrender.com/trends';
  request(apiUrl, (error, response, body) => {
    if (error) {
      res.status(500).send(error);
    } else {
      res.send(body);
    }
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
