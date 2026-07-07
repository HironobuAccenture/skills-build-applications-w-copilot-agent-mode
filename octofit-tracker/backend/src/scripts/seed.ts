import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import LeaderboardEntry from '../models/leaderboard';
import Workout from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';

/**
 * Seed the octofit_db database with test data.
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      { name: 'Ava Chen', email: 'ava@example.com', role: 'admin', fitnessGoal: 'Run a half marathon' },
      { name: 'Noah Patel', email: 'noah@example.com', role: 'member', fitnessGoal: 'Build strength' },
      { name: 'Mina Alvarez', email: 'mina@example.com', role: 'coach', fitnessGoal: 'Increase mobility' },
    ]);

    const teams = await Team.insertMany([
      { name: 'Velocity', members: 6, goal: 'Marathon prep', sport: 'Running' },
      { name: 'Summit', members: 4, goal: 'Strength challenge', sport: 'Cross-training' },
    ]);

    const activities = await Activity.insertMany([
      { type: 'run', duration: 35, calories: 420, date: new Date('2026-07-01'), userId: users[0]._id },
      { type: 'strength', duration: 50, calories: 480, date: new Date('2026-07-02'), userId: users[1]._id },
      { type: 'yoga', duration: 30, calories: 180, date: new Date('2026-07-03'), userId: users[2]._id },
    ]);

    await LeaderboardEntry.insertMany([
      { userId: users[0]._id, points: 980, rank: 1 },
      { userId: users[1]._id, points: 940, rank: 2 },
      { userId: users[2]._id, points: 910, rank: 3 },
    ]);

    await Workout.insertMany([
      { name: 'HIIT Core', difficulty: 'intermediate', duration: 20, focus: 'Core endurance' },
      { name: 'Mobility Flow', difficulty: 'beginner', duration: 15, focus: 'Flexibility' },
      { name: 'Hill Intervals', difficulty: 'advanced', duration: 30, focus: 'Cardio' },
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log(`Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, and workout data.`);

    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
