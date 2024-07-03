const mongoose = require('mongoose');

const favoriteSchema = new mongoose.Schema({
  video: {
    type: Object,
    required: true,
  },
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;
