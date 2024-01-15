import connectMongo from "../config/mongo";
import Listing from "../schemas/listing";

export default async function getListings() {
  "use server";
  try {
    await connectMongo();
    const listings = await Listing.find().limit(50);
    return listings;
  } catch (error) {
    console.log("error :>> ", error);
  }
}
