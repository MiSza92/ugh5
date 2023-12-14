import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log("Connected succesfully");
  } catch (error) {
    console.log("error :>> ", error);
  }
};
export default connectMongo;
