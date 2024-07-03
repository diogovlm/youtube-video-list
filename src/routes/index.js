const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');
const { login, logout } = require('../controllers/authController');


router.get('/search', searchController.searchVideos);

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;


