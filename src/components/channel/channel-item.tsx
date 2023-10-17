"use client";
import { ReactNode } from "react";

interface ChannelItemProps {
  title: string;
  icons?: ReactNode;
  backgroundHover?: string;
}

const ChannelItem = ({ title, icons, backgroundHover }: ChannelItemProps) => {
  return (
    <>
      <div
        className={`flex justify-between items-center p-2 ${backgroundHover} rounded-md`}
      >
        <p>{title}</p>
        <div className="flex justify-between items-center">{icons}</div>
      </div>
    </>
  );
};

export default ChannelItem;
