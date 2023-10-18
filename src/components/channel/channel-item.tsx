"use client";
import { ReactNode } from "react";

interface ChannelItemProps {
  title: string;
  mainIcon: ReactNode;
  icons?: ReactNode;
  backgroundHover?: string;
}

const ChannelItem = ({
  title,
  icons,
  backgroundHover,
  mainIcon,
}: ChannelItemProps) => {
  return (
    <>
      <div
        className={`flex justify-between items-center p-2 ${backgroundHover} rounded-md group`}
      >
        <div className="flex items-center text-sm">
          {mainIcon}
          <p className="ml-1">{title}</p>
        </div>
        <div className="justify-between items-center hidden group-hover:flex">{icons}</div>
      </div>
    </>
  );
};

export default ChannelItem;
