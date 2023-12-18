import connectMongo from "@/app/config/mongo";
import Listing from "@/app/schemas/listing";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  console.log("formData :>> ", formData);

  const title = formData.get("title");
  // const description = formData.get("description");
  const tasks = formData.get("tasks");
  const location = formData.get("location");
  const info = formData.get("info");
  const images = formData.getAll("images");
  const minGuests = formData.get("minGuests");
  const maxGuests = formData.get("maxGuests");

  console.log("images :>> ", images);
  try {
    await connectMongo();

    if (await Listing.findOne({ title: title })) {
      if (title) {
        return NextResponse.json(
          { message: `Title already exists.` },
          { status: 501 }
        );
      }
    }

    await Listing.create({
      title,
      // description,
      tasks,
      location,
      info,
      images,
      minGuests,
      maxGuests,
    });

    return NextResponse.json({
      message: `Listing ${title} xssxs was created.`,
      //  message: `User  was created.`,
    });
  } catch (error) {
    console.error("Error processing images upload:", error);
    return NextResponse.json({ message: "Internal server error." });
  }
}
