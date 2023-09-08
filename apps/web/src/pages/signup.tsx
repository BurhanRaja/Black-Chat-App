import React, { useState } from "react";
import SignupForm from "../components/signup/SignupForm";
import { AiOutlineClose } from "react-icons/ai";
import Link from "next/link";

const Signup = () => {
  return (
    <>
      <section
        className="bg-gray-900"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgb(185 185 185 / 52%), rgb(4 36 129 / 73%)), url(/images/signup-in-4.jpg)`,
          height: "100%",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-end absolute right-10 top-5">
          <Link href="/">
            <AiOutlineClose className="text-black text-5xl font-bold" />
          </Link>
        </div>
        <div className="flex items-center justify-center mx-auto md:h-screen">
          {/* Validation is remaining */}
          <SignupForm />
        </div>
      </section>
    </>
  );
};

export default Signup;
