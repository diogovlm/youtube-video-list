"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger = (message) => {
    console.log(`[${new Date().toISOString()}] ${message}`);
};
exports.default = logger;
