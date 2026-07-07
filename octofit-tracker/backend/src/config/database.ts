import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db';
const db = mongoose.connection;

mongoose.connect(connectionString).catch((error) => {
  console.error('MongoDB connection failed. Continuing without a live database connection:', error);
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to octofit_db');
});

export default db;
