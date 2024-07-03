const express = require('express');
const router = express.Router();
const path = require('path');
const searchController = require('../controllers/searchController');

const showVideosPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/videos/videos.html'));
};

const showFavoritesPage = (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/pages/favorites/favorites.html'));
};

router.get('/', showVideosPage);
router.get('/videos', showVideosPage);
router.get('/favorites', showFavoritesPage);
router.get('/search', searchController.searchVideos);

module.exports = router;

