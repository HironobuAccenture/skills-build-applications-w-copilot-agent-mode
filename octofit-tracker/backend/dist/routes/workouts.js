"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workout_1 = __importDefault(require("../models/workout"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const workouts = await workout_1.default.find({}).lean();
        res.json(workouts);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch workouts', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const workout = await workout_1.default.findById(req.params.id).lean();
        if (!workout) {
            return res.status(404).json({ message: 'Workout not found' });
        }
        return res.json(workout);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch workout', error });
    }
});
exports.default = router;
