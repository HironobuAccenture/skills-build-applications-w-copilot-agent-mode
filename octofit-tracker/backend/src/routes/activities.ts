import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find({}).sort({ date: -1 }).lean();
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch activities', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id).lean();
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }

    return res.json(activity);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch activity', error });
  }
});

export default router;
