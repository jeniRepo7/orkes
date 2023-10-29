const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());

app.get('/api/photos/:page', async (req, res) => {
  try {
    const page = req.params.page;
    const response = await axios.get(`https://englishapi.pinkvilla.com/app-api/v1/photo-gallery-feed-page/page/${page}`);
    const data = response.data;
    res.json(data);
  } catch (error) {
    console.error('Error proxying request:', error);
    res.status(500).send('Error fetching data.');
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
