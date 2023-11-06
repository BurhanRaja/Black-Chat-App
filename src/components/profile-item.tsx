"use client";
import { MoreHorizontal, UserCircle2, Pencil, LogOut } from "lucide-react";
import Avatar from "./ui/avatar";
import Dropdown from "./ui/dropdown";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { ModalContext } from "@/context/createContext";

const ProfileItem = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const { onOpen } = useContext(ModalContext);

  const handleSignOut = () => {
    signOut({ redirect: false }).then(() => {
      router.push("/auth/signin");
    });
  };

  return (
    <>
      <div className="flex justify-between items-center p-3 mx-2 bg-neutral-800 rounded-xl">
        <div className="flex items-center">
          <Avatar
            image={session?.user.image!}
            altname="Profile-Item"
            transition={false}
            fallbackBackgroundColor="bg-black"
          />
          <p className="ml-2">BurhanRaja</p>
        </div>
        <Dropdown
          trigger={<MoreHorizontal className="text-gray-400 cursor-pointer" />}
          items={[
            {
              content: "Edit Profile",
              link: "",
              textColor: "text-white",
              icon: <Pencil size={16} />,
              OpenModal: () => onOpen("editProfile", {}),
            },
            {
              content: "Profile Details",
              link: "",
              textColor: "text-violet-400",
              icon: <UserCircle2 size={16} />,
            },
            {
              content: "Sign Out",
              link: "",
              textColor: "text-red-500",
              icon: <LogOut size={16} />,
              handleFunction: handleSignOut,
            },
          ]}
          side="top"
          align="end"
          contentWidth="w-[220px]"
          contentColor="bg-gray-900 mb-7"
        />
      </div>
    </>
  );
};

export default ProfileItem;
