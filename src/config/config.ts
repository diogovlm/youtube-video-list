import dotenv from 'dotenv';

dotenv.config();

export const config = {
  youtubeApiKey: process.env.YOUTUBE_API_KEY as string,
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000
};
