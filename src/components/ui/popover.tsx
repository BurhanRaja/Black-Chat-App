"use client";

import {
  Root,
  Popover,
  Anchor,
  PopoverTrigger,
  PopoverContent,
  Portal,
  Close,
} from "@radix-ui/react-popover";
import { ReactNode } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";

interface EmojiPickerProps {
  content: ReactNode;
  open: boolean;
}

const PopOver = ({ content, open }: EmojiPickerProps) => {
  console.log(open);
  return (
    <>
      <Root open={open}>
        <Anchor />
        <Portal>
          <PopoverContent
            align="center"
            side="right"
            sideOffset={40}
            className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
          >
            {content}
            <Close />
          </PopoverContent>
        </Portal>
      </Root>
    </>
  );
};

export default PopOver;
