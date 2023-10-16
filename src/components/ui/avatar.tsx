"use client";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { ReactNode } from "react";

interface AvatarProps {
  image?: string;
  altname?: string;
  radius?: string;
  fallback?: string | ReactNode;
  fallbackColor?: string;
  fallbackBackgroundColor?: string;
  transition?: boolean;
}

const Avatar = ({
  image,
  altname,
  radius,
  fallback,
  fallbackColor,
  fallbackBackgroundColor,
  transition,
}: AvatarProps) => {
  return (
    <AvatarPrimitive.Root
      className={`bg-slate-100 inline-flex h-[50px] w-[50px] select-none items-center justify-center overflow-hidden ${
        transition ? "avatar" : ""
      } ${
        radius == "small"
          ? "rounded-sm"
          : radius == "medium"
          ? "rounded-md"
          : radius == "large"
          ? "rounded-lg"
          : "rounded-full"
      } align-middle`}
    >
      <AvatarPrimitive.Image
        className="h-full w-full rounded-[inherit] object-cover"
        src={image}
        alt={altname}
      />
      <AvatarPrimitive.Fallback
        className={`${fallbackColor} leading-1 flex h-full w-full items-center justify-center ${fallbackBackgroundColor} text-[15px] font-medium`}
        delayMs={600}
      >
        {fallback ? fallback : "B"}
      </AvatarPrimitive.Fallback>
    </AvatarPrimitive.Root>
  );
};

export default Avatar;
