import Login from "@/components/user/login";
import currentProfile from "@/lib/current-profile";
import { redirect } from "next/navigation";

export default async function Signin() {
  const profile = await currentProfile();

  if (profile) {
    return redirect("/me");
  }

  return (
    <>
      <Login />
    </>
  );
}
