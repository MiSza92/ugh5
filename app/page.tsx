"use client";
import ImageUploadWidget from "./components/upload/ImageUploadWidget";
import { useEffect, useState } from "react";

export default function Home() {
  const [image, setImage] = useState("");

  useEffect(() => {
    setImage(image);
    console.log("Image updated:", image);
  }, [image]);

  const handleSubmit = async () => {
    // e.preventDefault();
    // if (!name || !email || !password) {
    //   setError("All fields are necessary");
    //   return;
    // }

    try {
      console.log("image :>> ", image);
      if (image != "") {
        const formdata = new FormData();
        const name = "name";
        const email = "email";
        const password = "password";
        //   formdata.append("userImage", userImage);
        formdata.append("email", email);
        formdata.append("name", name);
        formdata.append("password", password);
        formdata.append("image", image);

        const res = await fetch("api/users", {
          method: "POST",
          body: formdata,
        });

        if (res.ok) {
          alert("Registration succesful");
          //   setError("");
          // setIsOpen(false);
          //  router.push("/");
        } else {
          console.log("Registration failed :>> ");
          const { message } = await res.json();
          //  setError(message);
          console.log("message :>> ", message);
        }
      }
    } catch (error) {
      console.log("something went wrong with registration :>> ", error);
    }
  };

  return (
    <div>
      <ImageUploadWidget
        value={image}
        onChange={async (url) => {
          await setImage(url);
        }}
      />
      <button onClick={handleSubmit}>hallo</button>
    </div>
  );
}
