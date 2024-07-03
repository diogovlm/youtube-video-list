import { Request, Response } from 'express';
import { fetchYouTubeData } from '../services/youtubeService';

export const searchVideos = async (req: Request, res: Response): Promise<void> => {
  const query = req.query.query as string;
  const pageToken = req.query.pageToken as string || '';
  
  try {
    const data = await fetchYouTubeData(query, pageToken);
    res.json(data);
  } catch (error) {
    res.status(500).send('Error fetching data from YouTube API');
  }
};
