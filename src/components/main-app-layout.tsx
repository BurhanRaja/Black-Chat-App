"use client";

import { useParams } from "next/navigation";
import AppServerLayout from "./app-server-layout";
import AppDMLayout from "./app-directmessage-layout";

const MainAppLayout = () => {
  const params = useParams();

  return (
    <>{params?.serverId === "%40me" ? <AppDMLayout /> : <AppServerLayout />}</>
  );
};

export default MainAppLayout;
