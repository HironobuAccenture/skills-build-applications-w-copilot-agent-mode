import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  difficulty: string;
  duration: number;
  focus: string;
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true, trim: true },
    difficulty: { type: String, required: true },
    duration: { type: Number, required: true },
    focus: { type: String, default: 'Full-body strength' },
  },
  { timestamps: true },
);

export default mongoose.model<IWorkout>('Workout', workoutSchema);
