import mongoose, { Document, Schema, Model } from 'mongoose';

interface Video {
  id: {
    videoId: string;
  };
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

interface FavoriteDocument extends Document {
  userId: string;
  video: Video;
}

const favoriteSchema = new Schema<FavoriteDocument>({
  userId: { type: String, required: true },
  video: {
    id: {
      videoId: { type: String, required: true }
    },
    snippet: {
      title: { type: String, required: true },
      description: { type: String, required: true },
      thumbnails: {
        default: {
          url: { type: String, required: true }
        }
      }
    }
  }
});

const Favorite: Model<FavoriteDocument> = mongoose.model<FavoriteDocument>('Favorite', favoriteSchema);

export { Favorite, FavoriteDocument, favoriteSchema };
