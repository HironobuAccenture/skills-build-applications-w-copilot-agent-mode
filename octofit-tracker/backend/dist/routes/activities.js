"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const activity_1 = __importDefault(require("../models/activity"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const activities = await activity_1.default.find({}).sort({ date: -1 }).lean();
        res.json(activities);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch activities', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const activity = await activity_1.default.findById(req.params.id).lean();
        if (!activity) {
            return res.status(404).json({ message: 'Activity not found' });
        }
        return res.json(activity);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch activity', error });
    }
});
exports.default = router;
