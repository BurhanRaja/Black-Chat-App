"use client";

import { MoreHorizontal, UserCircle2, Pencil, LogOut } from "lucide-react";
import Avatar from "./ui/avatar";
import Dropdown from "./ui/dropdown";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { ModalContext, SocketContext } from "@/context/createContext";
import axios from "axios";
import { Profile } from "@prisma/client";
import { FaCircle } from "react-icons/fa";

const ProfileItem = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState<Profile>();
  const { onOpen } = useContext(ModalContext);
  const { isConnected } = useContext(SocketContext);

  const handleSignOut = async () => {
    if (session?.user) {
      const response = await axios.post(
        "/api/connection",
        { connection: false },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response.data);
    }
    signOut({ redirect: false }).then(() => {
      router.push("/auth/signin");
    });
  };

  const handleOpenModal = async () => {
    onOpen("editProfile", { profile: profileData });
    return;
  };

  const getProfile = async () => {
    const response = await axios.get(`/api/user`);
    if (response.data.success) {
      setProfileData(response.data.data);
    }
  };

  useEffect(() => {
    if (!session?.user && status === "authenticated") {
      getProfile();
    }
  }, [session, status]);

  return (
    <>
      <div className="flex justify-between items-center p-3 mx-2 bg-neutral-800 rounded-xl">
        <div className="flex items-center">
          <Avatar
            image={
              session?.user.image ? session.user.image : profileData?.imageUrl
            }
            altname="Profile-Item"
            transition={false}
            width="w-[45px]"
            height="h-[45px]"
            fallbackBackgroundColor="bg-black"
          />
          <p className="ml-2">
            <span>
              {session?.user.name?.length! > 10
                ? session?.user.name?.substring(0, 10) + "..."
                : session?.user?.name}
            </span>
            <br />
            <span className="text-xs flex items-center">
              <span>
                <FaCircle
                  className={`text-xs mr-1 ${
                    isConnected ? "text-green-500" : "text-red-500"
                  }`}
                />
              </span>
              <span>{isConnected ? "Online" : "Offline"}</span>
            </span>
          </p>
        </div>
        <Dropdown
          trigger={<MoreHorizontal className="text-gray-400 cursor-pointer" />}
          items={[
            {
              content: "Edit Profile",
              link: "",
              textColor: "text-white",
              icon: <Pencil size={16} />,
              OpenModal: () => handleOpenModal(),
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
