"use client";
import Image from "next/image";
import User from "../schemas/user";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface avatarProps {
  image: string;
}
const Avatar: React.FC<avatarProps> = ({ image }) => {
  return (
    <Image
      className="rounded-full"
      height="30"
      width="30"
      alt="Avatar"
      src={image}
    />
  );
};

export default Avatar;
