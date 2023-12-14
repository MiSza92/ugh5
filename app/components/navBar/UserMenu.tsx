"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loginIsOpen, setLoginIsOpen] = useState<boolean>(false);
  const [RegisterIsOpen, setRegisterIsOpen] = useState<boolean>(false);

  const toggleLogin = () => setLoginIsOpen(!loginIsOpen);
  const toggleRegister = () => setRegisterIsOpen(!RegisterIsOpen);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);
  return (
    <div className="relative">
      <div
        className="
        flex
    flex-row
    items-center
    gap-3"
      >
        <div
          onClick={() => {}}
          className="
          text-sm 
          font-semibold 
          py-3 
          px-4 
          rounded-full 
          hover:bg-neutral-100 
          transition 
          cursor-pointer"
        >
          Offer your home
        </div>
        <div
          onClick={toggleOpen}
          className="
        py-2.5
        px-3
        border-[1px]
        border-neutral-200
        flex
        flex-row
        items-center
        gap-3
        rounded-full
        cursor-pointer
        hover:shadow-md
        transition
        "
        >
          <AiOutlineMenu />
          <div className="">
            <Avatar />
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          className="
        absolute
        rounded-xl
        shadow-md
        w-2/3
        bg-white
        overflow-hidden
        right-0
        top-12
        text-sm"
        >
          <div
            className="
            flex
            flex-col
            cursor-pointer"
          >
            <>
              <MenuItem onClick={toggleLogin} label="Login" />
              <LoginModal open={loginIsOpen} onClose={toggleLogin} />
              <MenuItem onClick={toggleRegister} label="Register" />
              {RegisterIsOpen && (
                <RegisterModal open={RegisterIsOpen} onClose={toggleRegister} />
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
