"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose_1.default.connection;
mongoose_1.default.connect(connectionString).catch((error) => {
    console.error('MongoDB connection failed. Continuing without a live database connection:', error);
});
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to octofit_db');
});
exports.default = db;
