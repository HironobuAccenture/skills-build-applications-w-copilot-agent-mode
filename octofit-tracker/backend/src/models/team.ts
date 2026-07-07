import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  members: number;
  goal: string;
  sport: string;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, trim: true },
    members: { type: Number, default: 0 },
    goal: { type: String, required: true },
    sport: { type: String, default: 'Cross-training' },
  },
  { timestamps: true },
);

export default mongoose.model<ITeam>('Team', teamSchema);
