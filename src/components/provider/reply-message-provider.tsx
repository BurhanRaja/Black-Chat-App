"use client";

import { ReplyContext } from "@/context/createContext";
import { ReactNode, useState } from "react";

const ReplyMessageProvider = ({ children }: { children: ReactNode }) => {
  const [reply, setReply] = useState<{
    open: boolean;
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
  }>({
    open: false,
    message: undefined,
  });

  return (
    <>
      <ReplyContext.Provider
        value={{ openreply: reply.open, setReply, message: reply.message }}
      >
        {children}
      </ReplyContext.Provider>
    </>
  );
};

export default ReplyMessageProvider;
