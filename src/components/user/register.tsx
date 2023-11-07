"use client";

import { FormEvent, useContext, useEffect, useState } from "react";
import Input from "../ui/input";
import Link from "next/link";
import Select from "../ui/select";
import useMutationData from "@/hooks/useMutationData";
import { registerUser } from "@/handlers/user";
import GoogleButton from "../google-button";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiFillInfoCircle } from "react-icons/ai";

const USERNAME_REGEX = /^[a-zA-Z0-9]{5,20}$/;
const EMAIL_REGEX = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,5}$/;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [usernameError, setUsernameError] = useState<string>("");

  const [checkUsername, setCheckUsername] = useState<boolean>(false);
  const [checkEmail, setCheckEmail] = useState<boolean>(false);
  const [checkPassword, setCheckPassword] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");

  const [usernameFocus, setUsernameFocus] = useState<boolean>(false);
  const [emailFocus, setEmailFocus] = useState<boolean>(false);
  const [passwordFocus, setPasswordFocus] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<string>("");

  const { mutate, isSuccess } = useMutationData({
    func: registerUser,
  });
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (USERNAME_REGEX.test(username)) {
      setCheckUsername(true);
    } else {
      setCheckUsername(false);
    }
  }, [username]);

  useEffect(() => {
    if (EMAIL_REGEX.test(email)) {
      setCheckEmail(true);
    } else {
      setCheckEmail(false);
    }
  }, [email]);

  useEffect(() => {
    if (PASSWORD_REGEX.test(password)) {
      setCheckPassword(true);
    } else {
      setCheckPassword(false);
    }
  }, [password]);

  useEffect(() => {
    if (isSuccess) {
      router.push("/auth/signin");
    }
  }, [isSuccess]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    let emailTest = EMAIL_REGEX.test(email);
    let usernameTest = USERNAME_REGEX.test(username);
    let passwordTest = PASSWORD_REGEX.test(password);

    if (email.length === 0 || username.length === 0 || password.length === 0) {
      setError("The above field is empty.");
      return;
    }

    if (!usernameTest) {
      setUsernameError("Username does not match the instructions");
      return;
    }

    if (!emailTest) {
      setEmailError("Email does not match the instructions");
      return;
    }

    if (!passwordTest) {
      setPasswordError("Password does not match the instructions");
      return;
    }

    const response = await fetch(
      `/api/user/checkusername?username=${username}`
    );
    let nextRes = await response.json();

    if (nextRes?.usernameUsed) {
      setUsernameError(
        "Username already Exists. Please try a different username."
      );
      return;
    }

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
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                type="text"
                label="Username"
                onFocus={() => setUsernameFocus(true)}
                onBlur={() => setUsernameFocus(false)}
              />
              {username.length !== 0 && usernameError && !usernameFocus ? (
                <p className="mt-1 text-xs text-red-500">{usernameError}</p>
              ) : (
                ""
              )}
              {username.length === 0 && error && !usernameFocus ? (
                <p className="mt-1 text-xs text-red-500">{error}</p>
              ) : (
                ""
              )}
              {!checkUsername && usernameFocus ? (
                <p className="text-white mt-1 text-xs flex items-start p-1 bg-gray-900 rounded-sm">
                  <AiFillInfoCircle className="text-white mr-2" />
                  <span>
                    No special characters. Only lowercase, UPPERCASE letters and
                    digits
                  </span>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <Input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                label="Email"
                onFocus={() => setEmailFocus(true)}
                onBlur={() => setEmailFocus(false)}
              />
              {email.length !== 0 && emailError && !emailFocus ? (
                <p className="mt-1 text-xs text-red-500">{emailError}</p>
              ) : (
                ""
              )}
              {email.length === 0 && error ? (
                <p className="mt-1 text-xs text-red-500">{error}</p>
              ) : (
                ""
              )}
              {!checkEmail && emailFocus ? (
                <p className="text-white mt-1 text-xs flex items-start p-1 bg-gray-900 rounded-sm">
                  <AiFillInfoCircle className="text-white mr-2" />
                  <span>Example: example@email.com</span>
                </p>
              ) : (
                ""
              )}
            </div>
            <div className="mb-3">
              <Input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                label="Password"
                onFocus={() => setPasswordFocus(true)}
                onBlur={() => setPasswordFocus(false)}
              />
              {password.length !== 0 && passwordError && !passwordFocus ? (
                <p className="mt-1 text-xs text-red-500">{passwordError}</p>
              ) : (
                ""
              )}
              {password.length === 0 && error && !passwordFocus ? (
                <p className="mt-1 text-xs text-red-500">{error}</p>
              ) : (
                ""
              )}
              {!checkPassword && passwordFocus ? (
                <p className="text-white mt-1 text-xs flex items-start p-1 bg-gray-900 rounded-sm">
                  <AiFillInfoCircle className="text-white mr-2" />
                  <span>
                    Strong password should contain lowercase letters, UPPERCASE
                    letters, digits and one special character.
                  </span>
                </p>
              ) : (
                ""
              )}
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
