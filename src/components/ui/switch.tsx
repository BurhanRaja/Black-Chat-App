"use client";

import * as Switch from "@radix-ui/react-switch";

interface SwicthBtnProps {
  content: string;
  checked: boolean;
  onCheck: (val: string | undefined) => void;
  setCheck?: (val: boolean) => void;
}

const SwitchBtn = ({ content, checked, onCheck, setCheck }: SwicthBtnProps) => {
  return (
    <div className="flex items-center">
      <Switch.Root
        defaultChecked={checked}
        onCheckedChange={(val) => {
          if (val) {
            onCheck(content);
            if (setCheck) {
              setCheck(val);
            }
          } else {
            onCheck(undefined);
            if (setCheck) {
              setCheck(val);
            }
          }
        }}
        className="w-10 h-7 bg-white rounded-full relative shadow-[0_2px_10px] shadow-blackA4 focus:shadow-[0_0_0_2px] focus:shadow-black data-[state=checked]:bg-zinc-700 outline-none cursor-default"
        id="airplane-mode"
      >
        <Switch.Thumb className="block w-5 h-5 bg-gray-400 rounded-full shadow-[0_2px_2px] shadow-blackA4 transition-transform duration-100 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-[19px]" />
      </Switch.Root>
      <label
        className="text-white text-[15px] leading-none pl-1"
        htmlFor="airplane-mode"
      >
        {content}
      </label>
    </div>
  );
};

export default SwitchBtn;
