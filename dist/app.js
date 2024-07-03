"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config/config");
const apiRoutes_1 = __importDefault(require("./routes/apiRoutes"));
const pageRoutes_1 = __importDefault(require("./routes/pageRoutes"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = (0, express_1.default)();
mongoose_1.default.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));
app.use(body_parser_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/api', apiRoutes_1.default);
app.use('/', pageRoutes_1.default);
app.listen(config_1.config.port, () => {
    console.log(`Server is running on http://localhost:${config_1.config.port}`);
});
