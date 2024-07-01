require('dotenv').config();

module.exports = {
    youtubeApiKey: process.env.YOUTUBE_API_KEY,
    port: process.env.PORT || 3000
};
