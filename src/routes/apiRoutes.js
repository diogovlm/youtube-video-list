
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { login, logout } = require('../controllers/authController');
const favoriteSchema = require('../models/favorites').schema;

function getFavoriteModel(userId) {
  const collectionName = `favorites_${userId}`;
  return mongoose.model(collectionName, favoriteSchema, collectionName);
}

router.post('/initFavoriteModel', (req, res) => {
  const { userId } = req.body;
  getFavoriteModel(userId);
  res.status(200).send('Favorite model initialized');
});

router.post('/favorites', async (req, res) => {
  const { userId, video } = req.body;
  const Favorite = getFavoriteModel(userId);
  try {
    let favorite = await Favorite.findOne({ video });
    if (!favorite) {
      favorite = new Favorite({ userId, video });
      await favorite.save();
    }
    const favorites = await Favorite.find();
    res.status(200).json({ message: 'Video added to favorites', newCount: favorites.length });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.delete('/favorites', async (req, res) => {
  const { userId, video } = req.body;
  const videoId = video.id;
  const Favorite = getFavoriteModel(userId);
  try {
    await Favorite.deleteOne({ 'video.id': videoId });
    const favorites = await Favorite.find();
    res.status(200).json({ message: 'Video removed from favorites', newCount: favorites.length });
  } catch (error) {
    console.error('ServerError:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/favorites/:userId', async (req, res) => {
  const { userId } = req.params;
  const Favorite = getFavoriteModel(userId);
  try {
    const favorites = await Favorite.find();
    res.status(200).json(favorites);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

router.post('/login', login);
router.post('/logout', logout);

module.exports = router;
