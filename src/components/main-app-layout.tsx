"use client";

import { useParams } from "next/navigation";
import AppServerLayout from "./app-server-layout";
import AppDMLayout from "./app-directmessage-layout";

const MainAppLayout = () => {
  const { serverId } = useParams();

  return <>{serverId === "%40me" ? <AppDMLayout /> : <AppServerLayout />}</>;
};

export default MainAppLayout;
