"use client";
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useEffect, useState } from "react";
import MenuItem from "./MenuItem";
import LoginModal from "../modals/LoginModal";
import RegisterModal from "../modals/RegisterModal";
import User from "@/app/schemas/user";
import ListModal from "../modals/ListModal";
import { useSession } from "next-auth/react";

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [loginIsOpen, setLoginIsOpen] = useState<boolean>(false);
  const [registerIsOpen, setRegisterIsOpen] = useState<boolean>(false);
  const [listIsOpen, setListIsOpen] = useState<boolean>(false);

  const toggleLogin = () => setLoginIsOpen(!loginIsOpen);
  const toggleRegister = () => setRegisterIsOpen(!registerIsOpen);
  const toggleList = () => setListIsOpen(!listIsOpen);
  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const { data: session, status } = useSession();
  const [image, setImage] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      const img = session?.user?.image;
      setImage(img as string);
    } else {
      const img =
        "https://res.cloudinary.com/dfoxcy8gx/image/upload/v1702563527/ugh5/avatar/awdj711nwvnx8c9yuduk.png";
      setImage(img as string);
    }
  }, [image, session]);
  const onRent = useCallback(() => {
    if (!session?.user) {
      toggleLogin();
      console.log("kein user :>> ");
    } else {
      toggleList();
    }
  }, [session]);

  return (
    <div className="relative ">
      <div
        className="
        flex
    flex-row
    items-center
    gap-3"
      >
        <div
          onClick={onRent}
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
          Offer your task
          {listIsOpen && <ListModal open={listIsOpen} onClose={toggleList} />}
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
            <Avatar image={image} />
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
              {loginIsOpen && (
                <LoginModal open={loginIsOpen} onClose={toggleLogin} />
              )}
              <MenuItem onClick={toggleRegister} label="Register" />
              {registerIsOpen && (
                <RegisterModal open={registerIsOpen} onClose={toggleRegister} />
              )}
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
