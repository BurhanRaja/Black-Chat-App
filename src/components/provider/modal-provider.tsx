"use client";

import { useState } from "react";
import CreateServerModal from "../modals/create-server";
import { ModalContext, ModalData, ModalType } from "@/context/createContext";
import EditProfileModal from "../modals/edit-profile";
import CreateRoomModal from "../modals/create-room";
import EditRoomModal from "../modals/edit-room";
import DeleteRoomModal from "../modals/delete-room";
import InvitePeopleCodeModal from "../modals/invite-people";
import ServerSettingsModal from "../modals/server-settings";
import DeleteMessageModal from "../modals/delete-message";
import DeleteServerModal from "../modals/delete-server";
import LeaveServerModal from "../modals/leave-server";

interface ModalProviderProps {
  children: React.ReactNode;
}

const ModalProvider = ({ children }: ModalProviderProps) => {
  const [type, setType] = useState<ModalType>(null);
  const [data, setData] = useState<ModalData>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = (type: ModalType, data: ModalData) => {
    setType(type);
    setData(data);
    setIsOpen(true);
  };

  const onClose = () => {
    setType(null);
    setData({});
    setIsOpen(false);
  };

  return (
    <ModalContext.Provider value={{ type, data, isOpen, onOpen, onClose }}>
      <CreateServerModal />
      <CreateRoomModal />
      <EditProfileModal />
      <EditRoomModal />
      <DeleteRoomModal />
      <InvitePeopleCodeModal />
      <ServerSettingsModal />
      <DeleteServerModal />
      <DeleteMessageModal />
      <LeaveServerModal />
      {children}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
