"use client";
import Tooltip from "../ui/tooltip";
import Avatar from "../ui/avatar";
import { ReactNode } from "react";
import Link from "next/link";

interface ServerIconProps {
  image?: string;
  altName?: string;
  fallback?: string | ReactNode;
  fallbackColor?: string;
  fallbackBackgroundColor?: string;
  tooltipText?: string;
  link?: string;
}

const ServerIcon = ({
  image,
  altName,
  fallback,
  fallbackBackgroundColor,
  fallbackColor,
  tooltipText,
  link,
}: ServerIconProps) => {
  return (
    <div className="my-3">
      <Link href={link ? link : "/servers/@me"}>
        <Tooltip
          trigger={
            <button>
              <Avatar
                image={image}
                altname={altName}
                radius=""
                transition={true}
                fallback={fallback}
                fallbackBackgroundColor={fallbackBackgroundColor}
                fallbackColor={fallbackColor}
              />
            </button>
          }
          content={tooltipText ? tooltipText : "Server"}
        />
      </Link>
    </div>
  );
};

export default ServerIcon;
