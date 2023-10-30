"use client";

import Link from "next/link";
import Input from "../ui/input";
import { FormEvent, useContext, useEffect, useState } from "react";
import GoogleButton from "../google-button";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertContext } from "@/context/createContext";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { status } = useSession();
  const router = useRouter();
  const {
    setAlertOpen,
    setTitle,
    setDescription,
    setDuration,
    setTitleTextColor,
    setDescriptionTextColor,
    setBackgroundColor,
  } = useContext(AlertContext);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    signIn("credentials", {
      email,
      password,
      redirect: false,
    })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        if (error.error === "user-not-found") {
          setAlertOpen(true);
          setTitle("Error");
          setDuration(3000);
          setDescription("User not found.");
          setTitleTextColor("text-white");
          setDescriptionTextColor("text-gray-200");
          setBackgroundColor("bg-green-600");
        }
        console.log(error);
      });
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/channels/@me");
    }
  }, [status]);

  useEffect(() => {}, []);

  return (
    <>
      <div className="flex justify-center items-center bg-zinc-800 h-[100vh]">
        <div className="w-[35%] p-2 bg-black rounded-md h-[70%] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">Login</h1>
          <p className="my-2 mb-3 text-sm text-gray-400">
            Don't have an Account?{" "}
            <Link
              className="text-blue-600 hover:underline"
              href={"/auth/signup"}
            >
              SignUp
            </Link>{" "}
          </p>
          <GoogleButton />
          <div className="relative w-[50%]">
            <hr className="absolute border-gray-500 w-[100%] z-0 top-4" />
            <div className="text-center relative z-10 flex justify-center">
              <p className="bg-black p-1 w-[15%] text-center">or</p>
            </div>
          </div>
          <form className="p-2 w-[80%]" onSubmit={handleSubmit}>
            <div className="mb-3">
              <Input
                value={email}
                setVal={(val) => setEmail(val)}
                name="email"
                type="email"
                label="Email"
                setFocus={() => {}}
                setBlur={() => {}}
              />
            </div>
            <div className="mb-3">
              <Input
                value={password}
                setVal={(val) => setPassword(val)}
                name="password"
                type="text"
                label="Password"
                setFocus={() => {}}
                setBlur={() => {}}
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="p-2 w-[70%] rounded-md text-lg border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
