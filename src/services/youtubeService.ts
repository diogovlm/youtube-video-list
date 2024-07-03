import axios from 'axios';
import { config } from '../config/config';

interface YouTubeApiResponse {
  items: any[];
  nextPageToken?: string;
  prevPageToken?: string;
}

export const fetchYouTubeData = async (query: string, pageToken: string = ''): Promise<YouTubeApiResponse> => {
  const apiUrl = `https://www.googleapis.com/youtube/v3/search`;
  const response = await axios.get(apiUrl, {
    params: {
      part: 'snippet',
      maxResults: 20,
      q: query,
      type: 'video',
      key: config.youtubeApiKey,
      pageToken: pageToken
    }
  });
  return response.data;
};
