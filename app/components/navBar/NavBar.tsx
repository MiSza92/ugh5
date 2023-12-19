"use client";

import User from "@/app/schemas/user";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Tasks from "./Tasks";
import { useEffect } from "react";
import { Session } from "next-auth";
import { useSession } from "next-auth/react";

const NavBar = () => {
  // console.log("session :>> ", session);
  return (
    <div className=" w-full bg-blue-400 z-10 shadow-sm">
      <div className="py-2 border-b-[1px]">
        <Container>
          <div
            className="flex
        flex-row
        items-center
        justify-between
        gap-3
        "
          >
            <Logo />
            <UserMenu />
          </div>
        </Container>
      </div>
      {/* <Tasks /> */}
    </div>
  );
};

export default NavBar;
