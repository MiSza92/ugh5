"use client";
import React, { useState } from "react";
import Modal from "./Modal";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, onClose }) => {
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

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

  return (
    <Modal
      title="Login"
      open={open}
      onClose={onClose}
      actionLabel="Login now"
      action={handleSubmit}
      error={error}
    >
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-2  rounded-lg "
      >
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
      {error && (
        <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-lg mt-2">
          {error}
        </div>
      )}
    </Modal>
  );
};

export default LoginModal;
