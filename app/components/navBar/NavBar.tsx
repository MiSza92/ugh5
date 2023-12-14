"use client";

import User from "@/app/schemas/user";
import Container from "../Container";
import Logo from "./Logo";
import UserMenu from "./UserMenu";
import Categories from "./Categories";

const NavBar = () => {
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
      <Categories />
    </div>
  );
};

export default NavBar;
