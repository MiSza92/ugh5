"use client";
import React, { useEffect, useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (res?.error) {
        setError("Invalid Credentials");
        return;
      }
      router.push("profile");
    } catch (error) {
      console.log("something went wrong with login :>> ", error);
    }
  };
  const bodyContent = (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2  rounded-lg ">
      <input
        onChange={(e) => setEmail(e.target.value)}
        type="text"
        placeholder="Email"
        className="bg-zinc-100 rounded-lg  "
      />{" "}
      <input
        onChange={(e) => setPassword(e.target.value)}
        type="password"
        placeholder="Password"
        className="bg-zinc-100 rounded-lg"
      />
    </form>
  );
  return (
    <Modal
      title="Login"
      isOpen={open}
      onClose={onClose}
      actionLabel="Login now"
      action={handleSubmit}
      error={error}
      body={bodyContent}
    ></Modal>
  );
};

export default LoginModal;
