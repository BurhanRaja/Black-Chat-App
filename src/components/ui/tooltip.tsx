"use client";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import { FunctionComponent, ReactElement, ReactNode } from "react";

interface TooltipProps {
  trigger: ReactNode;
  side?: "right" | "left" | "top" | "bottom";
  align?: "center" | "start" | "end";
  content: string;
  contentTextSize?: string;
  contentBackground?: string;
  contentColor?: string;
}

const Tooltip = ({
  trigger,
  side,
  align,
  content,
  contentTextSize,
  contentBackground,
  contentColor,
}: TooltipProps) => {
  return (
    <TooltipPrimitive.Provider>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger asChild>{trigger}</TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Content
            align={align ? align : "center"}
            side={side ? side : "right"}
            className={`
            ${contentBackground ? contentBackground : "bg-white"} 
            ${contentColor ? contentColor : "text-black"} 
            p-1 rounded-sm ${contentTextSize ? contentTextSize : "text-xs"}`}
          >
            {content}
            <TooltipPrimitive.Arrow className="fill-white" />
          </TooltipPrimitive.Content>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
};

export default Tooltip;
