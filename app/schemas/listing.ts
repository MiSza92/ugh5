import mongoose, { Schema } from "mongoose";

type Listing = {
  title: String;
  description: String;
  tasks: [String];
  location: String;
  info: String;
  image: [String];
  minGuests: number;
  maxGuests: number;
};

const listingSchema = new Schema<Listing>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    tasks: { type: [String], required: true },
    location: { type: String, required: true },
    info: { type: String, required: true },
    image: { type: [String], required: true },
    minGuests: { type: Number, required: true },
    maxGuests: { type: Number, required: true },
  },
  { timestamps: true }
);

const Listing =
  mongoose.models.Listing || mongoose.model<Listing>("Listing", listingSchema);

export default Listing;
