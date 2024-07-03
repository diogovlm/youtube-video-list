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
exports.fetchYouTubeData = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config/config");
const fetchYouTubeData = (query_1, ...args_1) => __awaiter(void 0, [query_1, ...args_1], void 0, function* (query, pageToken = '') {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search`;
    const response = yield axios_1.default.get(apiUrl, {
        params: {
            part: 'snippet',
            maxResults: 20,
            q: query,
            type: 'video',
            key: config_1.config.youtubeApiKey,
            pageToken: pageToken
        }
    });
    return response.data;
});
exports.fetchYouTubeData = fetchYouTubeData;
