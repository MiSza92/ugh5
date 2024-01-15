import connectMongo from "@/app/config/mongo";
import Listing from "@/app/schemas/listing";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";
import mongoose from "mongoose";

export async function POST(request: Request) {
  const formData = await request.formData();

  const title = formData.get("title");
  const tasks = formData.get("tasks");
  const location = formData.get("location");
  const info = formData.get("info");
  const images = formData.getAll("images");
  const minGuests = formData.get("minGuests");
  const maxGuests = formData.get("maxGuests");
  const data = formData.get("user");
  const user = new mongoose.Types.ObjectId(data?.toString());

  try {
    await connectMongo();

    if (await Listing.findOne({ title })) {
      return NextResponse.json(
        { message: `Title already exists.` },
        { status: 501 }
      );
    }

    await Listing.create({
      title,
      tasks,
      location,
      info,
      images,
      minGuests,
      maxGuests,
      user,
    });

    return NextResponse.json({
      message: `Listing ${title} was created.`,
    });
  } catch (error) {
    console.error("Error processing images upload:", error);
    return NextResponse.json({ message: "Internal server error." });
  }
}
