import { createContext } from "react";
import { Profile, Room, SUser, Server } from "@prisma/client";

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
  | "serverSettings"
  | "createRoom"
  | "editRoom"
  | "deleteRoom"
  | "roomSettings"
  | "messageFile"
  | "deleteMessage"
  | "editProfile"
  | "invitePeople"
  | null;

interface CustomUser extends SUser {
  user: Profile;
}

export type ModalData = {
  server?: Server;
  room?: Room;
  profile?: Profile;
  sUsers?: Array<CustomUser>;
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

type SocketContextType = {
  isConnected: boolean;
  socket: any | null;
};

type ReplyContextType = {
  openreply: boolean;
  message?: {
    content: string;
    fileUrl: string;
    fileType: string;
    id: string;
    roomId: string;
    serverId: string;
    userId: string;
    userName: string;
  };
  setReply: Function;
};

// Theme Context
export const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  setTheme: (val: string) => {},
});

// Alert Context
export const AlertContext = createContext<AlertContextType>({
  setAlertOpen: (val: boolean) => {},
  setTitle: (val: string) => {},
  setDescription: (val: string) => {},
  setType: (val: "error" | "success" | "info" | "notification") => {},
});

// Modal Context
export const ModalContext = createContext<ModalContextType>({
  type: null,
  data: {},
  isOpen: false,
  onOpen: (type: ModalType, data: ModalData) => {},
  onClose: () => {},
});

// Member Context
export const MemberPannelContext = createContext<MemberPannel>({
  memberPannelOpen: false,
  setMemberPannelOpen: (val: boolean) => {},
});

// Socket Context
export const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socket: null,
});

export const UserConnectionContext = createContext(null);

export const ReplyContext = createContext<ReplyContextType>({
  openreply: false,
  message: undefined,
  setReply: (
    open: boolean,
    message: {
      content: string;
      fileUrl: string;
      fileType: string;
      id: string;
      roomId: string;
      serverId: string;
      userId: string;
      userName: string;
    }
  ) => {},
});
