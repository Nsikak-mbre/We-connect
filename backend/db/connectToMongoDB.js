import mongooose from "mongoose";

const connectToMongoDB = async () => {
  try {
    await mongooose.connect(
      process.env.MONGO_DB_URI,
      console.log("MongoDB connected successfully")
    );
  } catch (error) {
    console.log("Error connecting to MongoDB: ", error);
  }
};

export default connectToMongoDB;
