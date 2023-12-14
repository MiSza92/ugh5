import mongoose, { Schema } from "mongoose";

type User = {
  name: String;
  email: String;
  password: String;
  image: String;
};

const userSchema = new Schema<User>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model<User>("User", userSchema);

export default User;
