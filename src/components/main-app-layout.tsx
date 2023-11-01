"use client";

import { useParams } from "next/navigation";
import AppServerLayout from "./app-server-layout";
import AppDMLayout from "./app-directmessage-layout";

const MainAppLayout = () => {
  const { serverId } = useParams();

  return <>{serverId === "@me" ? <AppServerLayout /> : <AppDMLayout />}</>;
};

export default MainAppLayout;
