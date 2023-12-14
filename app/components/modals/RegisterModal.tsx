import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import ImageUploadWidget from "../upload/ImageUploadWidget";

interface RegisterModalProps {
  open: boolean;
  onClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, onClose }) => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    if (!name || !password || !email || !image) {
      setError("all Fields must be applied");
    }
    try {
      console.log("image :>> ", image);
      if (image !== "") {
        const formdata = new FormData();
        formdata.append("email", email);
        formdata.append("name", name);
        formdata.append("password", password);
        formdata.append("image", image);

        const res = await fetch("api/users", {
          method: "POST",
          body: formdata,
        });

        if (res.ok) {
          alert("Registration successful");
          onClose();
        } else {
          console.log("Registration failed :>> ");
          const { message } = await res.json();
          console.log("message :>> ", message);
        }
      }
    } catch (error) {
      console.log("something went wrong with registration :>> ", error);
    }
  };

  const bodyContent = (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="flex flex-col gap-2 rounded-lg"
    >
      <input
        onChange={(e) => setName(e.target.value)}
        type="text"
        placeholder="Username"
        className="bg-zinc-100 rounded-lg"
      />
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        className="bg-zinc-100 rounded-lg"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="bg-zinc-100 rounded-lg"
      />
      <ImageUploadWidget
        value={image}
        onChange={async (url) => {
          await setImage(url);
        }}
      />
    </form>
  );

  return (
    <Modal
      title="Register"
      isOpen={open}
      onClose={onClose}
      actionLabel="Register now"
      action={handleSubmit}
      error={error}
      body={bodyContent}
    />
  );
};

export default RegisterModal;
