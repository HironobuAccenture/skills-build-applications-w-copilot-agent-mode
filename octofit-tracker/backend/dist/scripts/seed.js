"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("../models/user"));
const team_1 = __importDefault(require("../models/team"));
const activity_1 = __importDefault(require("../models/activity"));
const leaderboard_1 = __importDefault(require("../models/leaderboard"));
const workout_1 = __importDefault(require("../models/workout"));
const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.default.deleteMany({}),
            team_1.default.deleteMany({}),
            activity_1.default.deleteMany({}),
            leaderboard_1.default.deleteMany({}),
            workout_1.default.deleteMany({}),
        ]);
        const users = await user_1.default.insertMany([
            { name: 'Ava Chen', email: 'ava@example.com', role: 'admin', fitnessGoal: 'Run a half marathon' },
            { name: 'Noah Patel', email: 'noah@example.com', role: 'member', fitnessGoal: 'Build strength' },
            { name: 'Mina Alvarez', email: 'mina@example.com', role: 'coach', fitnessGoal: 'Increase mobility' },
        ]);
        const teams = await team_1.default.insertMany([
            { name: 'Velocity', members: 6, goal: 'Marathon prep', sport: 'Running' },
            { name: 'Summit', members: 4, goal: 'Strength challenge', sport: 'Cross-training' },
        ]);
        const activities = await activity_1.default.insertMany([
            { type: 'run', duration: 35, calories: 420, date: new Date('2026-07-01'), userId: users[0]._id },
            { type: 'strength', duration: 50, calories: 480, date: new Date('2026-07-02'), userId: users[1]._id },
            { type: 'yoga', duration: 30, calories: 180, date: new Date('2026-07-03'), userId: users[2]._id },
        ]);
        await leaderboard_1.default.insertMany([
            { userId: users[0]._id, points: 980, rank: 1 },
            { userId: users[1]._id, points: 940, rank: 2 },
            { userId: users[2]._id, points: 910, rank: 3 },
        ]);
        await workout_1.default.insertMany([
            { name: 'HIIT Core', difficulty: 'intermediate', duration: 20, focus: 'Core endurance' },
            { name: 'Mobility Flow', difficulty: 'beginner', duration: 15, focus: 'Flexibility' },
            { name: 'Hill Intervals', difficulty: 'advanced', duration: 30, focus: 'Cardio' },
        ]);
        console.log('Seed the octofit_db database with test data');
        console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workout data.`);
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
