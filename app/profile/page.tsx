"use client";

import { useEffect } from "react";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ProfileCard from "../components/ProfileCard";

export default function Profile() {
  const { data } = useSession();
  const router = useRouter();
  useEffect(() => {
    if (!data) {
      router.push("/");
    }
  }, [data]);
  return (
    data && (
      <div>
        <ProfileCard data={data}></ProfileCard>
        <button
          onClick={() => signOut()}
          className="bg-red-500 text-white font-bold px-6 py-2 my-3 "
        >
          Log out
        </button>
      </div>
    )
  );
}
