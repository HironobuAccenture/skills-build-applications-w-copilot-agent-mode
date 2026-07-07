"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const team_1 = __importDefault(require("../models/team"));
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    try {
        const teams = await team_1.default.find({}).lean();
        res.json(teams);
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to fetch teams', error });
    }
});
router.get('/:id', async (req, res) => {
    try {
        const team = await team_1.default.findById(req.params.id).lean();
        if (!team) {
            return res.status(404).json({ message: 'Team not found' });
        }
        return res.json(team);
    }
    catch (error) {
        return res.status(500).json({ message: 'Failed to fetch team', error });
    }
});
exports.default = router;
