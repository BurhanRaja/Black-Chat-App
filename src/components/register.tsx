"use client";

import { useState } from "react";
import Input from "./ui/input";
import Link from "next/link";

const Register = () => {
  const [email, setEmail] = useState<string>("");

  return (
    <>
      <div className="flex justify-center items-center bg-slate-700 h-[100vh]">
        <div className="w-[35%] p-2 bg-black rounded-md h-[85%] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">SignUp</h1>
          <p className="mt-2">Already have an Account? <Link className="text-blue-700 underline" href={""}>Login</Link> </p>
          <form className="p-2 w-[80%]">
            <div className="mb-3">
              <Input
                value={email}
                setVal={(val) => setEmail(val)}
                name="email"
                type="email"
                label="Email"
              />
            </div>
            <div className="mb-3">
              <Input
                value={email}
                setVal={(val) => setEmail(val)}
                name="email"
                type="email"
                label="Email"
              />
            </div>
            <div className="mb-3">
              <Input
                value={email}
                setVal={(val) => setEmail(val)}
                name="email"
                type="email"
                label="Email"
              />
            </div>
            <div className="mb-3">
              <Input
                value={email}
                setVal={(val) => setEmail(val)}
                name="email"
                type="email"
                label="Email"
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="p-2 w-[70%] rounded-md text-lg border border-gray-600 text-gray-600 hover:border-gray-400 hover:text-gray-400">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
