import DMPannel from "./dm/dm-pannel";
import Header from "@/components/defaults/header";
import { ReactNode } from "react";

interface AppDMLayoutProps {
  chatarea: ReactNode;
}

const AppDMLayout = ({ chatarea }: AppDMLayoutProps) => {
  return (
    <>
      <DMPannel />
      <div className="content w-[79%]">
        <Header />
        <div className="flex">{chatarea}</div>
      </div>
    </>
  );
};

export default AppDMLayout;
