import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find({}).lean();
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch teams', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).lean();
    if (!team) {
      return res.status(404).json({ message: 'Team not found' });
    }

    return res.json(team);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch team', error });
  }
});

export default router;
