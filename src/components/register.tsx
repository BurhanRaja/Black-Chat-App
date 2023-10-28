"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import Input from "./ui/input";
import Link from "next/link";
import Select from "./ui/select";
import useMutationData from "@/hooks/useMutationData";
import { registerUser } from "@/utils/user";
import GoogleButton from "./google-button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AlertContext } from "@/context/createContext";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [error, setError] = useState<string>("");

  const { mutate, isSuccess } = useMutationData({
    func: registerUser,
  });
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (isSuccess) {
      router.push("/auth/signin");
    }
  }, [isSuccess]);

  const handleSubmit = (e: FormEvent) => {
    if (email.length === 0 || username.length === 0 || password.length === 0) {
      setError("The above field is empty.");
      return;
    }

    e.preventDefault();
    let data = {
      email,
      username,
      gender: Number(gender),
      password,
    };
    mutate(data);
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/channels/@me");
    }
  }, [status]);

  return (
    <>
      <div className="flex justify-center items-center bg-zinc-800 h-[100vh]">
        <div className="w-[35%] p-2 bg-black rounded-md h-[95%] flex flex-col items-center justify-center">
          <h1 className="text-3xl font-bold">SignUp</h1>
          <p className="my-2 mb-3 text-sm text-gray-400">
            Already have an Account?{" "}
            <Link
              className="text-blue-600 hover:underline"
              href={"/auth/signin"}
            >
              Login
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
                value={username}
                setVal={(val) => setUsername(val)}
                name="username"
                type="text"
                label="Username"
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
                value={password}
                setVal={(val) => setPassword(val)}
                name="password"
                type="text"
                label="Password"
              />
            </div>
            <div className="mb-3">
              <Select
                value={gender}
                setValue={(val) => setGender(val)}
                name="gender"
                label="Gender"
                options={[
                  {
                    name: "Male",
                    value: "0",
                    key: "swewsv",
                  },
                  {
                    name: "Female",
                    value: "1",
                    key: "tyrrdv",
                  },
                ]}
              />
            </div>
            <div className="flex items-center justify-center mt-8">
              <button className="p-2 w-[70%] rounded-md text-lg border border-gray-200 text-gray-200 hover:bg-gray-200 hover:text-gray-800 font-bold">
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
