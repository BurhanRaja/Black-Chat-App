import { createContext } from "react";
import { Profile, Room, Server } from "@prisma/client";

type ThemeContextType = {
  theme: string;
  setTheme: Function;
};

type AlertContextType = {
  setAlertOpen: Function;
  setTitle: Function;
  setDescription: Function;
  setType: Function;
};

export type ModalType =
  | "createServer"
  | "editServer"
  | "deleteServer"
  | "createRoom"
  | "editRoom"
  | "deleteRoom"
  | "messageFile"
  | "deleteMessage"
  | "editProfile"
  | null;

export type ModalData = {
  server?: Server;
  room?: Room;
  profile?: Profile;
  apiUrl?: string;
  query?: string;
};

export type ModalContextType = {
  type: ModalType;
  data: ModalData;
  isOpen: boolean;
  onOpen: Function;
  onClose: Function;
};

export type MemberPannel = {
  memberPannelOpen: boolean;
  setMemberPannelOpen: (val: boolean) => void;
};

export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: (val: string) => {},
});

export const AlertContext = createContext<AlertContextType>({
  setAlertOpen: (val: boolean) => {},
  setTitle: (val: string) => {},
  setDescription: (val: string) => {},
  setType: (val: "error" | "success" | "info" | "notification") => {},
});

export const ModalContext = createContext<ModalContextType>({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: ModalType, data: ModalData) => {},
  onClose: () => {},
});

export const MemberPannelContext = createContext<MemberPannel>({
  memberPannelOpen: true,
  setMemberPannelOpen: (val: boolean) => {},
});
