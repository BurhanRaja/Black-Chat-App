"use client";

import { UserConnectionContext } from "@/context/createContext";
import axios from "axios";
import { useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";

const UserConnectionProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();

  // const handleUserDisconnect = async () => {
  //   if (session?.user) {
  //     const response = await axios.post(
  //       "/api/connection",
  //       { connection: false },
  //       { headers: { "Content-Type": "application/json" } }
  //     );
  //     console.log(response.data);
  //   }
  // };

  // useEffect(() => {
  //   window.addEventListener(
  //     "beforeunload",
  //     (e) => {
  //       e.preventDefault();
  //       e.returnValue = "";
  //       handleUserDisconnect();
  //     },
  //     false
  //   );

  //   return () => {
  //     window.removeEventListener("beforeunload", handleUserDisconnect);
  //     handleUserDisconnect();
  //   };
  // }, []);

  return (
    <UserConnectionContext.Provider value={null}>
      {children}
    </UserConnectionContext.Provider>
  );
};

export default UserConnectionProvider;
