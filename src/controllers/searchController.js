const youtubeService = require('../services/youtubeService');

exports.searchVideos = async (req, res) => {
    const query = req.query.query;
    const pageToken = req.query.pageToken || '';
    try {
        const data = await youtubeService.fetchYouTubeData(query, pageToken);
        res.json(data);
    } catch (error) {
        res.status(500).send('Error fetching data from YouTube API');
    }
};
