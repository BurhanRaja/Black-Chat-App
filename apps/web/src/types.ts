import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as ServerIO } from "socket.io";

export type NextApiResponseSocketIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export type InpType = {
  type?: string;
  label: string;
  name: string;
  value: string | number;
  bgColor?: string;
  textColor?: string;
  placeHolder?: string;
  border?: string;
  setValue: Function;
};

export interface RoomItemProps {
  type?: string;
  notifications?: number;
  name: string;
}

export interface DropdownProps {
  color: string;
  name: string;
  mappedData: any;
}
