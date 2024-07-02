const axios = require('axios');
const config = require('../config/config');

exports.fetchYouTubeData = async (query, pageToken = '') => {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    const response = await axios.get(apiUrl, {
      params: {
        part: 'snippet',
        maxResults: 16,
        q: query,
        type: 'video',
        key: config.youtubeApiKey,
        pageToken: pageToken
      }
    });
    return response.data;
};
