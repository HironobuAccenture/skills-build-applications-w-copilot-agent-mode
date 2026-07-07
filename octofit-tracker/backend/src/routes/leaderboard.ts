import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).populate('userId', 'name').sort({ rank: 1 }).lean<any[]>();
    res.json(
      leaderboard.map((entry) => ({
        rank: entry.rank,
        points: entry.points,
        userName: entry.userId?.name || 'Unknown',
      })),
    );
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch leaderboard', error });
  }
});

export default router;
