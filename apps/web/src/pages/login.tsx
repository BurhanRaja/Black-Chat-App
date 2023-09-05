import React, { useState } from "react";
import { useSession, signIn, signOut } from "next-auth/react";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { data: session, status } = useSession();

  console.log(session);
  console.log(status);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log(result);
  };

  if (status === "authenticated") {
    return <h1>Authenticated</h1>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
      </div>
      <div>
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Login;
