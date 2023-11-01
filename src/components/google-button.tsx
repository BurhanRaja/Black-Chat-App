"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const GoogleButton = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  const handleSubmit = async () => {
    let res = await signIn("google");
    if (res?.ok) {
      router.push("/servers/@me");
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center p-2 border border-gray-600 hover:border-white hover:bg-white hover:text-black w-[70%] rounded-sm my-4 shadow-lg shadow-gray-800"
        onClick={handleSubmit}
      >
        {status === "loading" ? (
          <AiOutlineLoading3Quarters className="animate-spin text-lg text-white" />
        ) : (
          ""
        )}
        <FcGoogle className="mr-2 text-xl" />
        <p>Google</p>
      </button>
    </>
  );
};

export default GoogleButton;
