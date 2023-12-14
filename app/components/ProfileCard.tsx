"use client";
import { getServerSession } from "next-auth";
import { SessionContext, signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import User from "../schemas/user";

interface ProfileCardProps {
  data: {
    user: {
      id: string;
      name: string;
      email: string;
      image: string;
    };
  };
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  data: {
    user: { name, email, image },
  },
}) => {
  const [serverData, setServerData] = useState<User | null>(null);
  const getServerData = async () => {
    try {
      const res = await fetch(`api/users?email=${encodeURIComponent(email)}`, {
        method: "GET",
      });

      if (res.ok) {
        const { user } = await res.json();
        console.log("Received data:", user);
        setServerData(user);
        console.log("serverData :>> ", serverData);
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  return (
    <div className="flex items-center justify-center bg-blue-200 ">
      <div className=" w-2/3 mt-10 rounded-lg bg-white">
        <div className="flex items-center pl-2 pt-10 flex-row ">
          <img src={image} alt="avatar" className="rounded-full " />
          <div className="flex flex-col items-center">
            <h1 className="text-gray-800 font-semibold text-xl mt-5">
              Username: {name}
            </h1>
            <h2 className="text-gray-500 text-sm ">
              UserID: {serverData?._id}
            </h2>
            <p className="text-gray-500 text-sm p-4 text-center">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
              facere et tenetur id laboriosam iusto. At asperiores laudantium
              nihil, ipsa distinctio veritatis eaque culpa neque quidem earum
              obcaecati, illo minima. Nostrum quos alias quia enim maiores,
              ipsum, iure perferendis velit incidunt nihil autem in dignissimos
              aspernatur atque dolor inventore eveniet officiis unde, corrupti
              quasi illo quidem. Sapiente, hic! Illum, autem!{" "}
            </p>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <div>
            <p className="text-xs uppercase text-gray-500"> MemberSHip</p>
            <p className="text-xs text-yellow-500">Gold</p>
          </div>
          <div>
            <button
              onClick={getServerData}
              className="text-xs text-green-300 border-2 py-1 px-2 border-green-300"
            >
              Renew
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center mt-3 mb-6">
          <p className="text-xs text-gray-500">Get Connected</p>
          FB ICON
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
