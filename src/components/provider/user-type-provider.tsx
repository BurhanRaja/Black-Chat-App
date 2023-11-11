"use client";

import { MemberPannelContext } from "@/context/createContext";
import { ReactNode, useState } from "react";

interface UserTypeProviderProps {
  children: ReactNode;
}

const MemberPannelProvider = ({ children }: UserTypeProviderProps) => {
  const [memberPannelOpen, setMemberPannelOpen] = useState<boolean>(false);

  return (
    <MemberPannelContext.Provider
      value={{ memberPannelOpen, setMemberPannelOpen }}
    >
      {children}
    </MemberPannelContext.Provider>
  );
};

export default MemberPannelProvider;
