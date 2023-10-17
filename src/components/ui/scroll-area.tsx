"use client";
import * as ScrollAreaPrimite from "@radix-ui/react-scroll-area";
import { ReactNode } from "react";

interface ScrollAreaProps {
  width: string;
  height: string;
  content: string | ReactNode;
}

const ScrollArea = ({ width, content, height }: ScrollAreaProps) => {
  return (
    <ScrollAreaPrimite.Root className={`${width} ${height}`}>
      <ScrollAreaPrimite.Viewport className="w-full h-full p-2.5">
        {content}
      </ScrollAreaPrimite.Viewport>
      <ScrollAreaPrimite.Scrollbar
        className="flex select-none touch-none p-0.5 bg-blackA3 transition-colors duration-[160ms] ease-out hover:bg-blackA5 data-[orientation=vertical]:w-2.5 data-[orientation=horizontal]:flex-col data-[orientation=horizontal]:h-2.5"
        orientation="vertical"
      >
        <ScrollAreaPrimite.Thumb className="flex-1 bg-mauve10 rounded-[10px] relative before:content-[''] before:absolute before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 before:w-full before:h-full before:min-w-[44px] before:min-h-[44px]" />
      </ScrollAreaPrimite.Scrollbar>
    </ScrollAreaPrimite.Root>
  );
};

export default ScrollArea;
