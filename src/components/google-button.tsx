"use client";

import { FcGoogle } from "react-icons/fc";

const GoogleButton = () => {
  return (
    <>
      <button className="flex justify-center items-center p-2 border border-gray-600 hover:border-white hover:bg-white hover:text-black w-[70%] rounded-sm my-4 shadow-lg shadow-gray-800">
        <FcGoogle className="mr-2 text-xl" />
        <p>Google</p>
      </button>
    </>
  );
};

export default GoogleButton;
