import React, { useState } from "react";
import SignupImage from "../components/signup/SignupImage";
import SignupForm from "../components/signup/SignupForm";

const Signup = () => {
  return (
    <>
      <section className="bg-gray-900">
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
