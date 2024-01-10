// lib\dbConnect.js
import mongoose from "mongoose";

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  //   dbName: "Database name",
};

// This function can be called to ensure that the database connection is established.
const dbConnect = async () => {
  // Check if we have a connection to the database or if it's currently
  // connecting or disconnecting (in which case we don't want to connect again).
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose
    .connect(process.env.MONGODB_URI, options)
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    });
};

export default dbConnect;
