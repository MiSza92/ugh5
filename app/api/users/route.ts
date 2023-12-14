import connectMongo from "@/app/config/mongo";
import User from "@/app/schemas/user";

import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    await connectMongo();

    const url = new URL(request.url);
    const email = url.searchParams.get("email");
    if (!email) {
      return NextResponse.json(
        { message: "Email parameter is missing." },
        { status: 400 }
      );
    }

    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json(
        { message: `Found user with EMail ${email}.`, user },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: `Didn't find user with EMail ${email}.` },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error processing GET request:", error);
    return NextResponse.json(
      { message: "Internal server error." },
      { status: 500 }
    );
  }
}

// export async function POST(request: Request) {
//   const formData = await request.formData();

//   const name = formData.get("name");
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const image = formData.get("image");

//   try {
//     await connectMongo();

//     if (await User.findOne({ name: name })) {
//       if (name) {
//         return NextResponse.json(
//           { message: `Username already exists.` },
//           { status: 501 }
//         );
//       }
//     } else if (await User.findOne({ email: email })) {
//       if (email) {
//         return NextResponse.json(
//           { message: `Email already exists.` },
//           { status: 501 }
//         );
//       }
//     }

//     await User.create({ name, email, password, image });

//     return NextResponse.json({
//       message: `User ${name} was created.`,
//       //  message: `User  was created.`,
//     });
//   } catch (error) {
//     console.error("Error processing image upload:", error);
//     return NextResponse.json({ message: "Internal server error." });
//   }
// }

// export async function POST(request: Request) {
//   const formData = await request.formData();
//   //  const { name, email, password } = await request.json();

//   const name = formData.get("name");
//   const email = formData.get("email");
//   const password = formData.get("password");
//   const userImage = formData.get("userImage");

//   console.log("Name:", name);
//   console.log("Email:", email);
//   console.log("Password:", password);
//   console.log("userImage:", userImage);

//   await connectMongo();

//   if (await User.findOne({ name: name })) {
//     if (name) {
//       return NextResponse.json(
//         { message: `Username already exists.` },
//         { status: 501 }
//       );
//     }
//   } else if (await User.findOne({ email: email })) {
//     if (email) {
//       return NextResponse.json(
//         { message: `Email already exists.` },
//         { status: 501 }
//       );
//     }
//   }

//   await User.create({ name, email, password, userImage: imageSecureUrl });
//   return NextResponse.json(
//     { message: `User ${name} was created.` },
//     { status: 201 }
//   );
// }
// export async function POST(request: Request) {
//   const { email } = await request.json();
//   console.log("request Email :>> ", email);
//   if (await User.findOne({ email: email })) {
//     const user = await User.findOne({ email: email });
//     return NextResponse.json({ message: user }, { status: 201 });
//   }
// }
export async function PATCH(request: Request) {
  const { name, newName, email, newEmail } = await request.json();
  if (name != null && newName.length > 1) {
    console.log("name :>> ", name);
    console.log("newName :>> ", newName);
    await connectMongo();
    if ((await User.find({ name: newName })).length >= 1) {
      return NextResponse.json(
        { message: "Username already taken." },
        { status: 501 }
      );
    }
    if ((await User.findOne({ name: name })) != null) {
      await User.findOneAndUpdate({ name: name }, { name: newName });
      return NextResponse.json(
        { message: `User with name '${name}' was updated to '${newName}'.` },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Didn't find User with this name." },
        { status: 501 }
      );
    }
  } else if (email != null && newEmail != null) {
    console.log("email :>> ", email);
    console.log("newEmail :>> ", newEmail);
    await connectMongo();
    if ((await User.find({ email: newEmail })).length >= 1) {
      return NextResponse.json(
        { message: "Email already taken." },
        { status: 501 }
      );
    }
    if ((await User.findOne({ email: email })) != null) {
      await User.findOneAndUpdate({ email: email }, { email: newEmail });
      return NextResponse.json(
        { message: `User with email '${email}' was updated to '${newEmail}'.` },
        { status: 201 }
      );
    } else {
      return NextResponse.json(
        { message: "Didn't find User with this email." },
        { status: 501 }
      );
    }
  }
}
export async function DELETE(request: Request) {
  const { email } = await request.json();
  await connectMongo();
  if ((await User.findOne({ email: email })) != null) {
    await User.findOneAndDelete({ email: email });
    return NextResponse.json(
      { message: `User with email \"${email}\" was deleted.` },
      { status: 201 }
    );
  } else {
    return NextResponse.json(
      { message: "Didn't find User with this email" },
      { status: 501 }
    );
  }
}
