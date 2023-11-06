"use client";

import { Plus } from "lucide-react";
import ServerIcon from "./server-icon";
import CreateServerModal from "../modals/create-server";
import { useContext } from "react";
import { ModalContext } from "@/context/createContext";

const CreateServerBtn = () => {
  const { onOpen } = useContext(ModalContext);

  return (
    <>
      <CreateServerModal />
      <div onClick={() => onOpen("createServer", {})}>
        <ServerIcon
          fallback={<Plus size={20} />}
          fallbackBackgroundColor="bg-gray-800 hover:bg-green-600"
          fallbackColor="text-green-600 hover:text-gray-800"
        />
      </div>
    </>
  );
};

export default CreateServerBtn;
