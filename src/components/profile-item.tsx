"use client";
import { MoreHorizontal, UserCircle2, Pencil } from "lucide-react";
import Avatar from "./ui/avatar";
import Dropdown from "./ui/dropdown";
import EditProfileModal from "./modals/edit-profile";
import { useState } from "react";

const ProfileItem = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  return (
    <>
      <EditProfileModal
        openModal={openModal}
        setOpenModal={(val) => setOpenModal(val)}
      />
      <div className="flex justify-between items-center p-3 mx-2 bg-neutral-800 rounded-xl">
        <div className="flex items-center">
          <Avatar
            image="https://images.unsplash.com/photo-1492633423870-43d1cd2775eb?&w=128&h=128&dpr=2&q=80"
            altname="Profile-Item"
            transition={false}
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
              setOpenModal: (val) => setOpenModal(val),
            },
            {
              content: "Profile Details",
              link: "",
              textColor: "text-violet-400",
              icon: <UserCircle2 size={16} />,
            },
          ]}
          side="top"
          contentWidth="w-[200px]"
          contentColor="bg-gray-900 mb-3"
        />
      </div>
    </>
  );
};

export default ProfileItem;
