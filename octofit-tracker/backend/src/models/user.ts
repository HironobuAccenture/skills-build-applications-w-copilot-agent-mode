import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  role: string;
  fitnessGoal: string;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, default: 'changeme' },
    role: { type: String, default: 'member' },
    fitnessGoal: { type: String, default: 'Improve endurance' },
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', userSchema);
