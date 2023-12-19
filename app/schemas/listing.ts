import mongoose, { Schema } from "mongoose";

type Listing = {
  title: String;
  // description: String;
  tasks: String;
  location: String;
  info: String;
  images: string[];
  minGuests: number;
  maxGuests: number;
  user: mongoose.Schema.Types.ObjectId;
};

const listingsSchema = new Schema<Listing>(
  {
    title: { type: String, required: true },
    // description: { type: String, required: true },
    tasks: { type: String, required: true },
    location: { type: String, required: true },
    info: { type: String, required: true },
    images: { type: [String], required: true },
    //   images: [{ type: String, required: true }],
    minGuests: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
    //  user: { type: String, required: true },
    // user: { type: String, required: true, ref: "User" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    // user: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true }
);

const Listing =
  mongoose.models.Listings ||
  mongoose.model<Listing>("Listings", listingsSchema);

export default Listing;
