const axios = require('axios');
const config = require('../config/config');

exports.fetchYouTubeData = async (query) => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${config.youtubeApiKey}`;
    const response = await axios.get(apiUrl);
    return response.data;
};
