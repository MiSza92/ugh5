"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
const Logo = () => {
  const router = useRouter();
  return (
    <Image
      alt="Logo"
      className="cursor-pointer"
      height="70"
      width="70"
      src="/holiday_travel_vacation_beach_icon_225385.png"
    />
  );
};

export default Logo;
