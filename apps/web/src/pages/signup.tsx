import React, { useState } from "react";
import { tRPC } from "trpc/client";
import { useSession } from "next-auth/react";
import Layout from "../components/defaults/Layout";
import SignupImage from "../components/signup/SignupImage";
import SignupForm from "../components/signup/SignupForm";

const Signup = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [phoneCode, setPhoneCode] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const { data: session } = useSession();

  console.log(session);

  const { mutateAsync, isLoading, isSuccess, isError, error } =
    tRPC.createUser.useMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      email,
      password,
      phone: phoneCode + phone,
      country,
    };
    await mutateAsync(data);
  };

  return (
    <>
      <section className='bg-white'>
        <div className='flex items-center justify-between mx-auto md:h-screen'>
          <SignupImage />
          <SignupForm />
        </div>
      </section>
      <form onSubmit={handleSubmit}>
        <div>
          {/* <Input
            type='text'
            value={username}
            setValue={(val) => setUsername(val)}
            placeholder=''
            label='Username'
          /> */}
          <input
            type='text'
            name='username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
          />
        </div>
        <div>
          <input
            type='email'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email'
          />
        </div>
        <div>
          <input
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Password'
          />
        </div>
        <div>
          <input
            type='text'
            name='country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder='Country'
          />
        </div>
        <div>
          <input
            type='text'
            name='phoneCode'
            value={phoneCode}
            onChange={(e) => setPhoneCode(e.target.value)}
            placeholder='Phone Code'
          />
        </div>
        <div>
          <input
            type='text'
            name='phone'
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder='Phone'
          />
        </div>
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};

export default Signup;
