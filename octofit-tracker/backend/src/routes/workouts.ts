import { Router } from 'express';
import Workout from '../models/workout';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const workouts = await Workout.find({}).lean();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch workouts', error });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).lean();
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    return res.json(workout);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to fetch workout', error });
  }
});

export default router;
