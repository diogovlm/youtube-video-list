import express, { Request, Response, Router } from 'express';
import mongoose, { Model } from 'mongoose';
import { login, logout } from '../controllers/authController';
import { FavoriteDocument, favoriteSchema } from '../models/favorites';

const router: Router = express.Router();

function getFavoriteModel(userId: string): Model<FavoriteDocument> {
  const collectionName = `favorites_${userId}`;
  if (mongoose.connection.models[collectionName]) {
    return mongoose.connection.models[collectionName] as Model<FavoriteDocument>;
  }
  return mongoose.model<FavoriteDocument>(collectionName, favoriteSchema, collectionName);
}

router.post('/initFavoriteModel', (req: Request, res: Response): void => {
  const { userId } = req.body;
  getFavoriteModel(userId);
  res.status(200).send('Favorite model initialized');
});

router.post('/favorites', async (req: Request, res: Response): Promise<void> => {
  const { userId, video } = req.body;
  const Favorite = getFavoriteModel(userId);
  try {
    let favorite = await Favorite.findOne({ 'video.id.videoId': video.id.videoId });
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

router.delete('/favorites', async (req: Request, res: Response): Promise<void> => {
  const { userId, video } = req.body;
  const Favorite = getFavoriteModel(userId);
  try {
    await Favorite.deleteOne({ 'video.id.videoId': video.id.videoId });
    const favorites = await Favorite.find();
    res.status(200).json({ message: 'Video removed from favorites', newCount: favorites.length });
  } catch (error) {
    console.error('ServerError:', error);
    res.status(500).json({ message: 'Server error', error });
  }
});

router.get('/favorites/:userId', async (req: Request, res: Response): Promise<void> => {
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

export default router;
