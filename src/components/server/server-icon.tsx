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
  needLink?: boolean;
  link?: string;
}

const ServerIcon = ({
  image,
  altName,
  fallback,
  fallbackBackgroundColor,
  fallbackColor,
  tooltipText,
  needLink = true,
  link,
}: ServerIconProps) => {
  return (
    <div className="my-3">
      {needLink ? (
        <Link href={link ? link : "/me"}>
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
      ) : (
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
      )}
    </div>
  );
};

export default ServerIcon;
