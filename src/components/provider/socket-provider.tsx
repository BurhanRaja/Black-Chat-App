"use client";
import { SocketContext } from "@/context/createContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect, useState } from "react";
import { io as ClientIO } from "socket.io-client";

const SocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<any>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const { data: session } = useSession();

  useEffect(() => {
    const socketInstance = new (ClientIO as any)(
      process.env.NEXT_PUBLIC_APP_URL!,
      {
        path: "/api/socket/io",
        addTrailingSlash: false,
      }
    );

    socketInstance.on("connect", async () => {
      if (session?.user) {
        const response = await axios.post(
          "/api/connection",
          { connection: true },
          { headers: { "Content-Type": "application/json" } }
        );
        console.log(response.data);
      }
      setIsConnected(true);
    });

    socketInstance.on("disconnect", async () => {
      console.log("Disconnected");
      setIsConnected(false);
    });

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [session]);

  return (
    <>
      <SocketContext.Provider value={{ socket, isConnected }}>
        {children}
      </SocketContext.Provider>
    </>
  );
};

export default SocketProvider;
