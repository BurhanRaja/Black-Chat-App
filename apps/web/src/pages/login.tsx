import React, { useState } from "react";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import SignupImage from "../components/signup/SignupImage";
import LoginForm from "../components/login/LoginForm";

const Login = ({ token }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { data, status } = useSession();
  // console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
  };

  const handleSignOut = async () => {
    // e.preventDefault();
    await signOut();
  };

  if (status === "authenticated") {
    return (
      <>
        <h1>Authenticated</h1>
        <button onClick={() => handleSignOut()}>Logout</button>
      </>
    );
  }

  return (
    <>
      <section className="bg-white">
        <div className="flex items-center justify-between mx-auto md:h-screen">
          <SignupImage />
          {/* Validation is remaining */}
          <LoginForm />
        </div>
      </section>
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
    </>
  );
};

export default Login;

export async function getServerSideProps<GetServerSideProps>(context) {
  console.log(context.req.cookies);
  const sessionToken = await getSession(context.req);

  console.log(sessionToken);

  return { props: { token: sessionToken } };

  // decoded JSON will be like :
  /**
   * {
   *  name: 'John Doe',
   *  email: '...',
   *  image: '...'
   * }
   */
}
