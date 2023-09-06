import React, { useState } from "react";
import { tRPC } from "trpc/client";
import { useSession } from "next-auth/react";
import Layout from "../components/defaults/Layout";
import SignupImage from "../components/signup/SignupImage";
import SignupForm from "../components/signup/SignupForm";

const Signup = () => {
  return (
    <>
      <section className="bg-white">
        <div className="flex items-center justify-between mx-auto md:h-screen">
          <SignupImage />
          {/* Validation is remaining */}
          <SignupForm />
        </div>
      </section>
    </>
  );
};

export default Signup;
