import mongoose from 'mongoose';

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // dbName: "Database name",
};

const dbConnect = () => {
  // Check if we have a connection to the database or if it's currently
  // connecting or disconnecting (in which case we don't want to connect again).
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  const db = mongoose.connection;

  // Event handlers for connection events
  db.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  db.on('error', (error) => {
    console.error('Failed to connect to MongoDB:', error);
  });

  return mongoose.connect(process.env.MONGODB_URI, options);
};

export default dbConnect;
