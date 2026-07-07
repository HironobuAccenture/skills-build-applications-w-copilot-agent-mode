import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  type: string;
  duration: number;
  calories: number;
  date: Date;
  userId?: mongoose.Types.ObjectId;
}

const activitySchema = new Schema<IActivity>(
  {
    type: { type: String, required: true },
    duration: { type: Number, required: true },
    calories: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export default mongoose.model<IActivity>('Activity', activitySchema);
