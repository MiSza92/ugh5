"use client";
import { useState } from "react";
import RegisterModal from "./components/modals/RegisterModal";
import LoginModal from "./components/modals/LoginModal";

export default function Home() {
  const [loginIsOpen, setLoginIsOpen] = useState<boolean>(false);
  const [RegisterIsOpen, setRegisterIsOpen] = useState<boolean>(false);

  const toggleLogin = () => setLoginIsOpen(!loginIsOpen);
  const toggleRegister = () => setRegisterIsOpen(!RegisterIsOpen);

  return (
    <div
      className="flex flex-row gap-4 items-center justify-center w-full h-screen p-10"
      style={{
        backgroundImage: 'url("/ugh.jpeg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <button
        className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2  bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => {
          // setLoginIsOpen(true);
          setLoginIsOpen(!loginIsOpen);
        }}
      >
        Login
      </button>
      <LoginModal open={loginIsOpen} onClose={toggleLogin} />
      <button
        className="border border-neutral-300 rounded-lg py-1.5 px-10 my-2 bg-blue-500 hover:bg-blue-600 text-white"
        onClick={() => {
          setRegisterIsOpen(true);
        }}
      >
        Register
      </button>
      {RegisterIsOpen && (
        <RegisterModal open={RegisterIsOpen} onClose={toggleRegister} />
      )}
    </div>
  );
}
