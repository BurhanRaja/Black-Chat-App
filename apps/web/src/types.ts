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
  setValue: Function;
};
