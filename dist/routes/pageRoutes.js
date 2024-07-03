"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const searchController_1 = require("../controllers/searchController");
const router = express_1.default.Router();
const showVideosPage = (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../public/pages/videos/videos.html'));
};
const showFavoritesPage = (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../../public/pages/favorites/favorites.html'));
};
router.get('/', showVideosPage);
router.get('/videos', showVideosPage);
router.get('/favorites', showFavoritesPage);
router.get('/search', searchController_1.searchVideos);
exports.default = router;
