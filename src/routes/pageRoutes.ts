import express, { Request, Response, Router } from 'express';
import path from 'path';
import { searchVideos } from '../controllers/searchController';

const router: Router = express.Router();

const showVideosPage = (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '../../public/pages/videos/videos.html'));
};

const showFavoritesPage = (req: Request, res: Response): void => {
  res.sendFile(path.join(__dirname, '../../public/pages/favorites/favorites.html'));
};

router.get('/', showVideosPage);
router.get('/videos', showVideosPage);
router.get('/favorites', showFavoritesPage);
router.get('/search', searchVideos);

export default router;
