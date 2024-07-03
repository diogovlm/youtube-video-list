"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const authController_1 = require("../controllers/authController");
const favorites_1 = require("../models/favorites");
const router = express_1.default.Router();
function getFavoriteModel(userId) {
    const collectionName = `favorites_${userId}`;
    if (mongoose_1.default.connection.models[collectionName]) {
        return mongoose_1.default.connection.models[collectionName];
    }
    return mongoose_1.default.model(collectionName, favorites_1.favoriteSchema, collectionName);
}
router.post('/initFavoriteModel', (req, res) => {
    const { userId } = req.body;
    getFavoriteModel(userId);
    res.status(200).send('Favorite model initialized');
});
router.post('/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, video } = req.body;
    const Favorite = getFavoriteModel(userId);
    try {
        let favorite = yield Favorite.findOne({ 'video.id.videoId': video.id.videoId });
        if (!favorite) {
            favorite = new Favorite({ userId, video });
            yield favorite.save();
        }
        const favorites = yield Favorite.find();
        res.status(200).json({ message: 'Video added to favorites', newCount: favorites.length });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
router.delete('/favorites', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, video } = req.body;
    const Favorite = getFavoriteModel(userId);
    try {
        yield Favorite.deleteOne({ 'video.id.videoId': video.id.videoId });
        const favorites = yield Favorite.find();
        res.status(200).json({ message: 'Video removed from favorites', newCount: favorites.length });
    }
    catch (error) {
        console.error('ServerError:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}));
router.get('/favorites/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId } = req.params;
    const Favorite = getFavoriteModel(userId);
    try {
        const favorites = yield Favorite.find();
        res.status(200).json(favorites);
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}));
router.post('/login', authController_1.login);
router.post('/logout', authController_1.logout);
exports.default = router;
